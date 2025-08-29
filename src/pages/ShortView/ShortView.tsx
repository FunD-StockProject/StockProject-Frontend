import styled from '@emotion/styled';
import { useEffect, useRef, useState } from 'react';
import { StockCountryKey } from '@ts/StockCountry';
import StockChart from '@components/Search/StockChart/StockChart';
import CrossSVG from '@assets/icons/cross.svg?react';
import HeartSVG from '@assets/icons/heart.svg?react';
import MagnifierSVG from '@assets/icons/magnifier.svg?react';
import MoneySVG from '@assets/icons/money.svg?react';
import { ToastStyle } from './ShortView.Style';

interface StockCard {
  id: string;
  stockId: number;
  symbolName: string;
  currentPrice: number;
  priceChange: number;
  score: number;
  scoreChange: number;
  country: StockCountryKey;
  tags: string[];
}

const mockStocks: StockCard[] = [
  {
    id: '1',
    stockId: 0,
    symbolName: '삼성전자',
    currentPrice: 71500,
    priceChange: 1200,
    score: 85,
    scoreChange: 79,
    country: 'KOREA',
    tags: ['IT', '반도체'],
  },
  {
    id: '2',
    stockId: 0,
    symbolName: '네이버',
    currentPrice: 205000,
    priceChange: -1500,
    score: 78,
    scoreChange: -12,
    country: 'KOREA',
    tags: ['플랫폼', '인터넷'],
  },
  {
    id: '3',
    stockId: 0,
    symbolName: '카카오',
    currentPrice: 61000,
    priceChange: 500,
    score: 82,
    scoreChange: 5,
    country: 'KOREA',
    tags: ['모빌리티', '광고'],
  },
];

