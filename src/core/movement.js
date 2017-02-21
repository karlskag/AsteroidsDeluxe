import { gameState } from '../state/gameState.js'

function moveShip(state, maxWidth, maxHeight) {
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

  newState = performShipMovement(newState, maxWidth, maxHeight);

  return newState;
}

function moveShots(state, maxWidth, maxHeight) {
  let newState = state;
  //check if space is pressed
  if(gameState.isShooting(newState)) {
    //if pressed and deltaTime since last shot is OK
    if(isFiringConditionsOK(newState)) {
      //then create shot with initial values and push to array
      const currentShots = newState.shots;
      const currentPosition = gameState.getShipPosition(newState.ship.position);
      const rotation = newState.ship.rotation;
      newState = performShot(newState, currentShots, currentPosition, rotation);
    }
  }
  //For all shots in shot array
  //calculate new position
  newState = performShotsMovement(newState, maxWidth, maxHeight);

  return newState;
}

function moveAsteroids(state, maxWidth, maxHeight) {

}

function isFiringConditionsOK(state) {
  if (state.shots.length > 0) {
    const deltaTime = Date.now() - state.shots[state.shots.length - 1].fireTime;
    if (deltaTime >= 300) {
      return true;
    } else {
      return false;
    }
  }
  return true;
}

function performAcceleration(state) {
  return calculateShipVelocity(state);
}

function performLeftTurn(state, rotation) {
  return gameState.updateRotation(state, rotation);
}

function performRightTurn(state, rotation) {
  return gameState.updateRotation(state, rotation);
}

function performShot(state, currentShots, currentPosition, rotation) {
  const speed = 15;
  const velocity = calculateShotVelocity(speed, rotation);
  const newShot = gameState.createShot(currentPosition, velocity, rotation, speed);

  currentShots.push(newShot);

  return gameState.updateShots(state, currentShots);
}

//TODO: Rewrite functions updating position and velocity,
// 1. Can they be written to use more functional techniques? map()?
function calculateShipVelocity(state) {
  let newState = state;
  let newVelocity = state.ship.velocity;

  //Calculate velocity x/y using angle and speed with trig functions
  newVelocity.x -= Math.sin(-state.ship.rotation * Math.PI/180) * state.ship.speed;
  newVelocity.y -= Math.cos(-state.ship.rotation * Math.PI/180) * state.ship.speed;

  newState = gameState.updateShipVelocity(state, newVelocity);

  return newState;
}

function calculateShotVelocity(speed, rotation) {
  const shotVelocity = { x: 0, y: 0 };

  shotVelocity.x -= Math.sin(-rotation * Math.PI/180) * speed;
  shotVelocity.y -= Math.cos(-rotation * Math.PI/180) * speed;

  return shotVelocity
}

function performShipMovement(state, maxWidth, maxHeight) {
  let newPosition = state.ship.position;
  let newVelocity = state.ship.velocity;
  let newState = state;

  //Move ship
  newPosition.x += newVelocity.x;
  newPosition.y += newVelocity.y;
  newVelocity.x *= state.ship.inertia;
  newVelocity.y *= state.ship.inertia;

  // TODO: Rewrite, no access to global scope in core :(
  if (newPosition.x > maxWidth) {
    newPosition.x = 0;
  } else if (newPosition.x < 0) {
    newPosition.x = maxWidth;
  }
  if (newPosition.y > maxHeight) {
    newPosition.y = 0;
  } else if (newPosition.y < 0) {
    newPosition.y = maxHeight;
  }

  newState = gameState.updateShipPosition(state, newPosition);
  newState = gameState.updateShipVelocity(state, newVelocity);

  return newState;
}

function performShotsMovement(state, maxWidth, maxHeight) {
  const currentShots = state.shots;
  const newShots = []; //Rework this solution...

  for (let shot in currentShots) {
    let newPosition = currentShots[shot].position;
    let velocity = currentShots[shot].velocity;

    newPosition.x += velocity.x;
    newPosition.y += velocity.y;

    let newShot = gameState.updateShotPosition(currentShots[shot], newPosition);
    if ((newPosition.x > 0 && newPosition.x < maxWidth)
       && (newPosition.y > 0 && newPosition.y < maxHeight)) {
      newShots.push(newShot);
    }
  }

  return gameState.updateShots(state, newShots);
}

const movement = {
  moveShip: moveShip,
  moveShots: moveShots
}

export default movement;
