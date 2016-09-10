/**
 * (C) Copyright Bobbing Wide 2016
 *
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

import words from './Words';
import bigrams from './Bigrams';

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

	notifySideS( first, letter ) {
		this.setState( { letterS: letter } );
		///alert( "letterS: " + this.state.letterS );
		//alert( "letterS:" );

	}


	notifySideB( first, letter ) {
		this.setState( { letterB: letter } );
	}

	render() {
		//let letters = [ 'A', 'B', 'C', 'D', 'E' ];
		let letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
		return( 
			<div className="app">
			 <Side side="S" letters={letters} words={words} letter={this.state.letterS} notifyBoard={this.notifySideS.bind( this )} />
			 <Side side="B" letters={letters} words={words} letter={this.state.letterB} notifyBoard={this.notifySideB.bind( this )} />
			 {/* <Bigram /> */}
			</div>
		);
	}
}

export default Board;
