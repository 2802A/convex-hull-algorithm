// Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/148-gift-wrapping.html
// https://youtu.be/YNyULRrydVI
// https://editor.p5js.org/codingtrain/sketches/IVE9CxBOF

// Gift Wrapping Algorithm

const points = [];
const removedPoints = [];
const extremes = [];
const hull = [];

let leftMost;
let topMost;
let rightMost;
let bottomMost;
let currentVertex;
let index;
let nextIndex = -1;
let nextVertex;



function setup() {
  createCanvas(1000, 1000);
  let buffer = 80;
  for (let i = 0; i < 2000; i++) {
    points.push(
      createVector(
        random(buffer, width - buffer),
        random(buffer, height - buffer)
      )
    );
  }

  points.sort((a,b) => a.y - b.y);
  topMost = points[0];
  bottomMost = points[49];

  points.sort((a, b) => a.x - b.x);
  rightMost = points[49];
  leftMost = points[0];

  //console log the extremes
  console.log('top'+topMost);
  console.log('bottom'+bottomMost);
  console.log('right'+rightMost);
  console.log('left'+leftMost);

  currentVertex = leftMost;
  hull.push(currentVertex);
  nextVertex = points[1];
  index = 2;

  function area(x1, y1, x2, y2, x3, y3) {
    return abs(Math.round((x1 * (y2 - y3) + x2 * (y3 - y1) + x3 * (y1 - y2)) / 2.0));
  }

 for(let k=0; k<4; k++){
  for (let i = 0; i < points.length; i++) {
    let flag = false;
    //if point is extreme, skip
    if (points[i] == leftMost || points[i] == rightMost || points[i] == topMost || points[i] == bottomMost) {
      continue;
    }

    let A = area(leftMost.x, leftMost.y, topMost.x, topMost.y, rightMost.x, rightMost.y);
    let A1 = area(leftMost.x, leftMost.y, topMost.x, topMost.y, points[i].x, points[i].y);
    let A2 = area(rightMost.x, rightMost.y, topMost.x, topMost.y, points[i].x, points[i].y);
    let A3 = area(rightMost.x, rightMost.y, leftMost.x, leftMost.y, points[i].x, points[i].y);


    if(Math.fround(abs(A -( A1 + A2 + A3) )) <= 1) {
      flag = true;
    }

     A = area(leftMost.x, leftMost.y, bottomMost.x, bottomMost.y, rightMost.x, rightMost.y);
     A1 = area(leftMost.x, leftMost.y, bottomMost.x, bottomMost.y, points[i].x, points[i].y);
     A2 = area(rightMost.x, rightMost.y, bottomMost.x, bottomMost.y, points[i].x, points[i].y);
     A3 = area(rightMost.x, rightMost.y, leftMost.x, leftMost.y, points[i].x, points[i].y);

    if(abs(Math.fround(A -( A1 + A2 + A3) )) <= 1 || flag) {
      
      //remove point from points
      removedPoints.push(points[i]);
      points.splice(i, 1);
    }

    

  }
}
  
}






  let checking = points[index];
  

  const a = p5.Vector.sub(nextVertex, currentVertex);
  const b = p5.Vector.sub(checking, currentVertex);
  const cross = a.cross(b);

  if (cross.z < 0) {
    nextVertex = checking;
    nextIndex = index;
  }

  index = index + 1;
  if (index == points.length) {
    if (nextVertex == leftMost) {
      console.log('done');
      noLoop();
    } else {
      hull.push(nextVertex);
      currentVertex = nextVertex;
      index = 0;
      //points.splice(nextIndex, 1);
      nextVertex = leftMost;
    }
  }

