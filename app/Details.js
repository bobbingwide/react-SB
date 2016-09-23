/**	
 * (C) Copyright Bobbing Wide 2016
 * Display the details of the selected post
 * Primarily we want to display the image
 * but also the description and perhaps a link to the real web page
 *
 *
 */
import React, { Component, PropTypes } from 'react';


class Details extends Component {

	constructor() {
		super( ...arguments);
		//this.state = { letter: this.props.letter
		//						 };
	}

	content( post ) { 
		return( { __html: post.content.rendered} );
	}


	render() {
		let post = this.props.post || [{ slug:null, content: { rendered: null }, title: { rendered: null } }];
		post = post[0];
		console.log( this.props );
		return( 
			<div className="details" >
			<h2>{post.title.rendered}</h2>
				<span dangerouslySetInnerHTML={ this.content( post ) } />
		  </div>
		);
	}
}


Details.propTypes = {
	post: PropTypes.array,
}

export default Details;
