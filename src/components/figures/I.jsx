import {Entity} from 'aframe-react';
import React from 'react';
import BasicSquare from "./basicSquare.jsx";

export class I extends React.Component {
    render(){
        const extraProps = AFRAME.utils.extend({}, this.props);
        const mainMaterial = "color: #cfe629";
        this.state = {material : mainMaterial};

        return (
            <Entity {...extraProps} onClick={this.changeColor.bind(this)}>
                <BasicSquare material={{color: this.state.material}} position="0 3 0"/>
                <BasicSquare material={{color: this.state.material}} position="0 2 0"/>
                <BasicSquare material={{color: this.state.material}} position="0 1 0"/>
                <BasicSquare material={{color: this.state.material}} position="0 0 0"/>
            </Entity>
        )
    }
    changeColor(){
        console.log("clocked");
        this.setState({material:"color: #fff"})
    }
};