const ShortView = () => {
  const [favoriteList, setFavoriteList] = useState<string[]>([]);

  const [drag, setDrag] = useState<any>({ x: 0, direction: 'none' });
  const [width, setWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIdx, setCurrentIdx] = useState(2);

  useEffect(() => {
    const w = containerRef.current?.clientWidth;
    setWidth(w ?? 0);
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    setDrag({
      startX: e.clientX,
      x: 0,
      active: true,
      direction: 'none',
    });
  };

  const onPointerMove = (e: React.TouchEvent) => {
    if (!drag.active) return;
    setDrag({
      ...drag,
      x: e.touches[0].clientX - drag.startX,
      active: true,
    });
  };

  const onPointerUp = () => {
    const direction = drag.x > width / 2 ? 'right' : drag.x < -width / 2 ? 'left' : 'none';

    if (direction === 'left') {
      handleClickNeverSeen();
      return;
    } else if (direction === 'right') {
      handleClickPurchase();
      return;
    }

    setDrag({
      startX: 0,
      x: 0,
      active: false,
      direction: direction,
    });
  };

  const [toast, setToast] = useState<{
    content: React.ReactNode;
    display: boolean;
    fadeout: boolean;
  }>({ content: null, display: false, fadeout: false });

  const showToast = (content: React.ReactNode) => {
    setToast({
      content: content,
      display: true,
      fadeout: false,
    });

    setTimeout(() => {
      setToast((prev) => ({ ...prev, fadeout: true }));

      setTimeout(() => {
        setToast((prev) => ({ ...prev, display: false, fadeout: false }));
      }, 500);
    }, 2000);
  };

  const handleClickFavorite = (symbolName: string) => {
    if (favoriteList.findIndex((e) => e === symbolName)) {
      setFavoriteList((prev) => [...prev, symbolName]);
      showToast(
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontSize: '12px',
            fontWeight: '600',
            color: '#F0F0F1',
          }}
        >
          <HeartSVG fill="#EB003B" />
          관심 등록 완료! 민심 급변 시 알림 드릴게요
        </div>,
      );
    } else {
      setFavoriteList((prev) => prev.filter((e) => e !== symbolName));
    }
  };

  const handleClickNeverSeen = () => {
    setDrag({
      startX: 0,
      x: 0,
      active: false,
      direction: 'left',
    });

    setTimeout(() => {
      setCurrentIdx((prev) => prev - 1);
      setDrag({
        startX: 0,
        x: 0,
        active: false,
        direction: 'none',
      });
    }, 250);
  };

  const handleClickPurchase = () => {
    setDrag({
      startX: 0,
      x: 0,
      active: false,
      direction: 'right',
    });

    setTimeout(() => {
      setCurrentIdx((prev) => prev - 1);
      setDrag({
        startX: 0,
        x: 0,
        active: false,
        direction: 'none',
      });
    }, 250);
  };

  console.log(currentIdx);

  console.log(drag);

  const liveTransform = `translate3d(${drag.x}px, 0, 0) rotate(${(drag.x / width) * 30}deg) scale(${drag.active ? 1.05 : 1})`;

  return (
    <ShortViewContainer>
      <ShortViewContent
        ref={containerRef}
        onPointerDown={onPointerDown}
        onTouchMove={onPointerMove}
        onTouchEnd={onPointerUp}
      >
        {mockStocks.map(
          (e, i) =>
            (i == currentIdx || i == currentIdx - 1) && (
              <ShortViewItemCard
                isTop={i == currentIdx}
                active={drag.active}
                style={{
                  transform:
                    i == currentIdx
                      ? drag.direction == 'right'
                        ? `translate3d(${width * 2}px, 0, 0) rotate(${((width * 2) / width) * 30}deg) scale(${drag.active ? 1.05 : 1})`
                        : drag.direction == 'left'
                          ? `translate3d(${-width * 2}px, 0, 0) rotate(${((-width * 2) / width) * 30}deg) scale(${drag.active ? 1.05 : 1})`
                          : liveTransform
                      : '',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    padding: '12px',
                    boxSizing: 'border-box',
                  }}
                >
                  <StockChart stockId={e.stockId} symbolName={e.symbolName} country={e.country} />
                </div>
                <ShortViewItemInfoBox>
                  <ShortViewItemInfoTitle>
                    <img src="https://yt3.googleusercontent.com/Yoj44lPMte0uwM0vzH7uQynVMdpfhU4WxZMyBEC7k6mEYovAKPqW4FCbqLeW8eIhexEx8-c9=s900-c-k-c0x00ffffff-no-rj" />
                    <p>{e.symbolName}</p>
                  </ShortViewItemInfoTitle>
                  <ShortViewItemContents>
                    <ShortViewItemInfoDesc>
                      <ShortViewItemDeltaText delta={1}>
                        ₩ 55,300 <span>+200(0.36%)</span>
                      </ShortViewItemDeltaText>
                      <ShortViewItemDeltaText delta={1}>
                        85점 <span>+79점</span>
                      </ShortViewItemDeltaText>
                    </ShortViewItemInfoDesc>
                    <ShortViewItemOther>
                      <ShortViewItemTagContainer>
                        <p>#관세</p>
                        <p>#민주당</p>
                        <p>#국내주식</p>
                      </ShortViewItemTagContainer>
                      <MagnifierSVG />
                    </ShortViewItemOther>
                  </ShortViewItemContents>
                </ShortViewItemInfoBox>
              </ShortViewItemCard>
            ),
        )}
      </ShortViewContent>
      <ShortViewButtonContainer>
        <ShortViewButton type="stroke" color="light" size="large" onClick={handleClickNeverSeen}>
          <CrossSVG />
        </ShortViewButton>
        <ShortViewButton
          type="fill"
          color="dark"
          size="small"
          onClick={() => handleClickFavorite(mockStocks[currentIdx].symbolName)}
        >
          <HeartSVG
            style={{
              fill: favoriteList.findIndex((e) => e === mockStocks[currentIdx].symbolName) !== -1 ? '#EB003B' : '',
            }}
          />
        </ShortViewButton>
        <ShortViewButton type="fill" color="primary" size="large" onClick={handleClickPurchase}>
          <MoneySVG />
        </ShortViewButton>
      </ShortViewButtonContainer>
      {toast.display && (
        <ToastStyle
          style={{
            opacity: toast.fadeout ? '0' : '1',
            transition: 'opacity .5s ease',
          }}
        >
          {toast.content}
        </ToastStyle>
      )}
    </ShortViewContainer>
  );
};

