import {Entity} from 'aframe-react';
import React from 'react';

export default props => (
        <Entity
        position={[-10, 2, -9]}
        text={{ width: 10,
            wrapCount: 15,
            align: 'center',
            value: `Your score is \n ${props.score}`,
            font: 'https://cdn.aframe.io/fonts/KelsonSans.fnt',
            color: '#54b553'}}/>
)
