import {Entity} from 'aframe-react';
import React from 'react';

export default props => (
	<Entity
		primitive={"a-camera"}
		{...props}/>
);