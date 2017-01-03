/**
 * (C) Copyright Bobbing Wide 2016, 2017
 * Display Link Items for the selected side
 *
 * These are list items rather than link items
 * but they behave like list items when clicked on
 * 
 * Clicking on the item notifies the Board to load a list of posts matching the given letter
 * 
 */
import React, { Component, PropTypes } from 'react';

class LinkItem extends Component {
	/**
	 * How do we notify the Side what's been selected
	 * 
	 * OK. so we get the letter that's been clicked and now we use a callback to notify the Board!
	 */
	handleClick( letter) {
		this.props.notifyBoard( letter );
	}

	render() {
		return(
		<li onClick={this.handleClick.bind(this, this.props.data.id )}>
		<span dangerouslySetInnerHTML={ {__html:this.props.data.name} } />
		</li>
		);
	}
}

LinkItem.propTypes = {
	first: PropTypes.string.isRequired,
	notifyBoard: PropTypes.func.isRequired,
	data: PropTypes.object.isRequired
}

export default LinkItem;


