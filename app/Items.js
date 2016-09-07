/**
 * Items in a selected list
 *
 * Each time a selection is made from the Links section for a particular Side
 * we want to load the list of items that matches that selection
 * 
 * Actually for the S-side with selected letter A we want all the items
 * which are in the S-word category with Second-letter A
 * 
 * In WordPress we'd be selecting something using oik-letter
 * The list returned to the S-side has to be kept separately from the list returned to the B-side
 */
 
 
import React, { Component } from 'react';

class Items extends Component {


	render() {

		let words = [	
				{ id: 1
				, first: 'S'
				, word: 'Sable'
				}
		,{ id: 2
		, first: 'S'
		, word: 'Sack'
		}
		,{ id: 3
		, first: 'S'
		, word: 'Sad'
		}
		,{ id: 4
		, first: 'B'
		, word: 'Baa'
		}
		,{ id: 5
		, first: 'B'
		, word: 'Babble'
		}
		,{ id: 6
		, first: 'B'
		, word: 'Back'
		}
		];

		let wordset = words.filter( ( word ) => word.first === this.props.first );

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


