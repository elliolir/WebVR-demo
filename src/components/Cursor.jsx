import {Entity} from 'aframe-react';
import React from 'react';


export default props => {
    const extraProps = AFRAME.utils.extend({}, props);

    // return <Entity
    //     cursor="fuse: true; fuseTimeout: 500"
    //     position="0 0 -1"
    //     geometry="primitive: ring"
    //
    //     width="0.01"
    //     {...extraProps}/>

    return <a-cursor
        material="color: #2c2690; shader: flat"/>
};