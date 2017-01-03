/**
 * (C) Copyright Bobbing Wide 2016, 2017
 * 
 * Display Word Items for the selected side
 * 
 * We display the list of words that match the selected side and chosen letter.
 * Actually, these are now bigrams - we need to display both the S-word and B-word
 
 *
 * 
 * - This list may contain duplicates
 * - The list may contain more words than returned from a single query
 * - When the user clicks on a bigram we need to load the post and display it
 */
import React, { Component, PropTypes } from 'react';

class WordItem extends Component {

	/**
	 * How do we notify the App which bigram's been selected
	 * 
	 * OK. so we get the word that's been clicked and now we use a callback to notify the App
	 */
	handleClick( id ) {
			console.log( "handleClick", id );
			this.props.notifyPost( id );
	}

	render() {
		console.log( "Data", this.props.data );
		let title = this.props.data.title.rendered;
		console.log( "title", title );
		return(
		<li onClick={this.handleClick.bind(this, this.props.data.id )}> 
		<span	dangerouslySetInnerHTML={ {__html: title } } />
		</li>
		);
	}
}

WordItem.propTypes = {
	notifyPost: PropTypes.func.isRequired,
	data: PropTypes.object.isRequired,
}

export default WordItem;

