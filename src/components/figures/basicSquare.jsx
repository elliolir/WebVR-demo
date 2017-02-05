import {Entity} from 'aframe-react';
import React from 'react';


export default props => {
    const extraProps = AFRAME.utils.extend({}, props);

    return <Entity
        primitive={"a-box"} //vs a-image
        height="1"
        width="1"
        {...extraProps}/>
};