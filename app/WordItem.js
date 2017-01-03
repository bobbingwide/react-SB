/**
 * (C) Copyright Bobbing Wide 2016
 * Display Word Items for the selected side
 * 
 * We display the list of words that match the selected side and chosen letter.
 *
 * 
 * - This list may contain duplicates
 * - The list may contain more words than returned from a single query
 * - When the user clicks on a word then we start doing the matching
 * - But first we have to show the right word
 * - which means we have to be able to extract the word from the required taxonomy
 * - We no longer need to be passed the words, only the data
 * 

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
		//console.log( "First", this.props.first );
		let name = '';
		//if ( this.props.first == "S" ) {
			name = this.props.data._embedded['wp:term'][1][0].name;
			//console.log( '!' + name + '!' );
		//} else {
			name += " ";
			name += this.props.data._embedded['wp:term'][2][0].name;
		//}
		console.log( "NME", name );
		  //let word = this.props.words.filter( ( word ) => word.id === this.props.data['s-word'][0]);
		//{this.props.data['s-word'][0]}
		return(
		<li onClick={this.handleClick.bind(this, this.props.data.id )}>
		{name}
		</li>
		);
	}
}

WordItem.propTypes = {
	notifyPost: PropTypes.func.isRequired,
	data: PropTypes.object.isRequired,
	first: PropTypes.string.isRequired,
}

export default WordItem;

