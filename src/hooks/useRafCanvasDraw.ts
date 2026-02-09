import { useCallback, useLayoutEffect, useRef } from 'react';

interface UseRafCanvasDrawOptions {
  dpr?: number;
  lineCap?: CanvasLineCap;
  lineJoin?: CanvasLineJoin;
  lineDash?: number[];
}

const useRafCanvasDraw = (
  canvasRef: React.RefObject<HTMLCanvasElement>,
  draw: (ctx: CanvasRenderingContext2D) => void,
  deps: React.DependencyList,
  options: UseRafCanvasDrawOptions = {},
): (() => void) => {
  const { dpr = window.devicePixelRatio || 1, lineCap = 'round', lineJoin = 'round', lineDash = [] } = options;

  const rafIdRef = useRef<number | null>(null);
  const needsDrawRef = useRef(false);

  const doDraw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    ctx.lineCap = lineCap;
    ctx.lineJoin = lineJoin;
    ctx.setLineDash(lineDash);

    draw(ctx);
  }, [canvasRef, draw, dpr, lineCap, lineJoin, lineDash]);

  const scheduleDraw = useCallback(() => {
    needsDrawRef.current = true;

    if (rafIdRef.current != null) return;

    rafIdRef.current = requestAnimationFrame(() => {
      rafIdRef.current = null;

      if (!needsDrawRef.current) return;
      needsDrawRef.current = false;

      doDraw();
    });
  }, [doDraw]);

  useLayoutEffect(() => {
    scheduleDraw();

    return () => {
      if (rafIdRef.current != null) {
        cancelAnimationFrame(rafIdRef.current);
      }
      rafIdRef.current = null;
      needsDrawRef.current = false;
    };
  }, [scheduleDraw, ...deps]);

  return scheduleDraw;
};

export default useRafCanvasDraw;
