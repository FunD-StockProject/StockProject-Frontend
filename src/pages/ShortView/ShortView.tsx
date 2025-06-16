import { useState, useRef, useMemo, createRef } from 'react';
import {
  WrapperStyle,
  CardStyle,
  ToastStyle,
  EndMessageStyle,
  TitleStyle,
  PriceWrapperStyle,
  ImagePlaceholderStyle,
  ScoreStyle,
  CategoryTagListStyle,
  IconButtonGroupStyle,
  CategoryTagItemStyle,
  CardWrapperStyle,
} from './ShortView.Style';
import { useNavigate } from 'react-router-dom';
import { webPath } from '@router/index';
import { STOCK_COUNTRY } from '@ts/Types';
import TinderCard from 'react-tinder-card'

interface StockCard {
  id: string;
  symbolName: string;
  currentPrice: number;
  priceChange: number;
  score: number;
  scoreChange: number;
  country: STOCK_COUNTRY
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

const getCardDynamicStyle = (index: number, currentIndex: number) => ({
  zIndex: index === currentIndex ? 100 : 100 - (currentIndex - index),
  opacity: index <= currentIndex ? 1 : 0,
  pointerEvents: index === currentIndex ? 'auto' : 'none',
  transform: `scale(${1 - (currentIndex - index) * 0.03}) translateY(-${(currentIndex - index) * 10}px)`,
} as const);

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
    []
  );

  const currentStock = mockStocks[currentIndex]; const canGoBack = currentIndex < mockStocks.length - 1;

  const updateIndex = (val: number) => {
    setCurrentIndex(val);
  };

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  const swiped = (direction: string, index: number) => {
    console.log(direction);
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
      childRefs[idx].current?.restoreCard();
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
    <WrapperStyle>
      {mockStocks.length > 0 && currentIndex >= 0 ? (
        <>
          <CardWrapperStyle>
            {mockStocks.map((stock, index) => (
              <TinderCard
                key={stock.id}
                ref={childRefs[index]}
                className="swipe"
                onSwipe={(dir) => swiped(dir, index)}
                preventSwipe={canGoBack ? [] : ['down']}
                onCardLeftScreen={() => outOfFrame(currentIndex)}
              >
                <CardStyle
                  style={getCardDynamicStyle(index, currentIndex)}
                >
                  <TitleStyle>{stock.symbolName}</TitleStyle>
                  <PriceWrapperStyle>
                    <span style={{ fontSize: '16px' }}>₩{stock.currentPrice.toLocaleString()}</span>&nbsp;
                    <span style={{ color: stock.priceChange >= 0 ? 'red' : 'blue', fontSize: '12px' }}>
                      <span style={{ marginRight: '4px' }}>{stock.priceChange >= 0 ? '+' : ''}{stock.priceChange.toLocaleString()}</span>
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
          </CardWrapperStyle>
        </>
      ) : (
        <EndMessageStyle>모든 종목을 확인했어요!</EndMessageStyle>
      )
      }
      {toast && <ToastStyle key={toast}>{toast}</ToastStyle>}
    </WrapperStyle >
  );
};

export default ShortView;
