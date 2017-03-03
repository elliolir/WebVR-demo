import 'aframe';
import 'aframe-animation-component';
import 'aframe-html-shader';
//import 'aframe-text-component';
// import 'aframe-bmfont-text-component';
import {Entity, Scene} from 'aframe-react';
//import Text from "./Text.jsx";
import Camera from "./Camera.jsx";
import ArrayHelper from "../helper";
import BasicSquare from "./figures/basicSquare.jsx";
import Hint from "./Hint.jsx";

import Cursor from "./Cursor.jsx";
import {FigureHelper} from "../FigureHelper";
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
        this.initKeyboardControlls();

        this.state.player.matrix = FigureHelper.getFigure();
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
                this.checkAndRemoveFullRows(player);
                player.matrix = FigureHelper.getFigure();
                player.pos.y = 0;
                player.pos.x = Math.floor(this.props.size.j/2);
                //clearInterval(this.state.id);
            }
            this.setState({player: player});
        }, 1000);
        this.setState({ isStarted: true, id: id});
      }
      else {
        clearInterval(this.state.id);
        this.setState({ isStarted: false});
      }

    }
    checkAndRemoveFullRows(player){
      var rowCount = 0;
      var field = DeepCopy(this.state.field);
      for (var y = field.length - 1; y > 0; y--) {
        if (field[y].indexOf(0) != -1) {
          continue;
        }

          var row = field.splice(y, 1)[0].fill(0);
          field.unshift(row);
          y++;

          rowCount = rowCount ? rowCount * 2 : 1;

          player.score += rowCount * 10;
          rowCount *= 2;
      }

      if (rowCount){
        this.setState({field: field});
      }
    }
    initField(){
        const [ROWS, COLUMNS] = [this.props.size.i, this.props.size.j];
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
        var offset = 1;
        const originalPos = updatedPlayer.pos.x;
        while (this.isCollide(updatedPlayer)) {
            updatedPlayer.pos.x = originalPos + offset;
            offset = offset > 0 ? -offset : -offset + 1;
            if (offset > rotatedMatrix[0].length) {
                updatedPlayer.pos.x = originalPos;
                return;
            }
        }
        this.setState({player: updatedPlayer});
    }

    merge() {
        //merge player figure and game field
        var field = DeepCopy(this.state.field);
        var {player} = this.state;
        player.matrix.forEach((row, rowIndex) => {
            row.forEach((value, x) => {
                if (value !== 0) {
                    field[rowIndex + player.pos.y][x + player.pos.x] = value;
                }
            });
        });

        this.setState({field: field});
    }
    isCollide(player){
        var {matrix, pos} = player;
        var field = this.state.field;

        for (var i = 0; i < matrix.length; i++) {
            for (var j = 0; j < matrix[i].length; j++) {
                if (matrix[i][j] && (!field[i + pos.y] || field[i + pos.y][j + pos.x] != 0)) {
                    return true;
                }
            }
        }

        return false;
    }
    drawMenu(){
      if (!this.state.isStarted) {
        return (
          <BasicSquare
            position='-1.75 7 -3'
            material="shader:html;target:#html-source"
            onClick={this.startGame.bind(this)}/>)
      }
    }
    drawBackground(){
        const [ROWS, COLUMNS] = [this.props.size.i, this.props.size.j];

        var geometry = {primitive: "plane", height: ROWS, width: COLUMNS};

        return (<Entity geometry={geometry}
                        position="0 1 -11"
                        material={"color:white"}
                        />);
    }
    drawField(){
        const ROWS = this.props.size.i;

        var {field, player} = this.state;
        var entityList = [];
        var material;

        field.forEach((row, rowIndex) => {
            entityList.push(row.map((elem, columnIndex) => {
                if (elem != 0) {
                    material = "color: " + FigureHelper.getFigureColor(elem);
                    return (<BasicSquare
                        material={material}
                        position={[columnIndex, ROWS - rowIndex,  0]}
                    />);
                }
            }));
        });

        player.matrix.forEach((row, rowIndex) => {
            row.forEach((elem, columnIndex)=> {
                if (elem != 0 ) {
                  var color = "color: " + FigureHelper.getFigureColor(elem);
                     entityList[player.pos.y + rowIndex][player.pos.x + columnIndex] = (
                        <BasicSquare
                            material={color}
                            position={[player.pos.x + columnIndex, ROWS - player.pos.y - rowIndex, 0]}
                            onClick={this.rotate.bind(this)}
                    />)
                }
            })
        });

        return entityList;
    }
    initKeyboardControlls(){
        window.addEventListener('keydown', this.moveHandler.bind(this), false);
    }
    moveHandler(event){
        const {code} = event;
        var moveTo;
        if (code == "KeyD" || code == "ArrowRight") {
            moveTo = "right";
        }
        else if (code == "KeyA" || code == "ArrowLeft"){
            moveTo = "left";
        }
        else if (code == "KeyS" || code == "ArrowDown"){
            moveTo = "down";
        }
        else {
            return;
        }

        var player = DeepCopy(this.state.player);

        switch (moveTo){
            case "right":
                player.pos.x++;
                break;
            case "left":
                player.pos.x--;
                break;
            case "down":
                player.pos.y++;
                break;
        }

        if (!this.isCollide(player)) {
            this.setState({player: player});
        }
    }
    render () {
        return (
            <div onKeyPress={()=>console.log("press")}>
                <Scene antialias="true"
                       fog="type: linear; color: #e2e2e2; far: 30; near: 0"
                       inspector="url: https://aframe.io/aframe-inspector/dist/aframe-inspector.js"
                       onLoaded={()=>{console.log("loaded")}}>
                    <Camera wasd-controls="enabled:false;">
                        {!this.state.isStarted && <Hint value="To start the game, press the start button"/>}
                        <Cursor/>
                    </Camera>
                    {this.state.isStarted && <Entity primitive="a-sound" sound="src: ./theme.mp3; autoplay: true; loop: true" />}

                    {/*<Entity geometry={{primitive: "plane", height: 20, width: 20}} material={{shader:"html", target:"#html-source"}} position={[1, 0, -8]}/>*/}

                    <a-sky color="#AAB" />

                    {/*{this.drawBackground()}*/}
                    <Entity position="-5 -10 -10">{this.drawField()}</Entity>

                    {/*curved test*/}
                    {/*<Entity geometry="primitive: cylinder; openEnded: true; thetaLength: 180"*/}
                              {/*material="side: double" position="-5 -10 -10"></Entity>*/}

                    // {<Entity position="0 0 -5">{this.drawMenu()}</Entity>}

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
