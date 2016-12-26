import { gameState } from '../state/gameState.js'

function move(state) {
  let newState = state;
  //Check if keys are pressed and call functions
  //which perform updating of state
  if (gameState.isAccelerating(newState)) {
    newState = performAcceleration(newState);
  }
  if (gameState.isTurningLeft(newState)) {
    const rotationSpeed = state.ship.rotationSpeed;
    let newRotation = state.ship.rotation;

    newRotation -= rotationSpeed;
    if (newRotation >= 360) {
      newRotation -= 360;
    }
    if (newRotation < 0) {
      newRotation += 360;
    }
    newState = performLeftTurn(newState, newRotation);
  }
  if (gameState.isTurningRight(newState)) {
    const rotationSpeed = state.ship.rotationSpeed;
    let newRotation = state.ship.rotation;

    newRotation += rotationSpeed;
    if (newRotation >= 360) {
      newRotation -= 360;
    }
    if (newRotation < 0) {
      newRotation += 360;
    }
    newState = performRightTurn(newState, newRotation);
  }

  newState = performMovement(newState);

  return newState;
}

function performAcceleration(state) {
  return calculateVelocity(state);
}

function performLeftTurn(state, rotation) {
  return gameState.updateRotation(state, rotation);
}

function performRightTurn(state, rotation) {
  return gameState.updateRotation(state, rotation);
}

//TODO: Rewrite functions updating position and velocity,
// 1. Can they be written to use more functional techniques? map()?
function calculateVelocity(state, accelerating) {
  let newState = state;
  let newVelocity = state.ship.velocity;

  //Calculate velocity x/y using angle and speed with trig functions
  newVelocity.x -= Math.sin(-state.ship.rotation * Math.PI/180) * state.ship.speed;
  newVelocity.y -= Math.cos(-state.ship.rotation * Math.PI/180) * state.ship.speed;

  newState = gameState.updateShipVelocity(state, newVelocity);

  return newState;
}

function performMovement(state) {
  let newPosition = state.ship.position;
  let newVelocity = state.ship.velocity;
  let newState = state;

  //Move ship
  newPosition.x += newVelocity.x;
  newPosition.y += newVelocity.y;
  newVelocity.x *= state.ship.inertia;
  newVelocity.y *= state.ship.inertia;

  newState = gameState.updateShipPosition(state, newPosition);
  newState = gameState.updateShipVelocity(state, newVelocity);

  return newState;
}

const movement = {
  move: move
}

export default movement;
