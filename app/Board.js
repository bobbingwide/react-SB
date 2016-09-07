/** 
 * Implement the Board
 * This consists of the S-side and the B-side
 * and the selected bigram
 * 
 * both of which display a Side which consists of  
 * - a heading for the first letter					    S
 * - a list of links for the second letter   A B C ... X Y Z
 * - items with the selected first and second letter
 * 
 */

import React, { Component } from 'react';
import {render} from 'react-dom';
import Side from './Side';


let words = [	
		{ id: 1
		, first: 'S'
		, letter: 'A'
		, word: 'Sable'
		}
		,{ id: 2
		, first: 'S'
		, letter: 'A'
		, word: 'Sack'
		}
		,{ id: 3
		, first: 'S'
		, letter: 'A'
		, word: 'Sad'
		}
		,{ id: 4
		, first: 'B'
		, letter: 'A'
		, word: 'Baa'
		}
		,{ id: 5
		, first: 'B'
		, letter: 'A'
		, word: 'Babble'
		}
		,{ id: 6
		, first: 'B'
    , letter: 'A'
		, word: 'Back'
		}
		,{ id: 7
		, first: 'S'
	  , letter: 'B'
		, word: 'Sbad'
		}
		, {id: 8, first: 'S', letter: 'C', word: 'Scot' }
		];


class Board extends Component {
	constructor() {
		super( ...arguments);
		this.state = { letterS: 'B'
								 , letterB: 'A'
								 , wordS: false
								 , wordB: false
								 , SandBselected: false
								 };
	}

	render() {
		//let letters = [ 'A', 'B', 'C', 'D', 'E' ];
		let letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
		return( 
			<div className="app">
			 <Side side="S" letters={letters} words={words} letter={this.state.letterS} />
			 <Side side="B" letters={letters} words={words} letter={this.state.letterB} />
			 {/* <Bigram /> */}
			</div>
		);
	}
}

export default Board;
