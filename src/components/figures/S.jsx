import {Entity} from 'aframe-react';
import React from 'react';
import BasicSquare from "./basicSquare.jsx";

export class S extends React.Component {
    render(){
        const extraProps = AFRAME.utils.extend({}, this.props);
        const mainMaterial = "color: #2e22b9";

        return (
            <Entity {...extraProps}>
                <BasicSquare material={mainMaterial} position="0 0 0"/>
                <BasicSquare material={mainMaterial} position="1 0 0"/>
                <BasicSquare material={mainMaterial} position="1 1 0"/>
                <BasicSquare material={mainMaterial} position="2 1 0"/>
            </Entity>
        )
    }
};