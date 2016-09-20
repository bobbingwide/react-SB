/** 
 * cloned version of wordpress-rest-api-oauth1 [github joehoyle wordpress-rest-api-oauth1] 
 * 
 * This version is different because:
 * - I want to be able to find out how many pages there might be
 * - I want to be able to handle error situations
 * - I want to resolve the problem with CORS
 * - To add some comments
 */
import qs from 'qs'
import oauth from 'oauth-1.0a'

export default class {
	constructor( config ) {

		if ( ! config.url ) {
			throw new Error( 'Please specify a url in the config object.' )
		}
		this.config = {
			credentials: {},
 			brokerURL: 'https://apps.wp-api.org/',
 			...config,
		}

	}

	getConsumerToken() {
		if ( ! this.config.brokerCredentials ) {
			throw new Error( 'Config does not include a brokerCredentials value.' )
		}

		this.config.credentials.client = this.config.brokerCredentials.client
		return this.post( this.config.brokerURL + 'broker/connect', {
			server_url: this.config.url,
		} ).then( data => {

			if ( data.status && data.status === 'error' ) {
				throw { message: 'Broker error: ' + data.message, code: data.type }
			}
			this.config.credentials.client = {
				public: data.client_token,
				secret: data.client_secret,
			}

			return data
		} )
	}

	getRequestToken() {

		if ( ! this.config.callbackURL ) {
			throw new Error( 'Config does not include a callbackURL value.' )
		}
		return this.post( this.config.url + 'oauth1/request', {
			callback_url: this.config.callbackURL,
		} ).then( data => {
			var redirectURL = this.config.url + 'oauth1/authorize?' + qs.stringify({
				oauth_token: data.oauth_token,
				oauth_callback: this.config.callbackURL,
			})

			this.config.credentials.token = {
				secret: data.oauth_token_secret,
			}

			return { redirectURL: redirectURL, token: data }
		} )
	}

	getAccessToken( oauthVerifier ) {
		return this.post( this.config.url + 'oauth1/access', {
			oauth_verifier: oauthVerifier,
		} ).then( data => {
			this.config.credentials.token = {
				public: data.oauth_token,
				secret: data.oauth_token_secret,
			}

			return this.config.credentials.token
		} )
	}

	hasCredentials() {
		return this.config.credentials
			&& this.config.credentials.client
			&& this.config.credentials.client.public
			&& this.config.credentials.client.secret
			&& this.config.credentials.token
			&& this.config.credentials.token.public
			&& this.config.credentials.token.secret
	}

	hasRequestToken() {
		return window.localStorage.getItem('requestTokenCredentials') ? true : false
	}

	authorize( next ) {

		this.restoreCredentials()

		var args = {}
		var savedTemporaryCredentials = window.localStorage.getItem( 'requestTokenCredentials' )
		if ( window.location.href.indexOf( '?' ) ) {
			args = qs.parse( window.location.href.split('?')[1] )
		}

		if ( ! this.config.credentials.client ) {
			return this.getConsumerToken().then( this.authorize.bind( this ) )
		}

		if ( this.config.credentials.token && this.config.credentials.token.public ) {
			return Promise.resolve("Success")
		}

		if ( savedTemporaryCredentials ) {
			window.localStorage.removeItem( 'requestTokenCredentials' )

			if ( args.oauth_token ) {
				this.config.credentials.token = JSON.parse( savedTemporaryCredentials )
				this.config.credentials.token.public = args.oauth_token
				let ret = this.getAccessToken( args.oauth_verifier ).then(token => {
					this.saveCredentials()
					return token
				})
				delete this.config.credentials.token
				return ret
			}
		}

		if ( ! this.config.credentials.token ) {
			return this.getRequestToken().then( this.authorize.bind( this ) )
		} else if ( ! this.config.credentials.token.public ) {
			this.saveCredentials()
			window.localStorage.setItem( 'requestTokenCredentials', JSON.stringify( this.config.credentials.token ) )
			window.location = next.redirectURL
			throw 'Redirect to authrization page...'
		}
	}

	saveCredentials() {
		window.localStorage.setItem( 'tokenCredentials', JSON.stringify( this.config.credentials ) )
	}

	removeCredentials() {
		delete this.config.credentials.token
		window.localStorage.removeItem( 'tokenCredentials' )
	}

	restoreCredentials() {
		var savedCredentials = window.localStorage.getItem( 'tokenCredentials' )
		if ( savedCredentials ) {
			this.config.credentials = JSON.parse( savedCredentials )
		}
		return this
	}

	get( url, data ) {
		return this.request( 'GET', url, data )
	}

	post( url, data ) {
		return this.request( 'POST', url, data )
	}

	del( url, data, callback ) {
		return this.request( 'DELETE', url, data )
	}

	request( method, url, data = null ) {

		let tokenlessURLs = [
			this.config.url + 'oauth1/request',
			this.config.brokerURL + 'broker/connect',
		]

		// only use oauth if we have a valid credentials or it's for a request token.
		if ( this.hasCredentials() || tokenlessURLs.indexOf( url ) > -1 ) {
			var oauth1 = new oauth({
				consumer: this.config.credentials.client,
				signature_method: 'HMAC-SHA1'
			})
		} else {
			var oauth1 = null
		}

		if ( url.indexOf( 'http' ) !== 0 ) {
			url = this.config.url + 'wp-json' + url
		}

		if ( method === 'GET' && data ) {
			// must be decoded before being passed to ouath
			url += '?' + decodeURIComponent( qs.stringify(data) )
			data = null
		}

		var oauthData = null

		if ( data ) {
			oauthData = {}
			Object.keys( data ).forEach( key => {
				var value = data[ key ]
				if ( Array.isArray( value ) ) {
					value.forEach( ( val, index ) => oauthData[ key + '[' + index + ']' ] = val )
				} else {
					oauthData[ key ] = value
				}
			})
		}

		if ( oauth1 ) {
			var oauthData = oauth1.authorize( {
				method: method,
				url: url,
				data: oauthData
			}, this.config.credentials.token ? this.config.credentials.token : null )
		}

		var headers = {
			Accept: 'application/json',
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
		}

		if ( oauth1 ) {
			headers = {...headers, ...oauth1.toHeader( oauthData )}
		}

		return fetch( url, {
			method: method,
			headers: headers,
			mode: 'cors',
			body: ['GET','HEAD'].indexOf( method ) > -1 ? null : qs.stringify( data )
		} )
		.then( response => {
			console.log( "Response headers", response );
			if ( response.headers.get( 'Content-Type' ) && response.headers.get( 'Content-Type' ).indexOf( 'x-www-form-urlencoded' ) > -1 ) {
				return response.text().then( text => {
					return qs.parse( text )
				})
			}
			return response.text().then( text => {

				try {
					var json = JSON.parse( text )
				} catch( e ) {
					throw { message: text, code: response.status }
				}

				if ( response.status >= 300) {
					throw json
				} else {
					return json
				}
			})
		} )
	}
}
