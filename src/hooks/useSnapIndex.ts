import { useEffect, useState } from 'react';

export const useSnapIndex = (
  rootRef: React.RefObject<HTMLElement>,
  opts?: { horizontal?: boolean; threshold?: number },
) => {
  const [index, setIndex] = useState(0);
  const horizontal = opts?.horizontal ?? true;
  const threshold = opts?.threshold ?? 0.7;

  useEffect(() => {
    const rootEl = rootRef.current;
    if (!rootEl) return;

    // 컨테이너 내부의 스냅 대상들
    const items = Array.from(rootEl.children);
    if (items.length === 0) return;

    // threshold를 단일값로 쓰면 간혹 튀므로, 구간을 조금 나눠 안정화
    const thresholds = Array.from({ length: 6 }, (_, i) => i / 5); // [0, .2, .4, .6, .8, 1]

    // rootMargin으로 중앙 근처에 가중치를 주고 싶다면 아래 값 미세조정
    // (가로 스냅 기준: 좌우 마진을 조금 깎아서 중앙 근처일 때만 intersecting되게)
    const margin = horizontal ? '0px -20% 0px -20%' : '-20% 0px -20% 0px';

    const io = new IntersectionObserver(
      (entries) => {
        // 현재 보이는(=isIntersecting) 아이템들 중 "가장 많이 보이는" 것을 고름
        let bestIdx = index;
        let bestRatio = -1;

        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const ratio = entry.intersectionRatio;
          const i = items.indexOf(entry.target as HTMLDivElement);
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestIdx = i;
          }
        });

        if (bestRatio >= threshold && bestIdx !== index) {
          setIndex(bestIdx);
        }
      },
      {
        root: rootEl,
        // 중앙 가중치가 필요 없으면 rootMargin: "0px" 로 두세요
        rootMargin: margin,
        threshold: thresholds,
      },
    );

    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [rootRef, horizontal, threshold]);

  // 스크롤이 딱 멈춘 시점에 마지막으로 한 번 더 정밀 계산하고 싶다면 아래 보정 추가
  useEffect(() => {
    const rootEl = rootRef.current;
    if (!rootEl) return;

    let t: number | null = null;
    const onScroll = () => {
      if (t) window.clearTimeout(t);
      t = window.setTimeout(() => {
        // 중앙과 가장 가까운 아이템으로 보정
        const items = Array.from(rootEl.children);
        if (items.length === 0) return;

        const rootRect = rootEl.getBoundingClientRect();
        const center = horizontal ? rootRect.left + rootRect.width / 2 : rootRect.top + rootRect.height / 2;

        let closest = 0;
        let minDist = Infinity;

        items.forEach((el, i) => {
          const r = el.getBoundingClientRect();
          const p = horizontal ? r.left + r.width / 2 : r.top + r.height / 2;
          const dist = Math.abs(p - center);
          if (dist < minDist) {
            minDist = dist;
            closest = i;
          }
        });

        setIndex(closest);
      }, 80); // scrollend 근사
    };

    rootEl.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      rootEl.removeEventListener('scroll', onScroll);
      if (t) window.clearTimeout(t);
    };
  }, [rootRef, horizontal]);

  return { index };
};
