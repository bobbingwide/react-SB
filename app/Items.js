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
 
 
import React, { Component } from 'react';

class Items extends Component {


	render() {


		let wordset = this.props.words.filter( ( word ) => word.first === this.props.first );
		wordset = wordset.filter( ( word ) => word.letter === this.props.letter );

		let items = wordset.map(( item ) => (                                 
		 <li key={item.id}>
		 {item.word}
		</li>
		));


		return( 
				<ul>
				{items}
			 	</ul>
		);
	}
}

export default Items;


