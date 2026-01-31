import { useLayoutEffect, useReducer, useRef, useState } from 'react';
import { CanvasSize, resizeHiDPICanvas } from '@utils/Canvas';

const useHiDPICanvas = (opts?: {
  canvasRef?: React.RefObject<HTMLCanvasElement>;
  onResize?: (size: CanvasSize) => void;
}): {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  canvasSize: CanvasSize; // CSS px
  redrawTick: number; // backing store 리사이즈 발생 시 증가
} => {
  const innerRef = useRef<HTMLCanvasElement>(null);
  const canvasRef = opts?.canvasRef ?? innerRef;
  const [canvasSize, setCanvasSize] = useState<CanvasSize>({ width: 0, height: 0 });
  const [redrawTick, bumpRedrawTick] = useReducer((x) => x + 1, 0);

  const onResizeRef = useRef(opts?.onResize);
  onResizeRef.current = opts?.onResize;

  // 1) CSS 크기 추적
  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const width = entry.contentRect.width;
        const height = entry.contentRect.height;

        setCanvasSize((prev) => (prev.width === width && prev.height === height ? prev : { width, height }));
      }
    });

    ro.observe(canvas);
    return () => ro.disconnect();
  }, []);

  // 2) backing store 리사이즈 + redrawTick
  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (!canvasSize.width || !canvasSize.height) return;

    const resized = resizeHiDPICanvas(canvas, canvasSize);
    if (!resized) return;

    bumpRedrawTick();
    onResizeRef.current?.(canvasSize);
  }, [canvasSize.width, canvasSize.height]);

  return { canvasRef, canvasSize, redrawTick };
};

export default useHiDPICanvas;
