/**	
 * (C) Copyright Bobbing Wide 2016
 * Display the details of the selected post
 * Primarily we want to display the image
 * but also the description and perhaps a link to the real web page
 *
 *
 */
import React, { Component, PropTypes } from 'react';
import Image from './Image';


class Details extends Component {

	constructor() {
		super( ...arguments);
		//this.state = { letter: this.props.letter
		//						 };
	}

	content( field ) { 
		return( { __html: field.rendered} );
	}

	/**
	 * Render the Content, if there is any

		let post = this.props.post || [{ slug:null, content: { rendered: null }, title: { rendered: null } }];
	 */


	render() {
		let post = null;
		if ( this.props.post ) {
			post = this.props.post[0];
		}
		console.log( this.props );
		if ( post ) {
			return( 
				<div className="details" >
				<h2 className="title" dangerouslySetInnerHTML={ this.content( post.title) } />
					<div className="content" dangerouslySetInnerHTML={ this.content( post.content ) } />
					<div className="featured">
						<Image post={post} />
					</div>
			 </div>
			);
		} else {
				return( <div className="details" >Select something</div> );
		}
	}
}


Details.propTypes = {
	post: PropTypes.array,
}

export default Details;
