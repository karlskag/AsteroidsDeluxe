function drawShip(context, state) {
  context.save();
  context.translate(state.ship.position.x, state.ship.position.y);
  context.rotate(state.ship.rotation * Math.PI / 180);
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

function drawShots(context, state) {
  const shots = state.shots;
  for (let shot in shots) {
    context.save();
    context.translate(shots[shot].position.x, shots[shot].position.y);
    context.rotate(shots[shot].rotation * Math.PI / 180);
    context.fillStyle = '#FFF';
    context.lineWidth = 2;
    context.beginPath();
    context.arc(0, 0, 2, 0, 2 * Math.PI);
    context.closePath();
    context.fill();
    context.restore();
  }
}

function drawAsteroids(context, state) {
  const asteroids = state.asteroids;
  for (let asteroid in asteroids) {
    let currentAsteroid = asteroids[asteroid];
    context.save();
    context.translate(currentAsteroid.position.x, currentAsteroid.position.y);
    context.strokeStyle = '#ffffff';
    context.lineWidth = 4;
    context.beginPath();
    for (let vert in currentAsteroid.vertices) {
      let v = currentAsteroid.vertices[vert];
      context.lineTo(v.x, v.y);
    }
    context.closePath();
    context.stroke();
    context.restore();
  }
}

export {
  drawShip,
  drawShots,
  drawAsteroids
}
