export const DPR = window.devicePixelRatio;

export interface CanvasSize {
  width: number;
  height: number;
}

export function resizeHiDPICanvas(canvas: HTMLCanvasElement, size: CanvasSize): boolean {
  const nextWidth = Math.floor(size.width * window.devicePixelRatio);
  const nextHeight = Math.floor(size.height * window.devicePixelRatio);

  if (canvas.width === nextWidth && canvas.height === nextHeight) {
    return false;
  }

  canvas.width = nextWidth;
  canvas.height = nextHeight;

  return true;
}

export const drawLine = (ctx: any, pathList: any) => {
  ctx.stroke(
    new Path2D(
      pathList.reduce((acc: any, [x, y]: [number, number], i: number) => acc + `${i ? 'L' : 'M'} ${x} ${y} `, ''),
    ),
  );
};

export const drawRect = (ctx: any, x: number, y: number, w: number, h: number) => {
  ctx.fillRect(x * DPR, y * DPR, w * DPR, h * DPR);
  ctx.strokeRect(x * DPR, y * DPR, w * DPR, h * DPR);
};
