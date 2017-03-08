import BasicSquare from "./BasicCube.jsx";
import React from 'react';

export default props => (
	<BasicSquare
		material="shader:html;target:#html-source"
		position={[10, 0, 0]}
		animation={{property: 'position', dir: "alternate", dur: 2500, loop: true, to: '-10 0 0'}}
		onClick={props.clickHandler}/>
)