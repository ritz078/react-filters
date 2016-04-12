import React from 'react';
import ReactDOM from 'react-dom';
import {Radio} from '../components'

const data = [{
	key:2,
	label : 'hello',
	count:5
},{
	key:4,
	label : 'world',
	count:5
}];

ReactDOM.render(
	<Radio
		data={data}
		
	/>, document.getElementById('content'));
