/**
 * Display Links for the selected side
 * 
 * Challenges:
 * - Create a link for each second letter - determined from parameter ( prop letters )
 * - Taking into account the first letter - passed as a parameter ( prop  first )
 * 
 * @TODO Do they really need to be links. 
 * 
 */
 
import React, { Component } from 'react';
//import {render} from 'react-dom';



class Links extends Component {

	/**
	 * How do we notify the Side what's been selected
	 * 
	 * OK. so we get the letter that's been clicked and now we use a callback to notify the Board!
	 *
	 */
	handleClick( letter) {
			alert( "Wow: " + letter );
			this.props.notifyBoard( this.props.first, letter );

	}

	render() {
		var first = this.props.first;
		var links = this.props.letters.map(( letter ) => ( 
			<li key={letter} onClick={this.handleClick.bind(this, letter )}>
					{/* <a href={`http://qw/bigram/?s=${first}${letter}`} */}
											
					{letter}
					{/* </a> */}
			</li>
				));


		return( 
				<ul>
				{links}
			 	</ul>
		);
	}
}

export default Links;



