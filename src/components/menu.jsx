import React from "react";
import 'aframe-html-shader'

export default class Menu extends React.Component {
    render(){
        return <Entity geometry={{primitive: "plane"}}
                       material={"color:white"}
                       position={[5, 5, -3]}/>
    }
}