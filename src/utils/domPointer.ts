import type { Point } from './geometry2d';

export const getLocalPos = (e: MouseEvent | TouchList, container: HTMLElement, index = 0): Point => {
  const clientX = 'clientX' in e ? e.clientX : e[index].clientX;
  const clientY = 'clientY' in e ? e.clientY : e[index].clientY;

  const rect = container.getBoundingClientRect();
  return { x: clientX - rect.left, y: clientY - rect.top };
};

export const getTouchPoints = (touches: TouchList, container: HTMLElement): Point[] => {
  const rect = container.getBoundingClientRect();
  const pts: Point[] = [];
  for (let i = 0; i < touches.length; i++) {
    const t = touches[i];
    pts.push({ x: t.clientX - rect.left, y: t.clientY - rect.top });
  }
  return pts;
};
