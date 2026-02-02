import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { detectWebView } from '@utils/Detector';
import useAuthInfo from '@hooks/useAuthInfo';
import useLocalStorageState from '@hooks/useLocalStorageState';
import useToast from '@hooks/useToast';
import Loading from '@components/Loading/Loading';
import useMockPurchase from '@components/Modal/MockPurchase/useMockPurchase';
import NoLoginWrapper from '@components/NoLoginWrapper/NoLoginWrapper';
import ShortViewAppInduce from '@components/Page/ShortView/AppInduce/AppInduce';
import ShortViewEmpty from '@components/Page/ShortView/Empty/Empty';
import ShortViewTutorial from '@components/Page/ShortView/Tutorial/Tutorial';
import { useBuyExperimentMutation } from '@controllers/experiment/query';
import {
  useAddBookmarkMutation,
  useDeleteBookmarkMutation,
  useHideStockMutation,
  useStockPreferenceQuery,
  useUnhideStockMutation,
} from '@controllers/preference/query';
import { ShortViewItem } from '@controllers/shortview/api';
import { useShortViewQuery } from '@controllers/shortview/query';
import BackgroundSVG from '@assets/background.svg?react';
import CheckSVG from '@assets/icons/check.svg?react';
import CrossSVG from '@assets/icons/cross.svg?react';
import HeartSVG from '@assets/icons/heart.svg?react';
import MoneySVG from '@assets/icons/money.svg?react';
import {
  ShortViewButton,
  ShortViewButtonContainer,
  ShortViewContainer,
  ShortViewContent,
  ShortViewToast,
} from './ShortView.Style';
import TinderCard from './TinderCard/TinderCard';

type DragState = {
  active: boolean;
  startX: number;
  startY: number;
  startT: number;

  currX: number;
  currY: number;
  currT: number;

  // 최근 샘플 몇 개 (속도 계산 안정화)
  samples: { x: number; y: number; t: number }[];

  direction?: 'left' | 'right' | 'top' | 'bottom' | 'center';
};

type Size = { width: number; height: number };

const useElementSize = <T extends HTMLElement>() => {
  const ref = useRef<T | null>(null);
  const sizeRef = useRef<Size>({ width: 0, height: 0 });
  const [size, setSize] = useState<Size>({ width: 0, height: 0 });

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const update = () => {
      const next = { width: el.clientWidth, height: el.clientHeight };
      // 값이 같으면 setState 안 해서 불필요 렌더 방지
      if (next.width === sizeRef.current.width && next.height === sizeRef.current.height) return;
      sizeRef.current = next;
      setSize(next);
    };

    update();

    const ro = new ResizeObserver(() => update());
    ro.observe(el);

    return () => ro.disconnect();
  }, []);

  return { ref, size, sizeRef };
};

