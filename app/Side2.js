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
import Items2 from './Items2';


class Side2 extends Component {

	constructor() {
		super( ...arguments);
		//this.state = { letter: this.props.letter
		//						 };
	}


	render() {
		console.log( this.props.words );
		return( 
			<div className="side" >
			<h1>{this.props.side}</h1>
				<Links2 first={this.props.side} letters={this.props.letters} letter={this.props.letter} notifyBoard={this.props.notifyBoard} />
				<Items2 first={this.props.side} posts={this.props.posts} letter={this.props.letter} notifyBoard={this.props.notifyBoard}  />
		  </div>
		);
	}
}


Side2.propTypes = {
	side: PropTypes.string.isRequired,
	letters: PropTypes.array.isRequired,
	words: PropTypes.array.isRequired,
	posts: PropTypes.array.isRequired,
	letter: PropTypes.string.isRequired,
	notifyBoard: PropTypes.func.isRequired
}

export default Side2;
