import React, { Component } from 'react';
import {render} from 'react-dom';

class Hello extends Component {
	render() {
		return (
			<h1>Hello Worldy</h1>
		);
	}
}

render( <Hello />, document.getElementById( 'root' ) ) ;
