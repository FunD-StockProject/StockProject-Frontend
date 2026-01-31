import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthInfo from '@hooks/useAuthInfo';
import useToast from '@hooks/useToast';
import { webPath } from '@router/index';
import Loading from '@components/Loading/Loading';
import NoLoginWrapper from '@components/NoLoginWrapper/NoLoginWrapper';
import ShortViewTutorial from '@components/ShortView/Tutorial/Tutorial';
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

const ShortView = () => {
  const navigate = useNavigate();

  const { isLogin } = useAuthInfo();
  const { toast, showToast, hideToast } = useToast();
  const {
    data: shortviewStocks = [],
    fetchNextPage: fetchNextShortview,
    isLoading: isLoadingShortview,
    isFetchingNextPage: isFetchingNextShortview,
    removeItem: removeShortviewItem,
    appendItem: appendShortviewItem,
  } = useShortViewQuery({ useMock: !isLogin });
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    if (isFetchingNextShortview) return;
    if (shortviewStocks.length === 0) return;
    if (currentIdx >= shortviewStocks.length - 2) {
      console.log('fetch next');
      fetchNextShortview();
    }
  }, [currentIdx, shortviewStocks, isFetchingNextShortview]);

  const { mutate: addBookmark } = useAddBookmarkMutation();
  const { mutate: deleteBookmark } = useDeleteBookmarkMutation();
  const { mutate: buyExperiment } = useBuyExperimentMutation();
  const { mutate: hideStock } = useHideStockMutation();
  const { mutate: unhideStock } = useUnhideStockMutation();

  const currentStock = shortviewStocks[currentIdx] ?? null;

  const recentHideStockRef = useRef<ShortViewItem>();

  const { data: stockPreference } = useStockPreferenceQuery(currentStock?.stockId);
  const isBookmark = stockPreference?.isBookmarked ?? false;

  const containerRef = useRef<HTMLDivElement>(null);

  const { clientWidth: width, clientHeight: height } = containerRef?.current ?? { clientWidth: 0, clientHeight: 0 };

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

  const cardX =
    mouseDrag.direction === 'left'
      ? -width * 3
      : mouseDrag.direction === 'right'
        ? width * 3
        : mouseDrag.currX - mouseDrag.startX;
  const cardY =
    mouseDrag.direction === 'top'
      ? -height * 2
      : mouseDrag.direction === 'bottom'
        ? height * 2
        : mouseDrag.currY - mouseDrag.startY;

  const ratio = Math.min(Math.sqrt(cardX ** 2 + cardY ** 2) / Math.sqrt(width ** 2 + height ** 2), 1);

  const prevCardTransform = {
    left: '0',
    top: `${mouseDrag.direction === 'bottom' ? 0 : -height + cardY}px`,
    scale: `${1}`,
    opacity: `${1}`,
    transition: `scale 0.1s ease-in-out ${!mouseDrag.active ? ', left 0.2s ease-in-out, top 0.2s ease-in-out' : ''}`,
  };

  const currentCardTransform = {
    transform: `rotate(${(cardX / width) * 15}deg)`,
    left: `${cardX}px`,
    top: `${Math.min(0, cardY)}px`,
    scale: `${mouseDrag.active ? 1.05 : 1}`,
    opacity: `${1}`,
    filter: `drop-shadow(0px 4px 50px rgba(255, 255, 255, ${0.12 * (1 - Math.abs(cardY / (height / 2)))}))`,
    transition: `filter 0.2s ease-in-out, scale 0.1s ease-in-out ${!mouseDrag.active ? ', left 0.2s ease-in-out, top 0.2s ease-in-out, transform 0.2s ease-in-out' : ''}`,
  };

  const nextCardTransform = {
    left: '0',
    top: '0',
    scale: `${0.75 + ratio * 0.25}`,
    opacity: `${0.25 + ratio * 0.75}`,
    transition: `${!mouseDrag.active ? 'scale 0.2s ease-in-out, opacity 0.2s ease-in-out' : ''}`,
  };

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

    const el = containerRef.current;
    const width = el?.clientWidth ?? 0;
    const height = el?.clientHeight ?? 0;

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
      setCurrentIdx((prev) => (prev < shortviewStocks.length - 1 ? prev + 1 : prev));

      setMouseDrag({
        direction: 'center',
      });
    }, 200);
  };

  const handleScrollDownStock = () => {
    setTimeout(() => {
      setCurrentIdx((prev) => (prev > 0 ? prev - 1 : prev));

      setMouseDrag({
        direction: 'center',
      });
    }, 200);
  };

  const handlePurchaseStock = () => {
    setMouseDrag(
      {
        direction: 'right',
      },
      true,
    );

    setTimeout(() => {
      setMouseDrag({
        direction: 'center',
      });

      if (!currentStock) return;

      buyExperiment({ stockId: currentStock.stockId, country: currentStock.country });
      removeShortviewItem(currentIdx);
      navigate(webPath.labStep, { state: { step: 3 } });
    }, 200);
  };

  const handleHideStock = () => {
    setMouseDrag(
      {
        direction: 'left',
      },
      true,
    );

    setTimeout(() => {
      setMouseDrag({
        direction: 'center',
      });

      if (!currentStock) return;

      recentHideStockRef.current = currentStock;
      hideStock(currentStock.stockId);
      removeShortviewItem(currentIdx);

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
    appendShortviewItem(currentIdx, recentHideStockRef.current);
    recentHideStockRef.current = undefined;

    setMouseDrag(
      {
        currX: -width * 2,
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
    if (!currentStock) return;
    if (!isBookmark) {
      showToast(
        <>
          <HeartSVG className="heart" />
          <p>관심 등록 완료! 민심 급변 시 알림 드릴게요</p>
        </>,
      );
      addBookmark(currentStock.stockId);
    } else {
      deleteBookmark(currentStock.stockId);
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

  return (
    <ShortViewContainer>
      <Loading isLoading={isLoadingShortview} title="숏뷰를 불러오고 있어요" desc="잠시만 기다려주세요..." />
      <ShortViewContent ref={containerRef} onPointerDown={handlePointerDown}>
        {shortviewStocks.map(
          (stock, idx) =>
            Math.abs(idx - currentIdx) <= 1 && (
              <TinderCard
                transform={
                  idx == currentIdx
                    ? currentCardTransform
                    : idx == currentIdx + 1
                      ? nextCardTransform
                      : prevCardTransform
                }
                zIndex={3 - (idx - currentIdx)}
                key={`SHORT-VIEW-ITEM-${stock.stockId}`}
                stock={stock}
              />
            ),
        )}
      </ShortViewContent>
      <ShortViewButtonContainer>
        <ShortViewButton className="cross" onClick={handleHideStock}>
          <CrossSVG />
        </ShortViewButton>
        <ShortViewButton className={isBookmark ? 'heart-active' : 'heart'} onClick={handleBookmarkStock}>
          <HeartSVG />
        </ShortViewButton>
        <ShortViewButton className="money" onClick={handlePurchaseStock}>
          <MoneySVG />
        </ShortViewButton>
        {toast.enabled && <ShortViewToast closing={toast.closing}>{toast.message}</ShortViewToast>}
      </ShortViewButtonContainer>

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
      <ShortViewTutorial />
    </ShortViewContainer>
  );
};

export default ShortView;
