import {Entity} from 'aframe-react';
import React from 'react';


export default props => (
	<Entity
		primitive={"a-box"} //vs a-image
		height="1"
		width="1"
		{...props}/>
);