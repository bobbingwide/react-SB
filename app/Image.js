/**	
 * (C) Copyright Bobbing Wide 2016
 * Display the featured image for the selected post
 *
 */
import React, { Component, PropTypes } from 'react';


class Image extends Component {

	content( post ) { 
		return( { __html: post.content.rendered} );
	}


	render() {
		console.log( "This.props",  this.props );
		let image = null;
		if ( this.props.post._embedded['wp:featuredmedia'] ) {
			image = this.props.post._embedded['wp:featuredmedia'][0];
		}
		console.log( "image", image );
		if ( image ) {
			return( 
				<img src={image.source_url} />
				);
		} else {
			return( <p>No image</p> );
		}
	}
}


Image.propTypes = {
	post: PropTypes.object,
}

export default Image;
