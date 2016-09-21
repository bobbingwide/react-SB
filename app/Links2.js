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
import LinkItem from './LinkItem.js';



class Links2 extends Component {


	render() {
		let links = this.props.letters.map(( letter ) => { 
			return (
			<LinkItem key={letter.id} data={letter} first={this.props.first} notifyBoard={this.props.notifyBoard}	/> 
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



