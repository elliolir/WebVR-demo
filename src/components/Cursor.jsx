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

    return (<a-cursor
              material="color: #2c2690; shader: flat">
                <a-animation
                  begin="click"
                  easing="ease-in"
                  attribute="scale"
                  fill="backwards"
                  from="0.1 0.1 0.1"
                  to="1 1 1"
                  dur="150"/>
            </a-cursor>)
};
