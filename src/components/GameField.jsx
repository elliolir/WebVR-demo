import {Entity} from 'aframe-react';
import React from 'react';


export default (props) => {
    let material = {color: props.color, side: "double", metalness: 0.15};
    let [fieldHeight, fieldWidth] = [props.size.i, props.size.j];

    return (<Entity position={props.position}>
        <Entity geometry={{primitive: "plane", height: fieldHeight, width: fieldWidth}}
                material={material}/>
        <Entity geometry={{primitive: "plane", height: 1, width: fieldWidth}}
                material={material} rotation={[-90, 0, 0]}
                position={[0, -10, 0.5]}/>
        <Entity geometry={{primitive: "plane", height: fieldHeight, width: 1}}
                material={material} rotation={[0, -90, 0]}
                position={[6, 0, 0.5]}/>
        <Entity geometry={{primitive: "plane", height: fieldHeight, width: 1}}
                material={material} rotation={[0, 90, 0]}
                position={[-6, 0, 0.5]}/>
    </Entity>)
}