/** 
 * Implement the Board
 * This consists of the S-side and the B-side
 * both of which display Sides which consist of  
 * - a heading for the first letter					    S
 * - a list of links for the second letter   A B C ... X Y Z
 * - items with the selected first and second letter
 * 
 */

import React, { Component } from 'react';
import {render} from 'react-dom';
import Side from './Side';


class Board extends Component {
	render() {
		return( 
			<div className="app">
			 <Side side="S" />
			 <Side side="B" />

			</div>
		);
	}
}

export default Board;
