import { useAnimationControls } from 'framer-motion';
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { MarqueeContainer, MarqueeContent } from './Marquee.Style';

const PX_PER_SEC = 90;

const Marquee = ({
  children,
  startDelaySec = 1,
  endDelaySec = 1,
}: {
  children: React.ReactNode;
  startDelaySec?: number;
  endDelaySec?: number;
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const roRef = useRef<ResizeObserver | null>(null);
  const timerRef = useRef<number | null>(null);

  const controls = useAnimationControls();

  const [metrics, setMetrics] = useState({
    overflow: false,
    offsetWidth: 0,
    scrollWidth: 0,
  });

  const travelPx = useMemo(() => {
    return metrics.overflow ? Math.max(0, metrics.scrollWidth - metrics.offsetWidth) : 0;
  }, [metrics]);

  const moveSec = useMemo(() => {
    if (travelPx <= 0) return 0;
    return Math.max(0.5, travelPx / PX_PER_SEC);
  }, [travelPx]);

  const clearTimer = () => {
    if (timerRef.current != null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const sleep = (ms: number) =>
    new Promise<void>((resolve) => {
      clearTimer();
      timerRef.current = window.setTimeout(() => {
        timerRef.current = null;
        resolve();
      }, ms);
    });

  useLayoutEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    const measure = () => {
      const { offsetWidth, scrollWidth } = el;
      setMetrics({
        overflow: scrollWidth > offsetWidth,
        offsetWidth,
        scrollWidth,
      });
    };

    measure();

    roRef.current?.disconnect();
    roRef.current = new ResizeObserver(measure);
    roRef.current.observe(el);

    return () => {
      roRef.current?.disconnect();
      roRef.current = null;
    };
  }, []);

  useLayoutEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const { offsetWidth, scrollWidth } = el;
    setMetrics({
      overflow: scrollWidth > offsetWidth,
      offsetWidth,
      scrollWidth,
    });
  }, [children]);

  useEffect(() => {
    if (travelPx <= 0) {
      clearTimer();
      controls.stop();
      controls.set({ x: 0 });
    }
  }, [controls, travelPx]);

  useEffect(() => {
    if (travelPx <= 0 || moveSec <= 0) return;

    let cancelled = false;

    const run = async () => {
      while (!cancelled) {
        controls.set({ x: 0 });

        if (startDelaySec > 0) {
          await sleep(startDelaySec * 1000);
          if (cancelled) return;
        }

        await controls.start({
          x: -travelPx,
          transition: { duration: moveSec, ease: 'linear' },
        });
        if (cancelled) return;

        if (endDelaySec > 0) {
          await sleep(endDelaySec * 1000);
          if (cancelled) return;
        }

        controls.set({ x: 0 });
      }
    };

    run();

    return () => {
      cancelled = true;
      clearTimer();
      controls.stop();
    };
  }, [controls, travelPx, moveSec, startDelaySec, endDelaySec]);

  return (
    <MarqueeContainer ref={wrapperRef}>
      <div className="hidden">{children}</div>
      <MarqueeContent animate={metrics.overflow ? controls : undefined}>{children}</MarqueeContent>
    </MarqueeContainer>
  );
};

export default Marquee;
