/**
 * (C) Copyright Bobbing Wide 2016
 * 
 * We assume that the 'api' appends the wp-json part to the url 
 * 
 Want to get your site's posts? Simply send a GET request to 
 http://qw/bigram/wp-json/wp/v2/posts. Update user with ID 4? Send a PUT request to /wp-json/wp/v2/users/4. Get all posts with the search term "awesome"? GET /wp-json/wp/v2/posts?filter[s]=awesome. It's that easy.
 */
 
import React, { Component } from 'react';
import {render} from 'react-dom';
import Board from './Board';
import Bigrams from './Bigrams';

import api from 'wordpress-rest-api-oauth-1';

class App extends Component {

  constructor() {
		super()
		this.state = {
			posts: [],
			isLoadingPosts: false,
			url: 'http://qw/bigram',
			site: null,
			user: null,
			category: null,
		}
	}

  render() {
		let bigram = new Bigrams;
		bigram.onConnect();
	 
		return( 
			<div className="app">
			<Board />
			</div> 
			);

	}
}

render( <App />, document.getElementById( 'root' ) );