const ShortViewContainer = styled.div({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  flexGrow: '1',
  alignItems: 'center',
  padding: '20px',
  gap: '24px',
  background: '#101010',
  overflow: 'hidden',
});

const ShortViewContent = styled.div({
  flexGrow: '1',
  width: '100%',
  position: 'relative',
});

const ShortViewItemCard = styled.div(
  ({ isTop, active }: { isTop: boolean; active?: boolean }) => ({
    boxShadow: isTop ? '0px 4px 50px 0px rgba(255, 255, 255, 0.12)' : '',
    transition: isTop && active ? 'box-shadow .25s ease' : 'all .25s ease',
  }),
  {
    borderRadius: '10px',
    position: 'absolute',
    background: '#101010',
    width: '100%',
    height: '100%',
  },
);

const ShortViewItemInfoBox = styled.div({
  width: '100%',
  position: 'absolute',
  bottom: '0',
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  padding: '20px',
  boxSizing: 'border-box',
});

const ShortViewItemInfoTitle = styled.div({
  display: 'flex',
  padding: '4px 6px',
  gap: '10px',

  ['>img']: {
    width: '32px',
    height: 'auto',
    aspectRatio: '1 / 1',
    objectFit: 'cover',
    borderRadius: '999px',
  },

  ['>p']: {
    margin: '0',
    fontSize: '24px',
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

const ShortViewItemContents = styled.div({
  display: 'flex',
  flexDirection: 'column',
});

const ShortViewItemInfoDesc = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  alignItems: 'start',
});

const ShortViewItemDeltaText = styled.p(
  ({ delta }: { delta: number }) => ({
    ['>span']: {
      color: delta > 0 ? '#EB003B' : 'blue',
    },
  }),
  {
    margin: '0',
    fontSize: '14px',
    fontWeight: '500',
    color: '#FFFFFF',
    background: 'rgba(255, 255, 255, 0.1)',
    padding: '4px 10px',
    borderRadius: '999px',
    ['>span']: {},
  },
);

const ShortViewItemOther = styled.div({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',

  ['>svg']: {
    width: '24px',
    height: 'auto',
    aspectRatio: '1 / 1',
    padding: '12px',
    borderRadius: '999px',
    background: '#1D1E1F',
    fill: '#9A9C9E',
    flexShrink: '0',
  },
});

const ShortViewItemTagContainer = styled.div({
  display: 'flex',
  gap: '6px',
  flexGrow: '1',
  overflow: 'hidden',

  ['>p']: {
    margin: '0',
    fontSize: '14px',
    fontWeight: '500',
    color: '#C6C7C8',
    background: 'rgba(255, 255, 255, 0.1)',
    padding: '4px 10px',
    borderRadius: '999px',
    whiteSpace: 'nowrap',
  },
});

const ShortViewButtonContainer = styled.div({
  display: 'flex',
  gap: '20px',
  alignItems: 'center',
});

const ShortViewButton = styled.div(
  ({
    color,
    size,
    type,
  }: {
    color: 'light' | 'dark' | 'primary';
    size: 'small' | 'large';
    type: 'fill' | 'stroke';
  }) => ({
    background: color === 'light' ? '#303033' : color === 'dark' ? '#1D1E1F' : '#3457FD',
    width: size === 'small' ? '52px' : '64px',

    ['>svg']: {
      fill: type !== 'fill' ? 'auto' : color === 'light' ? '#C6C7C8' : color === 'dark' ? '#525658' : '#FFFFFF',
      stroke: type !== 'stroke' ? 'auto' : color === 'light' ? '#C6C7C8' : color === 'dark' ? '#525658' : '#FFFFFF',
    },
  }),
  {
    height: 'auto',
    aspectRatio: '1 / 1',
    borderRadius: '999px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    ['>svg']: {
      width: '28px',
      height: 'auto',
      aspectRatio: '1 / 1',
    },
  },
);

export default ShortView;
