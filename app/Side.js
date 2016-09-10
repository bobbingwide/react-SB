/**	
 * (C) Copyright Bobbing Wide 2016
 * Side
 
 * A Side consists of  
 * - a heading for the first letter					    S
 * - a list of links for the second letter   A B C ... X Y Z
 * - items with the selected first and second letter
 */



import React, { Component } from 'react';
import {render} from 'react-dom';
import Links from './Links';
import Items from './Items';


class Side extends Component {

	constructor() {
		super( ...arguments);
		//this.state = { letter: this.props.letter
		//						 };
	}


	render() {
		return( 
			<div className="side" >
			<h1>{this.props.side}</h1>
				<Links first={this.props.side} letters={this.props.letters} letter={this.props.letter} notifyBoard={this.props.notifyBoard} />
				<Items first={this.props.side} words={this.props.words} letter={this.props.letter} notifyBoard={this.props.notifyBoard} />
		  </div>
		);
	}
}

export default Side;
