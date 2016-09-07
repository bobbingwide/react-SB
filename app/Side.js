/**
 * Side
 
 * A Side consists of  
 * - a heading for the first letter					    S
 * - a list of links for the second letter   A B C ... X Y Z
 * - items with the selected first and second letter
 */



import React, { Component } from 'react';
import {render} from 'react-dom';
import Links from './Links';
// import List from './List';


class Side extends Component {
	render() {
		return( 
			<div className="side" >
			<h1>{this.props.side}</h1>
				<Links first={this.props.side} letters={this.props.letters} />
		  </div>
		);
	}
}

export default Side;
