import {Entity} from 'aframe-react';
import React from 'react';

export default function(props){
    var {value} = props;
    return <Entity
                position={[0.4, 0.5, -2]}
                text={{ width: 3,
                        value: value,
                        color: '#521616'}}/>
}
