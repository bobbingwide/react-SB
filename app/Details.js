/**	
 * (C) Copyright Bobbing Wide 2016
 * Display the details of the selected post
 
 */
import React, { Component, PropTypes } from 'react';


class Details extends Component {

	constructor() {
		super( ...arguments);
		//this.state = { letter: this.props.letter
		//						 };
	}


	render() {
		let post = this.props.post || [{ slug:null, content: { rendered: null } }];
		post = post[0];
		console.log( this.props );
		return( 
			<div className="details" >
			details
			{post.slug}
			{post.content.rendered}
		  </div>
		);
	}
}


Details.propTypes = {
	post: PropTypes.array,
}

export default Details;
