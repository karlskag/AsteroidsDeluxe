
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
  let up = state.gameController.up;
  return Object.assign({}, state, {
    up : isPressed
  })
}

function pressLeft(state, isPressed) {
  let left = state.gameController.left;
  return Object.assign({}, state, {
    left : isPressed
  })
}

function pressRight(state, isPressed) {
  let right = state.gameController.right;
  return Object.assign({}, state, {
    right : isPressed
  })
}

function pressSpace(state, isPressed) {
  let space = state.gameController.space;
  console.log("zap");
  return Object.assign({}, state, {
    space : isPressed
  })
}

export const gameState = {
  getInitialState: getInitialState,
  pressUp: pressUp,
  pressLeft: pressLeft,
  pressRight: pressRight,
  pressSpace: pressSpace
}
