/**
 * (C) Copyright Bobbing Wide 2016
 *
 * Bigrams - these are the posts that we load from the server
 *
 * The logic I started developing here is now in App.js
 * See Pro React pp 67-69.
 */
 
import React, { Component } from 'react';
import {render} from 'react-dom';
 
import api from 'wordpress-rest-api-oauth-1';

const BIGRAM_URL = "http://qw/bigram/"

const demoApi = new api({
    url: BIGRAM_URL
			});

class Bigrams extends Component {

	constructor() {
		super();
		this.state = {
			posts: [],
			isLoadingPosts: false,
			url: BIGRAM_URL,
		};
	}

	componentWillMount() {
			this.onConnect( this.state.url );
	}

	componentWillUnmount() {
	}

	onConnect( url ) {
		demoApi.get( '/wp/v2/bigram' ).then( posts => { console.log( posts ) });
	}

	onSletter( sletter ) {
		demoApi.get( '/wp/v2/bigram/', { 'filter[s-letter]': sletter } )
		.then( posts => { this.setState( {posts: posts } ) });
	}




}


export default Bigrams;

