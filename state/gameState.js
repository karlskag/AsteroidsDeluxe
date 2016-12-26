
function getInitialState(initialPosition) {
  const state = {
    ship : {
      position : initialPosition,
      velocity : {
        x: 0,
        y: 0,
      },
      rotation: 0,
      rotationspeed: 6,
      speed: 0.15,
      inertia: 0.99,
      radius: 20,
      lastShot: 0,
    },
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
    gameController:  Object.assign({}, state.gameController, {
      left: isPressed
    })  })
}

function pressRight(state, isPressed) {
  return Object.assign({}, state, {
    gameController:  Object.assign({}, state.gameController, {
      right: isPressed
    })  })
}

function pressSpace(state, isPressed) {
  return Object.assign({}, state, {
    gameController:  Object.assign({}, state.gameController, {
      space: isPressed
    })
  })
}

export const gameState = {
  getInitialState: getInitialState,
  pressUp: pressUp,
  pressLeft: pressLeft,
  pressRight: pressRight,
  pressSpace: pressSpace
}
