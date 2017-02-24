import React from "react";
import 'aframe-html-shader'

export class aframeMenu extends React.Component {
    render(){
        return <Entity geometry={{primitive: "plane"}}
                       material={"color:white"}
                       position={[5, 5, -3]}/>
    }
};

export function htmlMenu(){
    return <div></div>

};