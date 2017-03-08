import React from 'react';
import ReactDOM from 'react-dom';
import {VRScene} from "./VRScene.jsx";

const fieldSize = {
	i: 20,
	j: 12
};

ReactDOM.render(
	<VRScene size={fieldSize}/>,
	document.getElementById('app')
);