/**
 * (C) Copyright Bobbing Wide 2016
 *
 * Items in a selected list
 *
 * Each time a selection is made from the Links section for a particular Side
 * we want to load the list of items that matches that selection
 * 
 * Actually for the S-side with selected letter A we want all the items
 * which are in the S-word category with Second-letter A
 * 
 * In WordPress we'd be selecting something using oik-a2z
 * The list returned to the S-side has to be kept separately from the list returned to the B-side
 * 
 * When the user chooses a particular word then it's matched up with the words on the other side
 * showing which are valid bigrams. 
 * 
 * When both are chosen then the bigram is loaded and displayed. 
 */
 
 
import React, { Component, PropTypes } from 'react';

class Item extends Component {

	/**
	 * How do we notify the Side what's been selected
	 * 
	 * OK. so we get the letter that's been clicked and now we use a callback to notify the Board!
	 */
	handleClick( letter) {
			//alert( "Wow: " + letter );
			this.props.notifyBoard( letter );

	}
	render() {
		console.log( "Words & Data", this.props.words[0], this.props.data );
		let word = this.props.words.filter( ( word ) => word.id === this.props.data['s-word'][0]);
		return(
		<li onClick={this.handleClick.bind(this, this.props.data.name )}>
		{this.props.data.id}
		{this.props.data.title.rendered}
		{this.props.data['s-word'][0]}
		{word.id}
		{word.name}
		</li>
		);
	}
}

Item.propTypes = {
	notifyBoard: PropTypes.func.isRequired,
	data: PropTypes.object.isRequired
}

class Items2 extends Component {


	render() {
		console.log( this.props.posts );

		let links = this.props.posts.map(( post ) => { 
			return (
			<Item key={post.id} data={post} notifyBoard={this.props.notifyBoard} words={this.props.words} />
				)
		});

		return( 
				<ul>
				{links}
			 	</ul>
		);
	}
}

Items2.propTypes = {
	first: PropTypes.string.isRequired,
	posts: PropTypes.array.isRequired,
	words: PropTypes.array.isRequired,
	letter: PropTypes.string.isRequired,
	notifyBoard: PropTypes.func.isRequired
}

export default Items2;


