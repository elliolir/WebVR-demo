import {Entity} from 'aframe-react';
import React from 'react';

export default function (props) {
	var {value, score} = props;
	if (score !== null) {
		value = `You've earned ${score} points!\n` + value;
	}

	return <Entity
		position={[0.2, 0.5, -2]}
		text={{
			width: 3,
			value: value,
			color: '#521616',
			align: "center"
		}}/>
}
