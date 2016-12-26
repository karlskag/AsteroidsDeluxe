import { gameState } from '../state/gameState.js'

function move(state) {
  let newState = state;
  //Check if keys are pressed and call functions
  //which perform updating of state
  if(gameState.isAccelerating(state)) {
    newState = performAcceleration(state);
  }
  if(gameState.isTurning(state)) {
    newState = performTurn(state);
  }
  newState = performMovement(state);

  return newState;
}

function performAcceleration(state) {
  return calculateVelocity(state);
}

function performTurn(state) {

}

//TODO: Rewrite functions updating position and velocity,
// 1. Can they be written to use more functional techniques? map()?
function calculateVelocity(state) {
  let newState = state;
  let newVelocity = state.ship.velocity;

  newVelocity.x -= Math.sin(-state.ship.rotation * Math.PI/180) * state.ship.speed;
  newVelocity.y -= Math.cos(-state.ship.rotation  * Math.PI/180) * state.ship.speed;

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
