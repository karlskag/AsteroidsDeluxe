import React, { Component } from 'react';
import { gameState } from '../src/state/gameState.js';
import keys from '../src/core/controlKeys.js';
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
      context: null
    };
  }

  componentDidMount() {
    const context = this.refs.canvas.getContext('2d');

    this.setState({ context: context });

    //hook up the game controller
    window.addEventListener('keyup', this.handleKeys.bind(this, this.state.currentState, false));
    window.addEventListener('keydown', this.handleKeys.bind(this, this.state.currentState, true));

    requestAnimationFrame(() => {this.updateCanvas(this.state.currentState)});
  }

  componentWillUnmount() {
    //remove game controller hooks
    window.removeEventListener('keyup', this.handleKeys);
    window.removeEventListener('keydown', this.handleKeys);
  }

  updateCanvas(currentState) {
    const context = this.state.context;

    //Draw canvas and entities
    context.fillRect(0,0, this.state.viewSize.width, this.state.viewSize.height);
    this.drawShip(context, currentState);

    //Update state with movements
    const newState = movement.move(currentState);
    this.setState({ currentState: newState });

    requestAnimationFrame(() => {this.updateCanvas(this.state.currentState)});
  }

  //TODO should this whole function be moved to core or utils?
  handleKeys(currentState, value, e) {
    let newState = currentState;

    //TODO: Abstract all method calls to core. Ex. core.move, core.accelerate or core.turn?
    //we should never call state direct from view.
    if(e.keyCode === keys.UP) { newState = gameState.pressUp(currentState, value); }
    if(e.keyCode === keys.RIGHT) { newState = gameState.pressRight(currentState, value); }
    if(e.keyCode === keys.LEFT) { newState = gameState.pressLeft(currentState, value); }
    if(e.keyCode === keys.SPACE) { newState = gameState.pressSpace(currentState, value); }

    this.setState({ currentState: newState });
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

  render() {
    return (
      <canvas ref="canvas"
      width={this.state.viewSize.width}
      height={this.state.viewSize.height}/>
    );
  }
}
