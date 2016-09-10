/**
 * (C) Copyright Bobbing Wide 2016
 * 
 * We assume that the 'api' appends the wp-json part to the url 
 * Want to get your site's posts? 
 * Simply send a GET request to /wp-json/wp/v2/posts.
 * Update user with ID 4? Send a PUT request to /wp-json/wp/v2/users/4. 
 * Get all posts with the search term "awesome"? GET /wp-json/wp/v2/posts?filter[s]=awesome. 
 * It's that easy.
 * 
 * Well... yes and no. The posts that are returned don't expand the taxonomy terms, you just get the ids.
 * So you need to get them too. 
 * That suggests this App needs to manage quite a lot of data. 
 */
 
import React, { Component } from 'react';
import {render} from 'react-dom';
import Board2 from './Board2';
import api from 'wordpress-rest-api-oauth-1';

//const BIGRAM_URL = "http://qw/bigram/"
// http://stackoverflow.com/questions/10143093/origin-is-not-allowed-by-access-control-allow-origin
const BIGRAM_URL = "http://localhost/bigram/"

const demoApi = new api({
    url: BIGRAM_URL
			});

class App extends Component {

  constructor() {
		super()
		this.state = {
			s_letters: [],
			b_letters: [],
			s_posts: [],
			b_posts: [],
			isLoading: false,
		  sletter: 'A',
			bletter: 'A',
		}
	}
	componentDidMount() {
		this.loadsletters();
		this.loadbletters();
		this.onSletter( 'A' );
		//this.onBletter( 'A' );
	}

	/**
	 * Obtain all posts for the second letter of the S word
	 * 
	 * Perform: http://qw/bigram/wp-json/wp/v2/bigram/?filter[s-letter]=A
	 */
	onSletter( sletter ) {
		this.setState( { isLoading: true } );
		demoApi.get( '/wp/v2/bigram/', { filter: { 's-letter': sletter } } )
		.then( posts => { 
			this.setState( {s_posts: posts } );
			this.setState( {sletter: sletter } );
			this.setState( {isLoading: false } );
			 });
	}


	/**
	 * Obtain all posts for the second letter of the B word
	 * 
	 * Perform: http://qw/bigram/wp-json/wp/v2/bigram/?filter[b-letter]=A
	 */
	onBletter( bletter ) {
		this.setState( { isLoading: true } );
		demoApi.get( '/wp/v2/bigram/', { filter: { 'b-letter': bletter } } )
		.then( posts => { 
			this.setState( {b_posts: posts } );
			this.setState( {bletter: bletter } );
			this.setState( {isLoading: false } );
			 });
	}

	/**
	 * Obtain all values for the s-letter taxonomy
	 *
	 * Perform: http://qw/bigram/wp-json/wp/v2/s-letter/
	 */

	loadsletters() {
		this.setState( { isLoading: true } );
		demoApi.get( '/wp/v2/s-letter/', { per_page: 31 } )
			.then( terms => { 
				this.setState( {s_letters: terms } );
				this.setState( {isLoading: false } );
			 });
	}

	/**
	 * Obtain all values for the b-letter taxonomy
	 *
	 * Perform: http://qw/bigram/wp-json/wp/v2/b-letter/
	 */
	loadbletters() {		
		this.setState( { isLoading: true } );
		demoApi.get( '/wp/v2/b-letter/', { per_page: 31 } )
			.then( terms => { 
				this.setState( {b_letters: terms } );
				this.setState( {isLoading: false } );
			 });

	}



	/**
	 * Render the Application
	 */
  render() {
	 
		return( 
			<div className="app">
			<Board2 s_posts={this.state.s_posts} b_posts={this.state.b_posts} 
				s_letters={this.state.s_letters} b_letters={this.state.b_letters} 
				notifySideS={this.onSletter.bind( this )} notifySideB={this.onBletter.bind( this )}
			/>
			</div> 
			);

	}
}

render( <App />, document.getElementById( 'root' ) );



