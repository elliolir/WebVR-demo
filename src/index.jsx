import 'aframe';
import React from 'react';
import ReactDOM from 'react-dom';
import {VRScene} from "./components/VRScene.jsx";

const fieldSize = {
    i: 12,
    j: 20
};

ReactDOM.render(
    <VRScene size={fieldSize}/>,
    document.getElementById('app')
);