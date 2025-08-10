import styled from '@emotion/styled';
import { createRef, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TinderCard from 'react-tinder-card';
import { STOCK_COUNTRY } from '@ts/Types';
import { webPath } from '@router/index';
import CrossSVG from '@assets/icons/cross.svg?react';
import HeartSVG from '@assets/icons/heart.svg?react';
import MagnifierSVG from '@assets/icons/magnifier.svg?react';
import MoneySVG from '@assets/icons/money.svg?react';
import {
  CardStyle,
  CategoryTagItemStyle,
  CategoryTagListStyle,
  EndMessageStyle,
  IconButtonGroupStyle,
  ImagePlaceholderStyle,
  PriceWrapperStyle,
  ScoreStyle,
  TitleStyle,
  ToastStyle,
  WrapperStyle,
} from './ShortView.Style';

interface StockCard {
  id: string;
  symbolName: string;
  currentPrice: number;
  priceChange: number;
  score: number;
  scoreChange: number;
  country: STOCK_COUNTRY;
  tags: string[];
}

const mockStocks: StockCard[] = [
  {
    id: '1',
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
    symbolName: '카카오',
    currentPrice: 61000,
    priceChange: 500,
    score: 82,
    scoreChange: 5,
    country: 'KOREA',
    tags: ['모빌리티', '광고'],
  },
];

const stopAndCall = (fn: () => void) => (e: React.SyntheticEvent) => {
  e.stopPropagation();
  fn();
};

const ShortView = () => {
  const [currentIndex, setCurrentIndex] = useState(mockStocks.length - 1);
  const [toast, setToast] = useState<string | null>(null);
  const currentIndexRef = useRef<number>(currentIndex);
  const navigate = useNavigate();

  // refs for each card
  const childRefs = useMemo(
    () =>
      Array(mockStocks.length)
        .fill(0)
        .map(() => createRef<any>()),
    [],
  );

  const currentStock = mockStocks[currentIndex];
  const canGoBack = currentIndex < mockStocks.length - 1;

  const updateIndex = (val: number) => {
    setCurrentIndex(val);
  };

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  const swiped = (direction: string, index: number) => {
    if (direction === 'down') {
      goBack();
      return;
    }

    if (direction === 'right') {
      showToast(`${mockStocks[index].symbolName} 모의 매수 등록했어요!`);
    } else if (direction === 'left') {
      showToast(`${mockStocks[index].symbolName}은(는) 다시 안볼게요 👋`);
    }

    updateIndex(index - 1);
  };
  const outOfFrame = (idx: number) => {
    if (currentIndexRef.current >= idx) {
      requestAnimationFrame(() => childRefs[idx].current?.restoreCard());
    }
  };

  const swipe = async (dir: string) => {
    if (currentIndex < 0) return;
    await childRefs[currentIndex].current.swipe(dir);
  };

  const goBack = async () => {
    if (!canGoBack) return;
    const newIndex = currentIndex + 1;
    updateIndex(newIndex);
    await childRefs[newIndex].current?.restoreCard();
  };

  const handleAddToFavorites = () => {
    if (!currentStock) return;
    showToast(`${currentStock.symbolName}을(를) 관심 종목에 추가했어요!`);
  };

  const handleSearchStock = () => {
    if (!currentStock) return;
    const symbolName = currentStock.symbolName;
    const country = currentStock.country;
    navigate(webPath.search(), { state: { symbolName, country } });
  };

  return (
    <ShortViewContainer>
      <ShortViewContent>
        {mockStocks.map((e) => (
          <ShortViewItemCard>
            <ShortViewItemInfoBox>
              <ShortViewItemInfoTitle>
                <img src="https://yt3.googleusercontent.com/Yoj44lPMte0uwM0vzH7uQynVMdpfhU4WxZMyBEC7k6mEYovAKPqW4FCbqLeW8eIhexEx8-c9=s900-c-k-c0x00ffffff-no-rj" />
                <p>삼성전자</p>
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
        ))}
      </ShortViewContent>
      <ShortViewButtonContainer>
        <ShortViewButton type="stroke" color="light" size="large">
          <CrossSVG />
        </ShortViewButton>
        <ShortViewButton type="fill" color="dark" size="small">
          <HeartSVG />
        </ShortViewButton>
        <ShortViewButton type="fill" color="primary" size="large">
          <MoneySVG />
        </ShortViewButton>
      </ShortViewButtonContainer>
    </ShortViewContainer>
  );

  return (
    <WrapperStyle>
      {mockStocks.length > 0 && currentIndex >= 0 ? (
        <>
          {mockStocks.map((stock, index) => (
            <TinderCard
              key={stock.id}
              ref={childRefs[index]}
              className="swipe"
              onSwipe={(dir) => swiped(dir, index)}
              preventSwipe={canGoBack ? [] : ['down']}
              onCardLeftScreen={() => outOfFrame(currentIndex)}
            >
              <CardStyle isVisible={index <= currentIndex} isCurrent={index === currentIndex}>
                <TitleStyle>{stock.symbolName}</TitleStyle>
                <PriceWrapperStyle>
                  <span style={{ fontSize: '16px' }}>₩{stock.currentPrice.toLocaleString()}</span>&nbsp;
                  <span style={{ color: stock.priceChange >= 0 ? 'red' : 'blue', fontSize: '12px' }}>
                    <span style={{ marginRight: '4px' }}>
                      {stock.priceChange >= 0 ? '+' : ''}
                      {stock.priceChange.toLocaleString()}
                    </span>
                    <span>({((stock.priceChange / (stock.currentPrice - stock.priceChange)) * 100).toFixed(2)}%)</span>
                  </span>
                </PriceWrapperStyle>
                <ImagePlaceholderStyle>img</ImagePlaceholderStyle>
                <ScoreStyle>
                  <span>{stock.score}</span>
                  <span style={{ color: stock.scoreChange > 0 ? 'red' : 'blue' }}>
                    {`${stock.scoreChange > 0 ? '+' : ''}${stock.scoreChange}점 ${stock.scoreChange > 0 ? '▲' : '▼'}`}
                  </span>
                </ScoreStyle>
                <CategoryTagListStyle>
                  {stock.tags.map((tag) => (
                    <CategoryTagItemStyle key={tag}>{tag}</CategoryTagItemStyle>
                  ))}
                </CategoryTagListStyle>
                <IconButtonGroupStyle>
                  <button
                    type="button"
                    onClick={stopAndCall(handleAddToFavorites)}
                    onTouchStart={stopAndCall(handleAddToFavorites)}
                    disabled={!currentStock}
                  >
                    🤍
                  </button>
                  <button
                    type="button"
                    onClick={stopAndCall(() => swipe('left'))}
                    onTouchStart={stopAndCall(() => swipe('left'))}
                    disabled={!currentStock}
                  >
                    다신 안보기
                  </button>
                  <button
                    type="button"
                    onClick={stopAndCall(() => swipe('right'))}
                    onTouchStart={stopAndCall(() => swipe('right'))}
                    disabled={!currentStock}
                  >
                    모의 매수
                  </button>
                  <button
                    type="button"
                    onClick={stopAndCall(handleSearchStock)}
                    onTouchStart={stopAndCall(handleSearchStock)}
                    disabled={!currentStock}
                  >
                    🔍
                  </button>
                </IconButtonGroupStyle>
              </CardStyle>
            </TinderCard>
          ))}
        </>
      ) : (
        <EndMessageStyle>모든 종목을 확인했어요!</EndMessageStyle>
      )}
      {toast && <ToastStyle key={toast}>{toast}</ToastStyle>}
    </WrapperStyle>
  );
};

const ShortViewContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  flexGrow: '1',
  alignItems: 'center',
  padding: '20px',
  gap: '24px',
  background: '#101010',
});

const ShortViewContent = styled.div({
  flexGrow: '1',
  width: '100%',
  position: 'relative',
});

const ShortViewItemCard = styled(TinderCard)({
  boxShadow: '0px 4px 50px 0px rgba(255, 255, 255, 0.12)',
  borderRadius: '10px',
  position: 'absolute',
  background: '#101010',
  width: '100%',
  height: '100%',
});

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
