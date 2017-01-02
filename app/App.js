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
const BIGRAM_URL = "http://localhost/bigram/"

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
	componentDidMount() {
		//this.loadallswords();
		//this.loadbwords();
		this.loadsletters();
		//this.loadbletters();
		//this.onSletter( 'A' );
		//this.onBletter( 'A' );
	}

	/**
	 * Obtain all posts for the second letter of the S word
	 * 
	 * Perform: http://qw/bigram/wp-json/wp/v2/bigram/?filter[s-letter]=A
   * WordPress 4.7: /wp-json/wp/v2/bigram/?s-letter=sletter-id
	 */
	onSletter( sletter ) {
		//this.setState( { isLoading: true } );
		demoApi.get( '/wp/v2/bigram/', { 's-letter': sletter, _embed: true } )
		.then( posts => { 
			this.setState( {s_posts: posts, sletter: sletter } );
			//this.setState( {isLoading: false } );
			 });
	}


	/**
	 * Obtain all posts for the second letter of the B word
	 * 
	 * Perform: http://qw/bigram/wp-json/wp/v2/bigram/?filter[b-letter]=A
	 * WordPress 4.7: /wp-json/wp/v2/bigram/?b-letter=bletter-id
	 */
	onBletter( bletter ) {
		//this.setState( { isLoading: true } );
		demoApi.get( '/wp/v2/bigram/', { 'b-letter': bletter, _embed: true } )
		.then( posts => { 
			this.setState( {b_posts: posts, bletter: bletter } );
			//this.setState( {isLoading: false } );
			 });
	}

	/**
	 * Obtain all values for the S-word taxonomy
	 */
	loadswords( page ) {
		demoApi.get( '/wp/v2/s-word/', { page: page } )
			.then( terms => { 
				let concatterms = this.state.s_words.concat( terms );
				this.setState( {s_words: concatterms } );
		});
	}

	/**
	 * 
	 */
	loadallswords() {
		let page = 1;
		this.loadswords( page );
		page = 2;
		this.loadswords( page ); 
	}
		 
	/**
	 * Obtain all values for the B-word taxonomy
	 */
	loadbwords() {
		demoApi.get( '/wp/v2/b-word/', {  } )
			.then( terms => { 
				this.setState( { b_words: terms } );
		});
	}



	/**
	 * Obtain all values for the s-letter taxonomy
	 *
	 * Perform: http://qw/bigram/wp-json/wp/v2/s-letter/
	 */
	loadsletters() {
		//this.setState( { isLoading: true } );
		demoApi.get( '/wp/v2/s-letter/', { per_page: 31, page: 1 } )
			.then( terms => { 
				this.setState( {s_letters: terms } );
				this.loadbletters( 1 );
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
		//this.setState( { isLoading: true } );
		var page = p;
		demoApi.getPage( '/wp/v2/b-letter/', { per_page: 10, page: page }, page )
			.then( terms => {
				console.log( "terms", terms );
				let concatterms = this.state.b_letters.concat( terms.json );
				this.setState( {b_letters: concatterms } );
				if ( page < terms.total ) {
					p++;
					this.loadbletters( p );
				}

				//this.setState( {isLoading: false } );
		});
	}

	/**
	 * NotifyPost
	 * 
	 * Locate the selected post from the S side then the B side
	 */
	notifyPost( id ) {
		let post = this.state.s_posts.filter(( post ) => id == post.id );
		if ( !post[0] ) {
			post = this.state.b_posts.filter(( post ) => id == post.id );
		}
		this.setState( { post: post } );
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



