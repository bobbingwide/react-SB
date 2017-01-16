/**
 * (C) Copyright Bobbing Wide 2016, 2017
 * 
 * We assume that the 'api' appends the wp-json part to the url 
 * 
 * This is an extract from WP API docs, written before WordPress 4.7
 * 
 * Want to get your site's posts? 
 * Simply send a GET request to /wp-json/wp/v2/posts.
 * Update user with ID 4? Send a PUT request to /wp-json/wp/v2/users/4. 
 * Get all posts with the search term "awesome"? GET /wp-json/wp/v2/posts?filter[s]=awesome. 
 * It's that easy.
 * 
 * Note: The documentation is now out of date.
 * 
 * Is it that easy? 
 * Well... yes and no. The posts that are returned don't expand the taxonomy terms, you just get the ids.
 * So you need to get them too. 
 * That suggests this App needs to manage quite a lot of data. 
 */
 
import React, { Component } from 'react';
import {render} from 'react-dom';
import Board2 from './Board2';
import api from './rest-api';

//const BIGRAM_URL = "http://qw/bigram/"
// http://stackoverflow.com/questions/10143093/origin-is-not-allowed-by-access-control-allow-origin
// Using http://localhost doesn't work a lot of the time.

var current_url = window.location.hostname;
if ( "localhost" == window.location.hostname ) {
	current_url = window.location.protocol + '//qw/bigram/';
} else if ( "qw" == window.location.hostname ) {
	current_url = window.location.protocol +  '//qw/bigram/';
} else { 
	current_url = window.location.protocol+ '//' + window.location.hostname + '/';
}
console.log( "current_url: %s", current_url );
const BIGRAM_URL = current_url;

const CALLBACK_URL = 'http://localhost:8080/'

const demoApi = new api({
    url: BIGRAM_URL,
		callbackURL: CALLBACK_URL, 
    crossDomain : true,
			});

class App extends Component {

  constructor() {
		super()
		this.state = {
			s_letters: [],
			b_letters: [],
			s_words: [],
			b_words: [],
			s_posts: [],
			b_posts: [],
			isLoading: false,
		  sletter: 0,
			bletter: 0,
			post: null,
		}
	}

	/**
	 * Start by loading the s-letters for the S word
	 * 
	 * The rest will follow.
	 */
	componentDidMount() {
		this.loadsletters( 1 );
	}

	/**
	 * Obtain all posts for the second letter of the S word
	 *
	 * &TODO Each time a selection is made we need to stop the processing of the previous selection.
	 */
	onSletter( sletter ) {
		this.setState( { s_posts: [] } );
		this.onletterLoop( 's-letter', sletter, 1 );
	}

	/**
	 * Obtain all posts for the second letter of the B word
	 */
	onBletter( bletter ) {

		this.setState( { s_posts: [] } );
		this.onletterLoop( 'b-letter', bletter, 1 );
	}

	/**
	 * Obtain all posts for the second letter of the chosen word
	 * 
	 * WordPress 4.6: http://qw/bigram/wp-json/wp/v2/bigram/?filter[s-letter]=A
	 *
   * WordPress 4.7: /wp-json/wp/v2/bigram/?s-letter=sletter-id
	 * 
	 * WordPress 4.7: /wp-json/wp/v2/bigram/?s-letter=sletter-id&page=1&per_page=n
	 * 	 
	 */
	onletterLoop( taxonomy, sletter, page ) {
		var parms = { page: page, per_page: 50 };
		parms[taxonomy] = sletter;
		demoApi.getPage( '/wp/v2/bigram/', parms , page )
			.then( posts => { 
				let concatposts = this.state.s_posts.concat( posts.json );
				this.setState( {s_posts: concatposts } );
				if ( page < posts.total ) {
					page++;
					this.onletterLoop( taxonomy, sletter, page );
				}
			});
	}

	/**
	 * Obtain all values for the s-letter taxonomy
	 * 
	 * then load the b-letters
	 *
	 * Perform: http://qw/bigram/wp-json/wp/v2/s-letter/
	 */
	loadsletters( p ) {
		var page = p;
		demoApi.getPage( '/wp/v2/s-letter/', { per_page: 40, page: page }, page )
			.then( terms => { 
				let concatterms = this.state.s_letters.concat( terms.json );
				this.setState( {s_letters: concatterms } );
				if ( page < terms.total ) {
					p++;
					this.loadsletters( p );
				} else {
					this.loadbletters( 1 );
				}
			});
	}

	/**
	 * Obtain all values for the b-letter taxonomy
	 * 
	 * Here we're trying to implement pagination logic, so using getPage() rather than get()
	 * 
	 * 
	 *
	 * Perform: http://qw/bigram/wp-json/wp/v2/b-letter/
	 */
	loadbletters( p ) {		
		var page = p;
		demoApi.getPage( '/wp/v2/b-letter/', { per_page: 40, page: page }, page )
			.then( terms => {
				//console.log( "terms", terms );
				let concatterms = this.state.b_letters.concat( terms.json );
				this.setState( {b_letters: concatterms } );
				if ( page < terms.total ) {
					p++;
					this.loadbletters( p );
				}
			});
	}

	/**
	 * NotifyPost
	 * 
	 * Load the selected post, with _embed true so that the featured image and other stuff is available,
	 * then setState to display it.
	 */
	notifyPost( id ) {
		//let post = this.state.s_posts.filter(( post ) => id == post.id );
		//if ( !post[0] ) {
		//	post = this.state.b_posts.filter(( post ) => id == post.id );
		//}
		demoApi.get( '/wp/v2/bigram/' + id, { _embed: true } )
			.then( post => {
				console.log( id, post );
				this.setState( { post: [ post ] } );
		});
	}



	/**
	 * Render the Application
	 */
  render() {
	 	//console.log( "sletter", this.state.sletter );
		return( 
			<div className="app">
			<Board2 s_posts={this.state.s_posts} b_posts={this.state.b_posts} 
				s_letters={this.state.s_letters} b_letters={this.state.b_letters}
				s_words={this.state.s_words} b_words={this.state.b_words}
				notifySideS={this.onSletter.bind( this )} notifySideB={this.onBletter.bind( this )}
				sletter={this.state.sletter} bletter={this.state.bletter}
				post={this.state.post} notifyPost={this.notifyPost.bind( this )}
			/>
			</div> 
			);

	}
}

render( <App />, document.getElementById( 'root' ) );



