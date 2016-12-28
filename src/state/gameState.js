
function getInitialState(initialPosition) {
  const state = {
    ship : {
      position : initialPosition,
      velocity : {
        x: 0,
        y: 0,
      },
      rotation: 0,
      rotationSpeed: 6,
      speed: 0.15,
      inertia: 0.99,
      radius: 20,
      lastShot: 0,
    },
    asteroids: [],
    shots: [],
    gameController : {
      up: 0,
      left: 0,
      right: 0,
      space: 0
    }
  };

  return state;
}

function pressUp(state, isPressed) {
  return Object.assign({}, state, {
    gameController:  Object.assign({}, state.gameController, {
      up: isPressed
    })
  })
}

function pressLeft(state, isPressed) {
  return Object.assign({}, state, {
    gameController: Object.assign({}, state.gameController, {
      left: isPressed
    })
  })
}

function pressRight(state, isPressed) {
  return Object.assign({}, state, {
    gameController: Object.assign({}, state.gameController, {
      right: isPressed
    })
  })
}

function pressSpace(state, isPressed) {
  return Object.assign({}, state, {
    gameController: Object.assign({}, state.gameController, {
      space: isPressed
    })
  })
}

function isAccelerating(state) {
  return state.gameController.up;
}

function isTurningLeft(state) {
  return state.gameController.left;
}

function isTurningRight(state) {
  return state.gameController.right;
}

function isShooting(state) {
  return state.gameController.space;
}

function updateShipPosition(state, newPosition) {
  return Object.assign({}, state, {
    ship: Object.assign({}, state.ship, {
      position: newPosition
    })
  })
}

function updateShipVelocity(state, newVelocity) {
  return Object.assign({}, state, {
    ship: Object.assign({}, state.ship, {
      velocity: newVelocity
    })
  })
}

function updateRotation(state, newRotation) {
  return Object.assign({}, state, {
    ship: Object.assign({}, state.ship, {
      rotation: newRotation
    })
  })
}

function createShot(initialPosition, velocity, rotation, speed) {
  return {
    position: initialPosition,
    velocity: velocity,
    rotation: rotation,
    speed: speed,
    fireTime: Date.now()
  }
}

function updateShots(state, newShots) {
  return Object.assign({}, state, {
    shots: newShots
  })
}

function updateShotPosition(shot, newPosition) {
  return Object.assign({}, shot, {
    position: newPosition
  })
}

function getShipPosition(position) {
  return Object.assign({}, position)
}

export const gameState = {
  getInitialState: getInitialState,
  pressUp: pressUp,
  pressLeft: pressLeft,
  pressRight: pressRight,
  pressSpace: pressSpace,
  isAccelerating: isAccelerating,
  isTurningLeft: isTurningLeft,
  isTurningRight: isTurningRight,
  isShooting: isShooting,
  updateShipPosition: updateShipPosition,
  updateShipVelocity: updateShipVelocity,
  updateRotation: updateRotation,
  createShot: createShot,
  updateShots: updateShots,
  updateShotPosition: updateShotPosition,
  getShipPosition: getShipPosition
}
