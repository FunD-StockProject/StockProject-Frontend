import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getItemLocalStorage } from '@utils/LocalStorage';
import useToast from '@hooks/useToast';
import { webPath } from '@router/index';
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

interface MouseDrag {
  currX: number;
  currY: number;
  prevX: number;
  prevY: number;
  direction: 'center' | 'left' | 'right' | 'top' | 'bottom';
  active: boolean;
}

const ShortView = () => {
  const navigate = useNavigate();

  const isLogin = !!getItemLocalStorage('access_token');
  const { toast, showToast, hideToast } = useToast();
  const {
    data: shortviewStocks = [],
    fetchNextPage: fetchNextShortview,
    isLoading: isLoadingShortview,
    isFetchingNextPage: isFetchingNextShortview,
    removeItem: removeShortviewItem,
    appendItem: appendShortviewItem,
  } = useShortViewQuery({ useMock: isLogin });
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    if (isFetchingNextShortview) return;
    if (shortviewStocks.length === 0) return;
    if (currentIdx >= shortviewStocks.length - 2) {
      console.log('fetch next');
      fetchNextShortview();
    }
  }, [currentIdx, shortviewStocks, isFetchingNextShortview]);

  if (isLoadingShortview) {
    console.log('loading Shortview Page');
    // return <div>Loading...</div>;
  }

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

  const [mouseDrag, _setMouseDrag] = useState<MouseDrag>({
    currX: 0,
    currY: 0,
    prevX: 0,
    prevY: 0,
    direction: 'center',
    active: false,
  });

  const mouseDragRef = useRef<MouseDrag>(mouseDrag);

  const setMouseDrag = (value: Partial<MouseDrag>, init?: boolean) => {
    const initValue: MouseDrag = {
      currX: 0,
      currY: 0,
      prevX: 0,
      prevY: 0,
      direction: 'center',
      active: false,
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
        : mouseDrag.currX - mouseDrag.prevX;
  const cardY =
    mouseDrag.direction === 'top'
      ? -height * 2
      : mouseDrag.direction === 'bottom'
        ? height * 2
        : mouseDrag.currY - mouseDrag.prevY;

  const ratio = Math.min(Math.sqrt(cardX ** 2 + cardY ** 2) / Math.sqrt(width ** 2 + height ** 2), 1);

  const prevCardTransform = {
    transform: `translate3d(0px, ${mouseDrag.direction === 'bottom' ? 0 : -height + cardY}px, 0)`,
    scale: `${1}`,
    opacity: `${1}`,
    transition: `scale 0.1s ease-in-out ${!mouseDrag.active ? ', transform 0.2s ease-in-out' : ''}`,
  };

  const currentCardTransform = {
    transform: `translate3d(${cardX}px, ${Math.min(0, cardY)}px, 0) rotate(${(cardX / width) * 15}deg)`,
    scale: `${mouseDrag.active ? 1.05 : 1}`,
    opacity: `${1}`,
    filter: `drop-shadow(0px 4px 50px rgba(255, 255, 255, ${0.12 * (1 - Math.abs(cardY / (height / 2)))}))`,
    transition: `filter 0.2s ease-in-out, scale 0.1s ease-in-out ${!mouseDrag.active ? ', transform 0.2s ease-in-out' : ''}`,
  };

  const nextCardTransform = {
    transform: `translate3d(0px, 0px, 0)`,
    scale: `${0.75 + ratio * 0.25}`,
    opacity: `${0.25 + ratio * 0.75}`,
    transition: `${!mouseDrag.active ? 'scale 0.2s ease-in-out, opacity 0.2s ease-in-out' : ''}`,
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    setMouseDrag(
      {
        currX: e.clientX,
        currY: e.clientY,
        prevX: e.clientX,
        prevY: e.clientY,
        active: true,
      },
      true,
    );
  };

  const handlePointerMove = (e: MouseEvent | TouchEvent) => {
    if (!mouseDragRef.current.active) return;
    setMouseDrag({
      currX: 'clientX' in e ? e.clientX : (e as TouchEvent).touches[0].clientX,
      currY: 'clientY' in e ? e.clientY : (e as TouchEvent).touches[0].clientY,
    });
  };

  const handlePointerUp = () => {
    const cardX = mouseDragRef.current.currX - mouseDragRef.current.prevX;
    const cardY = mouseDragRef.current.currY - mouseDragRef.current.prevY;
    const { clientWidth: width, clientHeight: height } = containerRef?.current ?? { clientWidth: 0, clientHeight: 0 };

    const direction =
      cardX > width / 2
        ? 'right'
        : cardX < -width / 2
          ? 'left'
          : cardY > height / 2
            ? 'bottom'
            : cardY < -height / 2
              ? 'top'
              : 'center';

    setMouseDrag(
      {
        direction,
      },
      true,
    );
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
      navigate(webPath.labPurchase(), { state: { step: 4 } });
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
    window.addEventListener('touchmove', handlePointerMove);

    return () => {
      window.removeEventListener('mouseup', handlePointerUp);
      window.removeEventListener('touchend', handlePointerUp);

      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
    };
  }, []);

  return (
    <ShortViewContainer>
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
