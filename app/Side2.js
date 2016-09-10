/**	
 * (C) Copyright Bobbing Wide 2016
 * Side
 
 * A Side consists of  
 * - a heading for the first letter					    S
 * - a list of links for the second letter   A B C ... X Y Z
 * - items with the selected first and second letter
 */
import React, { Component, PropTypes } from 'react';
import {render} from 'react-dom';
import Links2 from './Links2';
import Items from './Items';


class Side2 extends Component {

	constructor() {
		super( ...arguments);
		//this.state = { letter: this.props.letter
		//						 };
	}


	render() {
		return( 
			<div className="side" >
			<h1>{this.props.side}</h1>
				<Links2 first={this.props.side} letters={this.props.letters} letter={this.props.letter} notifyBoard={this.props.notifyBoard} />
				{/* <Items first={this.props.side} words={this.props.words} letter={this.props.letter} notifyBoard={this.props.notifyBoard} /> */}
		  </div>
		);
	}
}


Side2.propTypes = {
		letters: PropTypes.array.isRequired,
		words: PropTypes.array.isRequired,
		letter: PropTypes.string.isRequired,
		notifyBoard: PropTypes.func.isRequired
}

export default Side2;
