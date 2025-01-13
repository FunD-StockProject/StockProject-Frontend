const DPR = window.devicePixelRatio;

export const setLineWidth = (ctx: any, width: number) => (ctx.lineWidth = width * DPR);

export const drawLine = (ctx: any, pathList: any) => {
  ctx.stroke(
    new Path2D(
      pathList.reduce(
        (acc: any, [x, y]: [number, number], i: number) =>
          acc + `${i ? 'L' : 'M'} ${DPR * x} ${DPR * y} `,
        '',
      ),
    ),
  );
};

export const drawRect = (ctx: any, x: number, y: number, w: number, h: number) => {
  ctx.fillRect(x * DPR, y * DPR, w * DPR, h * DPR);
  ctx.strokeRect(x * DPR, y * DPR, w * DPR, h * DPR);
};
