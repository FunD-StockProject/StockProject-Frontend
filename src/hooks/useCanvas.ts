import { useEffect, useRef } from 'react';

const useCanvas = (setCanvas: (canvas: HTMLCanvasElement) => void) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) setCanvas(canvas);
  }, [setCanvas]);

  return canvasRef;
};

export default useCanvas;
