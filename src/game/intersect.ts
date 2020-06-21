export function lineLine(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, x4: number, y4: number): boolean {

  // calculate the distance to intersection point
  const uA = ((x4-x3)*(y1-y3) - (y4-y3)*(x1-x3)) / ((y4-y3)*(x2-x1) - (x4-x3)*(y2-y1));
  const uB = ((x2-x1)*(y1-y3) - (y2-y1)*(x1-x3)) / ((y4-y3)*(x2-x1) - (x4-x3)*(y2-y1));

  // if uA and uB are between 0-1, lines are colliding
  if (uA >= 0 && uA <= 1 && uB >= 0 && uB <= 1) {
    return true;
  }
  return false;
}

export function dist(x1: number, y1: number, x2: number, y2: number): number {
  return Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2));
}

export function linePoint(x1: number, y1: number, x2: number, y2: number, px: number, py: number): boolean {

  // get distance from the point to the two ends of the line
  const d1 = dist(px,py, x1,y1);
  const d2 = dist(px,py, x2,y2);

  // get the length of the line
  const lineLen = dist(x1,y1, x2,y2);

  // since floats are so minutely accurate, add
  // a little buffer zone that will give collision
  const buffer = 0.1;    // higher # = less accurate

  // if the two distances are equal to the line's 
  // length, the point is on the line!
  // note we use the buffer here to give a range, 
  // rather than one #
  if (d1+d2 >= lineLen-buffer && d1+d2 <= lineLen+buffer) {
    return true;
  }
  return false;
}