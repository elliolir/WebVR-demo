import 'aframe';
import 'aframe-animation-component';
import 'aframe-text-component';
import 'aframe-bmfont-text-component';
import {Entity, Scene} from 'aframe-react';
import Text from "./text.jsx";
// import Background from "./background.jsx";
import React from 'react';

export class VRScene extends React.Component {
    render () {
        return (
            <Scene antialias="true"
                   fog="type: linear; color: #AAB; far: 30; near: 0"
                   inspector="url: https://aframe.io/releases/0.3.0/aframe-inspector.min.js">
                <Entity primitive={"a-camera"}>
                    <Text
                        text='Hello World1!'
                        color='#521616'
                        position='-1.75 1 -3'/>
                </Entity>
                <Entity primitive={"a-sound"} sound="src: ./theme.mp3; autoplay: true; loop: true" />
                {/*<Entity primitive={"a-sound"}/>*/}
                {/*<Background src="url(http://bernieroehl.com/wp-content/uploads/2014/12/PANO_20140810_080527.jpg)"/>*/}
                <Entity primitive={"a-sky"} color="#AAB" />
                <Entity geometry={{primitive: 'box'}}
                        material="color: red"
                        position={[0, 2, -5]}
                        scale="2 2 2"
                        rotation="0 45 45"
                        animation="property: scale; dir: alternate; dur: 200;
                           easing: easeInSine; loop: true; to: 1.2 1 1.2"/>
            </Scene>
        );
    }
}
