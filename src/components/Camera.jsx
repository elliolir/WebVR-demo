import {Entity} from 'aframe-react';
import React from 'react';


export default props => {
    const extraProps = AFRAME.utils.extend({}, props);

    return <Entity
        primitive={"a-camera"}
        {...extraProps}/>
};