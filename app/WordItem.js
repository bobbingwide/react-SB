/**
 * (C) Copyright Bobbing Wide 2016
 * Display Word Items for the selected side
 * 
 * We display the list of words that match the selected side and chosen letter.
 * 
 * - This list may contain duplicates
 * - The list may contain more words than returned from a single query
 * - When the user clicks on a word then we start doing the matching
 * - But first we have to show the right word
 * - which means we have to be able to extract the word from the required taxonomy
 * - We no longer need to be passed the words, only the data
 * 

 <WordItem key={post.id} data={post} notifyBoard={this.props.notifyBoard} first={this.props.first}  />
 */
 
import React, { Component, PropTypes } from 'react';

class WordItem extends Component {

	/**
	 * How do we notify the Side which word's been selected
	 * 
	 * OK. so we get the word that's been clicked and now we use a callback to notify the Board!
	 */
	handleClick( letter) {
			//alert( "Wow: " + letter );
			this.props.notifyBoard( letter );

	}
	render() {
		console.log( "Data", this.props.data );
		//let word = this.props.words.filter( ( word ) => word.id === this.props.data['s-word'][0]);
		return(
		<li onClick={this.handleClick.bind(this, this.props.data.name )}>
		{this.props.data.id}
		{this.props.data.title.rendered}
		{this.props.data['s-word'][0]}
		</li>
		);
	}
}

WordItem.propTypes = {
	notifyBoard: PropTypes.func.isRequired,
	data: PropTypes.object.isRequired,
	first: PropTypes.string.isRequired,
}

export default WordItem;

