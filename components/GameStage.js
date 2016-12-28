import React, { Component } from 'react';
import { gameState } from '../src/state/gameState.js';
import KEYS from '../src/core/controlKeys.js';
import movement from '../src/core/movement.js';

/*
* The goal of this GameStage-component is to encapsulate and handle all
* view-state and updating of canvas as an extremity of the application.
* This class will be allowed to mutate it's view when it queries the game-state
* through the core api for data about the entities.
*/

export class GameStage extends Component {
  constructor() {
    super();
    const initialState = gameState.getInitialState({
      x: window.innerWidth/2,
      y: window.innerHeight/2
    });
    this.state = {
      currentState: initialState,
      viewSize: {
        width: window.innerWidth,
        height: window.innerHeight,
      },
      context: null,
      keys: {
        up: 0,
        right: 0,
        left: 0,
        space: 0
      }
    };
  }

  componentDidMount() {
    const context = this.refs.canvas.getContext('2d');

    this.setState({ context: context });

    //hook up the game controller
    window.addEventListener('keyup', this.handleKeys.bind(this, false));
    window.addEventListener('keydown', this.handleKeys.bind(this, true));

    requestAnimationFrame(() => {this.updateCanvas()});
  }

  componentWillUnmount() {
    //remove game controller hooks
    window.removeEventListener('keyup', this.handleKeys);
    window.removeEventListener('keydown', this.handleKeys);
  }

  updateCanvas() {
    const context = this.state.context;
    const keys = this.state.keys;
    let currentState = this.state.currentState;

    currentState = gameState.pressUp(currentState, keys.up);
    currentState = gameState.pressRight(currentState, keys.right);
    currentState = gameState.pressLeft(currentState, keys.left);
    currentState = gameState.pressSpace(currentState, keys.space);

    //Draw canvas and entities
    context.fillstyle = '#000';
    context.globalAlpha = 0.6;
    context.fillRect(0,0, this.state.viewSize.width, this.state.viewSize.height);
    context.globalAlpha = 1;
    this.drawShip(context, currentState);
    this.drawShots(context, currentState);

    //Update state with movements
    let newState = currentState;
    newState = movement.moveShip(newState, this.state.viewSize.width, this.state.viewSize.height);
    newState = movement.moveShots(newState, this.state.viewSize.width, this.state.viewSize.height);

    this.setState({ currentState: newState });

    requestAnimationFrame(() => {this.updateCanvas()});
  }

  handleKeys(value, e) {
    let keys = this.state.keys;

    if (e.keyCode === KEYS.UP) { keys.up = value }
    if (e.keyCode === KEYS.RIGHT) { keys.right = value }
    if (e.keyCode === KEYS.LEFT) { keys.left = value }
    if (e.keyCode === KEYS.SPACE) { keys.space = value }

    this.setState({ keys: keys });
  }

  drawShip(context, currentState) {
    context.save();
    context.translate(currentState.ship.position.x, currentState.ship.position.y);
    context.rotate(currentState.ship.rotation * Math.PI / 180);
    context.strokeStyle = '#ffffff';
    context.fillStyle = '#000000';
    context.lineWidth = 2;
    context.beginPath();
    context.moveTo(0, -15);
    context.lineTo(10, 10);
    context.lineTo(5, 7);
    context.lineTo(-5, 7);
    context.lineTo(-10, 10);
    context.closePath();
    context.fill();
    context.stroke();
    context.restore();
  }

  drawShots(context, currentState) {
    const shots = currentState.shots;
    for (let shot in shots) {
      context.save();
      context.translate(shots[shot].position.x, shots[shot].position.y);
      context.rotate(shots[shot].rotation * Math.PI / 180);
      context.fillStyle = '#FFF';
      context.lineWidth = 0,5;
      context.beginPath();
      context.arc(0, 0, 2, 0, 2 * Math.PI);
      context.closePath();
      context.fill();
      context.restore();
    }
  }

  render() {
    return (
      <div>
        <canvas ref="canvas"
        width={this.state.viewSize.width}
        height={this.state.viewSize.height}
        />
      </div>
    );
  }
}
