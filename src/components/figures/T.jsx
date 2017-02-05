import {Entity} from 'aframe-react';
import React from 'react';
import BasicSquare from "./basicSquare.jsx";

export class T extends React.Component {
    render(){
        const extraProps = AFRAME.utils.extend({}, this.props);
        const mainMaterial = "color: #b922a4";

        return (
            <Entity {...extraProps}>
                <BasicSquare material={mainMaterial} position="0 0 0"/>
                <BasicSquare material={mainMaterial} position="1 0 0"/>
                <BasicSquare material={mainMaterial} position="2 0 0"/>
                <BasicSquare material={mainMaterial} position="1 1 0"/>
            </Entity>
        )
    }
};