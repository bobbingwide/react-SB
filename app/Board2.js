/**
 * (C) Copyright Bobbing Wide 2016
 *
 * Implement the Board2
 * 
 * This consists of the S-side and the B-side
 * and the selected bigram
 * 
 * both of which display a Side which consists of  
 * - a heading for the first letter					    S
 * - a list of links for the second letter   A B C ... X Y Z
 * - items with the selected first and second letter
 * 
 */

import React, { Component, PropTypes } from 'react';
import {render} from 'react-dom';
import Side2 from './Side2';
import Details from './Details';

// Instead of getting passed the words array we now extract it from this.props.posts

class Board2 extends Component {

	render() {
		//let letters = [ 'A', 'B', 'C', 'D', 'E' ];
		//let letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
		return( 
			<div className="app">
			 <Side2 side="S" letters={this.props.s_letters} posts={this.props.s_posts} letter={this.props.sletter} notifyBoard={this.props.notifySideS} words={this.props.s_words} notifyPost={this.props.notifyPost} />
			 <Side2 side="B" letters={this.props.b_letters} posts={this.props.b_posts} letter={this.props.bletter} notifyBoard={this.props.notifySideB} words={this.props.b_words} notifyPost={this.props.notifyPost} /> 
			 <Details post={this.props.post} />
			</div>
		);
	}
}

/**
 * It does seem a bit daft that we pass this down in separate fields
 * 
 */
Board2.propTypes = {
	s_posts: PropTypes.array,
	b_posts: PropTypes.array,
	s_words: PropTypes.array,
	b_words: PropTypes.array,
	s_letters: PropTypes.array,
	b_letters: PropTypes.array,
	notifySideS: PropTypes.func,
	notifySideB: PropTypes.func,
	sletter: PropTypes.string,
	bletter: PropTypes.string,
	post: PropTypes.array,
	notifyPost: PropTypes.func,
 
}



export default Board2;
