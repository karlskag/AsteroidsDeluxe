// From: http://codepen.io/bungu/pen/rawvJe

/**
 * Generates vertices for asteroid polygon with certain count and radius
 * @param  {Number} count   Number of vertices
 * @param  {Number} rad     Maximal radius of polygon
 * @return {Array}          Array of vertices: {x: Number, y: Number}
 */
export function asteroidVertices(count, rad) {
  let p = [];
  for (let i = 0; i < count; i++) {
    p[i] = {
      x: (-Math.sin((360/count)*i*Math.PI/180) + Math.round(Math.random()*2-1)*Math.random()/3)*rad,
      y: (-Math.cos((360/count)*i*Math.PI/180) + Math.round(Math.random()*2-1)*Math.random()/3)*rad
    };
  }
  return p;
};

/**
 * Random Number between 2 numbers
 */
export function randomNumBetween(min, max) {
  return Math.random() * (max - min + 1) + min;
};
