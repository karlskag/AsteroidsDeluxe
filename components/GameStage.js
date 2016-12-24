import React, { Component } from 'react';

export class GameStage extends Component {
  constructor() {
    super();
    this.state = {
      viewSize : {
        width: window.innerWidth,
        height: window.innerHeight,
      }
    };
  }

  componentDidMount() {
    this.updateCanvas();
  }

  updateCanvas() {
    const ctx = this.refs.canvas.getContext('2d');
    ctx.fillRect(0,0,200,100);
  }

  render() {
    return (
      <canvas ref="canvas"
      width={this.state.viewSize.width}
      height={this.state.viewSize.height}/>
    );
  }
}
