export type Point = {
  x: number;
  y: number;
};

export const centroid = (pts: Point[]): Point => {
  let sx = 0;
  let sy = 0;
  for (let i = 0; i < pts.length; i++) {
    sx += pts[i].x;
    sy += pts[i].y;
  }
  return { x: sx / pts.length, y: sy / pts.length };
};

export const avgRadius = (pts: Point[], c: Point): number => {
  let sum = 0;
  for (let i = 0; i < pts.length; i++) {
    const dx = pts[i].x - c.x;
    const dy = pts[i].y - c.y;
    sum += Math.hypot(dx, dy);
  }
  return sum / pts.length;
};
