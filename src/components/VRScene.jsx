import 'aframe';
import 'aframe-animation-component';
import 'aframe-html-shader';
// import 'aframe-text-component';
// import 'aframe-bmfont-text-component';
import {Entity, Scene} from 'aframe-react';
import Text from "./Text.jsx";
import Camera from "./Camera.jsx";
import ArrayHelper from "../helper";
import BasicSquare from "./figures/basicSquare.jsx";

import Cursor from "./Cursor.jsx";
import React from 'react';
import {HtmlContainer} from "./HtmlContainer.jsx";
import DeepCopy from '../DeepCopy';
import "../styles.less";

export class VRScene extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            player: {
                pos: {x: 0, y: 0},
                matrix: null,
                score: 0,
            },
            field:[],
            isStarted: false
        };
        this.initField();

        this.state.player.matrix = [
            [0,1,0],
            [1,1,1],
            [0,0,0]
        ];
    }
    startGame(){
      if (!this.state.isStarted) {
        var id = setInterval(()=>{
            var player = DeepCopy(this.state.player);
            player.pos.y++;
            if (this.isCollide(player)) {
                // console.log("dead");
                player.pos.y--;
                this.merge();
                player.pos.y = 0;
                this.setState({player: player});
            }
            else {
                this.setState({player: player});
            }
        }, 1000);
        this.setState({ isStarted: true, id: id});
      }
      else {
        clearInterval(this.state.id);
        this.setState({ isStarted: false});
      }

    }
    initField(){
        const ROWS = 20;
        const COLUMNS = 12;
        var clearField = [];

        for (var i = 0; i < ROWS; i++) {
            clearField.push(new Array(COLUMNS).fill(0));
        }

        //this.setState({field: clearField});
        this.state.field = clearField;
    }
    rotate(){
        var playerMatrix = DeepCopy(this.state.player.matrix);
        var rotatedMatrix = ArrayHelper.rotateClockwise(playerMatrix);
        var updatedPlayer = DeepCopy(this.state.player);
        updatedPlayer.matrix = rotatedMatrix;
        this.setState({player: updatedPlayer});
    }

    merge() {
        //merge player figure and game field
        this.state.player.matrix.forEach((row, rowIndex) => {
            row.forEach((value, x) => {
                if (value !== 0) {
                    this.setState(prevState =>{
                        prevState.field[rowIndex + prevState.player.pos.y][x + prevState.player.pos.x] = value;
                    });
                }
            });
        });
    }
    isCollide(player){
        var matrix = player.matrix;
        var position = player.pos;
        var field = this.state.field;

        for (var i = 0; i < matrix.length; i++) {
            for (var j = 0; j < matrix[i].length; j++) {
                if (matrix[i][j] && (!field[i + position.y] || field[i + position.y][j + position.x] != 0)) {
                    return true;
                }
            }
        }

        return false;
    }
    drawBackground(){
        const ROWS = 20;
        const COLUMNS = 12;

        var geometry = {primitive: "plane", height: ROWS, width: COLUMNS};

        return (<Entity geometry={geometry}
                        position="0 1 -11"
                        material={"color:white"}
                        />);
    }
    drawField(){
        var field = this.state.field;
        var player = this.state.player;
        const ROWS = 20;
        const COLUMNS = 12;
        var entityList = [];
        var material;

        field.forEach((row, rowIndex) => {
            entityList.push(row.map((elem, columnIndex) => {
                if (elem == 0) {
                    return null;
                }
                else {
                    material = "color: #6173F4"
                }

                return (
                    <BasicSquare
                        material={material}
                        position={[columnIndex, ROWS - rowIndex,  0]}
                    />);
                // return null;
            }));
        });

        player.matrix.forEach((row, rowIndex) => {
            row.forEach((elem, columnIndex)=> {
                if (elem != 0 ) {
                     entityList[player.pos.y + rowIndex][player.pos.x + columnIndex] = (
                        <BasicSquare
                            material={"color: #6173F4"}
                            position={[player.pos.x + columnIndex, ROWS - player.pos.y - rowIndex, 0]}
                            onClick={this.rotate.bind(this)}
                    />)
                }
            })
        });

        return entityList;
    }
    render () {
        return (
            <div>
                <Scene antialias="true"
                       fog="type: linear; color: #e2e2e2; far: 30; near: 0"
                       inspector="url: https://aframe.io/aframe-inspector/dist/aframe-inspector.js">
                    <Camera>
                        {/*<Text*/}
                        {/*text='Hello World1!'*/}
                        {/*color='#521616'*/}
                        {/*position='-1.75 1 -3'/>*/}
                        <Cursor/>
                    </Camera>
                    <Entity primitive={"a-sound"} sound="src: ./theme.mp3; autoplay: true; loop: true" />
                    <Entity primitive={"a-sky"} color="#AAB" />

                    <BasicSquare
                        position='-1.75 7 -3'
                        material="shader:html;target:#html-source"

                        onClick={this.startGame.bind(this)}/>

                    {/*{this.drawBackground()}*/}
                    <Entity position="-5 -10 -10">{this.drawField()}</Entity>

                    {/*<Z position={[-10, 0, -5]}/>*/}

                    {/*<S position={[-7, 0, -5]}/>*/}

                    {/*<T position={[-4, 0, -5]}/>*/}

                    {/*<L position={[0, 0, -5]}/>*/}

                    {/*<J position={[4, 0, -5]}/>*/}

                    {/*<I position={[6, 0, -5]}/>*/}

                    {/*<O position={[8, 0, -5]}/>*/}


                    {/*<Entity geometry={{primitive: 'box'}}*/}
                    {/*material="color: red"*/}
                    {/*position={[0, 2, -5]}*/}
                    {/*scale="2 2 2"*/}
                    {/*rotation="0 45 45"*/}
                    {/*animation="property: scale; dir: alternate; dur: 200;*/}
                    {/*easing: easeInSine; loop: true; to: 1.2 1 1.2"/>*/}
                </Scene>

                <HtmlContainer/>
            </div>
        );
    }
}
