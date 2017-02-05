import 'aframe';
import 'aframe-animation-component';
import 'aframe-text-component';
import 'aframe-bmfont-text-component';
import {Entity, Scene} from 'aframe-react';
import Text from "./Text.jsx";
import Camera from "./Camera.jsx";
import {L} from "./figures/L.jsx";
import {J} from "./figures/J.jsx";
import {I} from "./figures/I.jsx";
import {O} from "./figures/O.jsx";
import {T} from "./figures/T.jsx";
import {S} from "./figures/S.jsx";
import {Z} from "./figures/Z.jsx";
import Background from "./Background.jsx";
import Cursor from "./Cursor.jsx";
import React from 'react';

export class VRScene extends React.Component {
    render () {
        return (
            <Scene antialias="true"
                   fog="type: linear; color: #e2e2e2; far: 30; near: 0"
                   inspector="url: https://aframe.io/releases/0.3.0/aframe-inspector.min.js">
                <Camera>
                    <Text
                        text='Hello World1!'
                        color='#521616'
                        position='-1.75 1 -3'/>
                    <Cursor/>
                </Camera>
                <Entity primitive={"a-sound"} sound="src: ./theme.mp3; autoplay: true; loop: true" />
                {/*<Background src="url(http://bernieroehl.com/wp-content/uploads/2014/12/PANO_20140810_080527.jpg)"/>*/}
                <Entity primitive={"a-sky"} color="#AAB" />

                <Z position={[-10, 0, -5]}/>

                <S position={[-7, 0, -5]}/>

                <T position={[-4, 0, -5]}/>

                <L position={[0, 0, -5]}/>

                <J position={[4, 0, -5]}/>

                <I position={[6, 0, -5]}/>

                <O position={[8, 0, -5]}/>


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
