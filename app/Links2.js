/**
 * (C) Copyright Bobbing Wide 2016
 * Display Links for the selected side
 * 
 * Challenges:
 * - Create a link for each second letter - determined from parameter ( prop letters )
 * - Taking into account the first letter - passed as a parameter ( prop  first )
 * 
 * @TODO Do they really need to be links. 
 * 
 */
 
import React, { Component, PropTypes } from 'react';
//import {render} from 'react-dom';

class Link extends Component {
	/**
	 * How do we notify the Side what's been selected
	 * 
	 * OK. so we get the letter that's been clicked and now we use a callback to notify the Board!
	 */
	handleClick( letter) {
			//alert( "Wow: " + letter );
			this.props.notifyBoard( letter );

	}
	render() {
		//console.log( "Link" + this.props.data.name);
		return(
		<li onClick={this.handleClick.bind(this, this.props.data.name )}>
		{this.props.data.name}
		</li>
		);
	}
}

Link.propTypes = {
	first: PropTypes.string.isRequired,
	notifyBoard: PropTypes.func.isRequired,
	data: PropTypes.object.isRequired
}




class Links2 extends Component {


	render() {
		let links = this.props.letters.map(( letter ) => { 
			return (
			<Link key={letter.id} data={letter} first={this.props.first} notifyBoard={this.props.notifyBoard}	/> 
				)
				});


		return( 
				<ul>
				{links}
			 	</ul>
		);
	}
}

Links2.propTypes = {
		letters: PropTypes.array.isRequired,
		first: PropTypes.string.isRequired,
		notifyBoard: PropTypes.func.isRequired
}

export default Links2;



