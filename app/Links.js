/**
 * Display Links for the selected side
 * 
 * Challenges:
 * - Create a link for each second letter
 * - Taking into account the first letter - passed as a parameter
 */
 
import React, { Component } from 'react';
import {render} from 'react-dom';



class Links extends Component {

	render() {
		var first = this.props.first;

		return( 
				<ul>
					<li><a href={`http://qw/bigram/?s=${first}A`}>{first}A</a></li>
					<li><a href={`http://qw/bigram/?s=${first}B`}>{first}B</a></li>
			 	</ul>
		);
	}
}

export default Links;