const ShortView = () => {
  const { isLogin } = useAuthInfo();
  const isWebView = detectWebView();
  const { toast, showToast, hideToast } = useToast();
  const {
    data: shortviewStocks = [],
    isLoading: isLoadingShortview,
    currentIdx,
    currentItem,
    setNextIndex,
    setPrevIndex,
    removeItem: removeShortViewItem,
    appendItem: appendShortViewItem,
    fetchMore,
    isFetchingMore,
    isAtEnd,
  } = useShortViewQuery({ useMock: !isLogin || !isWebView });

  const { mutate: addBookmark } = useAddBookmarkMutation();
  const { mutate: deleteBookmark } = useDeleteBookmarkMutation();
  const { mutate: buyExperiment } = useBuyExperimentMutation();
  const { mutate: hideStock } = useHideStockMutation();
  const { mutate: unhideStock } = useUnhideStockMutation();
  const { data: stockPreference } = useStockPreferenceQuery(currentItem?.stockId);

  const [isTutorialWatched] = useLocalStorageState<boolean>('tutorial_watched_shortview');
  const recentHideStockRef = useRef<ShortViewItem>();
  const { ref: containerRef, size: containerSize, sizeRef: containerSizeRef } = useElementSize<HTMLDivElement>();

  const isBookmark = stockPreference?.isBookmarked ?? false;

  const [mouseDrag, _setMouseDrag] = useState<DragState>({
    active: false,

    startX: 0,
    startY: 0,
    startT: 0,

    currX: 0,
    currY: 0,
    currT: 0,

    samples: [],

    direction: 'center',
  });

  const mouseDragRef = useRef<DragState>(mouseDrag);

  const setMouseDrag = (value: Partial<DragState>, init?: boolean) => {
    const initValue: DragState = {
      active: false,

      startX: 0,
      startY: 0,
      startT: 0,

      currX: 0,
      currY: 0,
      currT: 0,

      samples: [],

      direction: 'center',
    };

    _setMouseDrag((prev) => {
      const mouseDrag = {
        ...(init ? initValue : prev),
        ...value,
      };
      mouseDragRef.current = mouseDrag;
      return mouseDrag;
    });
  };

  const cardTransform = useMemo(() => {
    const { direction, currX, currY, startX, startY, active } = mouseDrag;
    const { width, height } = containerSize;

    const dx = currX - startX;
    const dy = currY - startY;

    const cardX = direction === 'left' ? -width * 3 : direction === 'right' ? width * 3 : dx;
    const cardY = direction === 'top' ? -height * 2 : direction === 'bottom' ? height * 2 : dy;

    const denom = Math.hypot(width, height);
    const ratio = Math.min(Math.hypot(cardX, cardY) / denom, 1);

    const easeBack = !active ? ', left 0.2s ease-in-out, top 0.2s ease-in-out' : '';
    const easeBackWithRotate = !active
      ? ', left 0.2s ease-in-out, top 0.2s ease-in-out, transform 0.2s ease-in-out'
      : '';

    const prevTop = direction === 'bottom' ? 0 : -height + cardY === 0 ? -1000 : -height + cardY;

    const rotateDeg = (cardX / width) * 15;

    const yNorm = cardY / (height / 2);
    const yFactor = 1 - Math.abs(Number.isFinite(yNorm) ? yNorm : 0);
    const shadowAlpha = 0.12 * yFactor;

    const prev = {
      left: '0',
      top: `${prevTop}px`,
      scale: `${1}`,
      opacity: `${1}`,
      transition: `scale 0.1s ease-in-out${easeBack}`,
    };

    const curr = {
      transform: `rotate(${rotateDeg}deg)`,
      left: `${cardX}px`,
      top: `${Math.min(0, cardY)}px`,
      scale: `${active ? 1.05 : 1}`,
      opacity: `${1}`,
      filter: `drop-shadow(0px 4px 50px rgba(255, 255, 255, ${shadowAlpha}))`,
      transition: `filter 0.2s ease-in-out, scale 0.1s ease-in-out${easeBackWithRotate}`,
    };

    const next = {
      left: '0',
      top: '0',
      scale: `${0.75 + ratio * 0.25}`,
      opacity: `${0.25 + ratio * 0.75}`,
      transition: `${!active ? 'scale 0.2s ease-in-out, opacity 0.2s ease-in-out' : ''}`,
    };

    return { prev, curr, next };
  }, [
    mouseDrag.direction,
    mouseDrag.currX,
    mouseDrag.currY,
    mouseDrag.startX,
    mouseDrag.startY,
    mouseDrag.active,
    containerSize.width,
    containerSize.height,
  ]);

  const handlePointerDown = (e: React.PointerEvent) => {
    const t = performance.now();
    setMouseDrag(
      {
        active: true,
        startX: e.clientX,
        startY: e.clientY,
        startT: t,

        currX: e.clientX,
        currY: e.clientY,
        currT: t,

        samples: [{ x: e.clientX, y: e.clientY, t }],
      },
      true,
    );
  };

  const handlePointerMove = (e: MouseEvent | TouchEvent) => {
    if (!mouseDragRef.current.active) return;

    // 모바일 스크롤 방지: 이벤트마다 preventDefault()가 먹히려면
    // 리스너가 passive: false 여야 하고, CSS touch-action 설정도 필요함(아래 참고)
    e.preventDefault();

    const x = 'clientX' in e ? e.clientX : (e as TouchEvent).touches[0].clientX;
    const y = 'clientY' in e ? e.clientY : (e as TouchEvent).touches[0].clientY;
    const t = performance.now();

    const nextSamples = [...mouseDragRef.current.samples, { x, y, t }].slice(-5);
    setMouseDrag({
      currX: x,
      currY: y,
      currT: t,
      samples: nextSamples,
    });
  };

  function calcVelocityFromSamples(samples: { x: number; y: number; t: number }[]) {
    if (samples.length < 2) return { vx: 0, vy: 0 };
    const a = samples[0];
    const b = samples[samples.length - 1];
    const dt = Math.max(1, b.t - a.t);
    return { vx: (b.x - a.x) / dt, vy: (b.y - a.y) / dt };
  }

  const handlePointerUp = () => {
    const s = mouseDragRef.current;
    if (!s.active) return;

    const dx = s.currX - s.startX;
    const dy = s.currY - s.startY;

    const { width, height } = containerSizeRef.current;

    // ✅ 기준값(튜닝 포인트)
    const DIST_X = width * 0.28; // 28%만 넘어도 거리로 성공
    const DIST_Y = height * 0.22;

    const VEL_X = 0.9; // px/ms  (≈ 900px/s)
    const VEL_Y = 0.9;

    // 속도는 마지막 샘플로 보정하면 더 자연스러움
    const v = calcVelocityFromSamples(s.samples); // 아래 함수

    const absDx = Math.abs(dx);
    const absDy = Math.abs(dy);

    // “거리 OR 속도”가 임계치 넘으면 스와이프 인정
    const passX = absDx > DIST_X || Math.abs(v.vx) > VEL_X;
    const passY = absDy > DIST_Y || Math.abs(v.vy) > VEL_Y;

    let direction: DragState['direction'] = 'center';

    if (passX || passY) {
      // 더 우세한 축을 선택 (거리+속도 혼합)
      const scoreX = absDx + Math.abs(v.vx) * 400; // 400은 가중치(튜닝)
      const scoreY = absDy + Math.abs(v.vy) * 400;

      if (scoreX >= scoreY) direction = dx > 0 ? 'right' : 'left';
      else direction = dy > 0 ? 'bottom' : 'top';
    }

    setMouseDrag({ active: false, direction }, true);
  };

  useEffect(() => {
    if (mouseDrag.direction === 'center') return;

    if (mouseDrag.direction === 'top') {
      handleScrollUpStock();
    } else if (mouseDrag.direction === 'bottom') {
      handleScrollDownStock();
    } else if (mouseDrag.direction === 'left') {
      handleHideStock();
    } else if (mouseDrag.direction === 'right') {
      handlePurchaseStock();
    }
  }, [mouseDrag.direction]);

  const handleScrollUpStock = () => {
    setTimeout(() => {
      setNextIndex();

      setMouseDrag({
        direction: 'center',
      });
    }, 200);
  };

  const handleScrollDownStock = () => {
    setTimeout(() => {
      setPrevIndex();

      setMouseDrag({
        direction: 'center',
      });
    }, 200);
  };

  const handlePurchaseStock = () => {
    if (!currentItem) return;
    buyExperiment({ stockId: currentItem.stockId, country: currentItem.country });
    openMockPurchaseModal();

    setTimeout(() => {
      setMouseDrag({
        direction: 'center',
      });

      removeShortViewItem();
    }, 200);
  };

  const handleHideStock = () => {
    setTimeout(() => {
      setMouseDrag({
        direction: 'center',
      });

      if (!currentItem) return;

      recentHideStockRef.current = currentItem;
      hideStock(currentItem.stockId);
      removeShortViewItem();

      showToast(
        <>
          <CheckSVG className="check" />
          <p>다시 안보기 설정 완료! 👋</p>
          <p className="cancel" onClick={handleUnhideStock}>
            취소하기
          </p>
        </>,
      );
    }, 200);
  };

  const handleUnhideStock = () => {
    if (!recentHideStockRef.current) return;

    hideToast();

    unhideStock(recentHideStockRef.current.stockId);
    appendShortViewItem(recentHideStockRef.current);
    recentHideStockRef.current = undefined;

    setMouseDrag(
      {
        currX: -containerSizeRef.current?.width * 2,
        direction: 'center',
      },
      true,
    );

    setTimeout(() => {
      setMouseDrag(
        {
          direction: 'center',
        },
        true,
      );
    }, 0);
  };

  const handleBookmarkStock = () => {
    if (!currentItem) return;
    if (!isBookmark) {
      showToast(
        <>
          <HeartSVG className="heart" />
          <p>관심 등록 완료! 민심 급변 시 알림 드릴게요</p>
        </>,
      );
      addBookmark(currentItem.stockId);
    } else {
      deleteBookmark(currentItem.stockId);
    }
  };

  useEffect(() => {
    window.addEventListener('mouseup', handlePointerUp);
    window.addEventListener('touchend', handlePointerUp);

    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('touchmove', handlePointerMove, { passive: false });

    return () => {
      window.removeEventListener('mouseup', handlePointerUp);
      window.removeEventListener('touchend', handlePointerUp);

      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
    };
  }, []);

  const { Modal: MockPurchaseModal, openModal: openMockPurchaseModal } = useMockPurchase();

  return (
    <ShortViewContainer>
      {MockPurchaseModal}
      <Loading isLoading={isLoadingShortview} title="숏뷰를 불러오고 있어요" desc="잠시만 기다려주세요..." />
      <ShortViewContent ref={containerRef} onPointerDown={handlePointerDown}>
        {shortviewStocks.map(
          (stock, idx) =>
            Math.abs(idx - currentIdx) <= 1 && (
              <TinderCard
                transform={
                  idx == currentIdx
                    ? cardTransform.curr
                    : idx == currentIdx + 1
                      ? cardTransform.next
                      : cardTransform.prev
                }
                zIndex={3 - (idx - currentIdx)}
                key={`SHORT-VIEW-ITEM-${stock.stockId}`}
                stock={stock}
              />
            ),
        )}
        <BackgroundSVG />
        <ShortViewEmpty isShow={!isLoadingShortview && isAtEnd} isLoading={isFetchingMore} fetchMore={fetchMore} />
      </ShortViewContent>
      <ShortViewButtonContainer>
        <ShortViewButton
          className="cross"
          onClick={() => {
            setMouseDrag(
              {
                direction: 'left',
              },
              true,
            );
          }}
        >
          <CrossSVG />
        </ShortViewButton>
        <ShortViewButton className={isBookmark ? 'heart-active' : 'heart'} onClick={handleBookmarkStock}>
          <HeartSVG />
        </ShortViewButton>
        <ShortViewButton
          className="money"
          onClick={() => {
            setMouseDrag(
              {
                direction: 'right',
              },
              true,
            );
          }}
        >
          <MoneySVG />
        </ShortViewButton>
        {toast.enabled && <ShortViewToast closing={toast.closing}>{toast.message}</ShortViewToast>}
      </ShortViewButtonContainer>
      {!isWebView && <ShortViewAppInduce />}
      <NoLoginWrapper
        title={
          <>
            지금 로그인을 하고 <br />
            요즘 괜찮은 종목이 있는지 탐색해보아요
          </>
        }
        description={
          <>
            👋 로그인을 하면 <b>#심리지수</b>와 <b>#종목 키워드</b> <br />
            같은 기능을 사용할 수 있어요
          </>
        }
        buttonText="회원가입/로그인 하기"
        hasNavbar
      />
      {!isTutorialWatched && <ShortViewTutorial />}
    </ShortViewContainer>
  );
};

export default ShortView;
