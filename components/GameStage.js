import React, { Component } from 'react';
import { gameState } from '../state/gameState.js';
import keys from '../core/controlKeys.js';

/*
* The goal of this GameStage-component is to encapsulate and handle all
* view-state and updating of canvas as an extremity of the application.
* This class will be allowed to mutate it's view when it queries the game-state
* through the core api for data about the entities.
*/

export class GameStage extends Component {
  constructor() {
    super();
    this.state = {
      viewSize: {
        width: window.innerWidth,
        height: window.innerHeight,
      },
      context: null
    };
  }

  componentDidMount() {
    const initialPosition = {
      x: this.state.viewSize.width/2,
      y: this.state.viewSize.height/2
    };
    const currentState = gameState.getInitialState(initialPosition);
    const context = this.refs.canvas.getContext('2d');

    //hook up the game controller
    window.addEventListener('keyup', this.handleKeys.bind(this, currentState, false));
    window.addEventListener('keydown', this.handleKeys.bind(this, currentState, true));

    this.setState({ context: context });

    requestAnimationFrame(() => {this.updateCanvas(currentState)});
  }

  componentWillUnmount() {
    //remove game controller hooks
    window.removeEventListener('keyup', this.handleKeys);
    window.removeEventListener('keydown', this.handleKeys);
  }

  updateCanvas(currentState) {
    const context = this.state.context;

    context.fillRect(0,0, this.state.viewSize.width, this.state.viewSize.height);
    this.drawShip(context, currentState);
  }

  render() {
    return (
      <canvas ref="canvas"
      width={this.state.viewSize.width}
      height={this.state.viewSize.height}/>
    );
  }

  handleKeys(currentState, value, e) {
    let newState = currentState;

    //TODO: Abstract all method calls to core. Ex. core.move, core.accelerate or core.turn?
    //we should never call state direct from view.
    if(e.keyCode === keys.UP) { newState = gameState.pressUp(currentState, value); }
    if(e.keyCode === keys.RIGHT) { newState = gameState.pressRight(currentState, value); }
    if(e.keyCode === keys.LEFT) { newState = gameState.pressLeft(currentState, value); }
    if(e.keyCode === keys.SPACE) { newState = gameState.pressSpace(currentState, value); }

    console.log(newState);
    return newState;
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
}
