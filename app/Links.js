/**
 * Display Links for the selected side
 * 
 * Challenges:
 * - Create a link for each second letter - determined from parameter ( prop letters )
 * - Taking into account the first letter - passed as a parameter ( prop  first )
 * - 
 */
 
import React, { Component } from 'react';
import {render} from 'react-dom';



class Links extends Component {

	render() {
		var first = this.props.first;
		var links = this.props.letters.map(( letter ) => ( 
			<li><a href={`http://qw/bigram/?s=${first}${letter}`}>{letter}</a></li>
				));


		return( 
				<ul>
				{links}
			 	</ul>
		);
	}
}

export default Links;



