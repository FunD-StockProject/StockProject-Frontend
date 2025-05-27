import { useState, useRef, useEffect } from 'react';
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
} from './ShortView.Style';
import { HeaderLogo } from '@layout/Header/Header.Style';
import LogoSVG from '@assets/logo_white.svg?react';
import { useNavigate } from 'react-router-dom';
import BottomNavigation from '@layout/BottomNavigation/BottomNavigation';
interface StockCard {
  id: string;
  name: string;
  currentPrice: number;
  priceChange: number;
  tags: string[];
}

const mockStocks: StockCard[] = [
  { id: '1', name: '삼성전자', currentPrice: 71500, priceChange: 1200, tags: ['IT', '반도체'] },
  { id: '2', name: '네이버', currentPrice: 205000, priceChange: -1500, tags: ['플랫폼', '인터넷'] },
  { id: '3', name: '카카오', currentPrice: 61000, priceChange: 500, tags: ['모빌리티', '광고'] },
];

const ShortView = () => {
  const [index, setIndex] = useState(0);
  const [toast, setToast] = useState<string | null>(null);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);
  const navigate = useNavigate();
  const currentStock = mockStocks[index];

  const handleSwipe = (direction: 'left' | 'right') => {
    setSwipeDirection(direction);
    setTimeout(() => {
      setSwipeDirection(null);
      setIndex((prev) => prev + 1);
      if (direction === 'right') {
        setToast(`${currentStock.name} 모의 매수 등록했어요!`);
        setTimeout(() => setToast(null), 3000);
      } else {
        setToast(`${currentStock.name}은(는) 다시 안볼게요 👋`);
        setTimeout(() => setToast(null), 3000);
      }
    }, 400); // match transition duration
  };

  const handleAddToFavorites = () => {
    setToast(`${currentStock.name}을(를) 관심 종목에 추가했어요!`);
    setTimeout(() => setToast(null), 3000);
  };

  const handleNeverShowAgain = () => {
    setToast(`${currentStock.name}은(는) 다시 안볼게요 👋`);
    setTimeout(() => setToast(null), 3000);
    setIndex((prev) => prev + 1);
  };

  const handleMockPurchase = () => {
    setToast(`${currentStock.name} 모의 매수 등록했어요!`);
    setTimeout(() => setToast(null), 3000);
  };

  const handleSearchStock = () => {
    window.open(`https://search.naver.com/search.naver?query=${currentStock.name}`, '_blank');
  };

  const cardRef = useRef<HTMLDivElement | null>(null);
  const dragStartX = useRef<number | null>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleTouchStart = (e: TouchEvent) => {
      dragStartX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (dragStartX.current === null) return;
      const endX = e.changedTouches[0].clientX;
      const deltaX = endX - dragStartX.current;

      if (Math.abs(deltaX) > 50) {
        handleSwipe(deltaX > 0 ? 'right' : 'left');
      }

      dragStartX.current = null;
    };

    card.addEventListener('touchstart', handleTouchStart);
    card.addEventListener('touchend', handleTouchEnd);

    return () => {
      card.removeEventListener('touchstart', handleTouchStart);
      card.removeEventListener('touchend', handleTouchEnd);
    };
  }, [currentStock]);

  useEffect(() => {
    if (!swipeDirection && cardRef.current) {
      cardRef.current.style.opacity = '0';
      requestAnimationFrame(() => {
        if (cardRef.current) {
          cardRef.current.style.transition = 'opacity 0.4s ease-in-out';
          cardRef.current.style.opacity = '1';
        }
      });
    }
  }, [index]);

  return (
    <>
      <HeaderLogo onClick={() => navigate('/')}>
        <LogoSVG />
      </HeaderLogo>
      <WrapperStyle>
        {currentStock ? (
          <div ref={cardRef} style={{ position: 'relative' }}>
            <CardStyle
              key={currentStock.id}
              style={{
                transform: swipeDirection
                  ? `translateX(${swipeDirection === 'right' ? '150%' : '-150%'}) rotate(${swipeDirection === 'right' ? '12deg' : '-12deg'})`
                  : 'translateX(0) rotate(0)',
                opacity: swipeDirection ? 0 : 1,
                transition: 'transform 0.4s ease-in-out, opacity 0.4s ease-in-out',
              }}
            >
              <TitleStyle>{currentStock.name}</TitleStyle>
              <PriceWrapperStyle>
                <span style={{ fontSize: '16px' }}>₩{currentStock.currentPrice.toLocaleString()}</span>&nbsp;
                <span style={{ color: currentStock.priceChange >= 0 ? 'red' : 'blue', fontSize: '12px' }}>
                  <span style={{ marginRight: '4px' }}>{currentStock.priceChange >= 0 ? '+' : ''}{currentStock.priceChange.toLocaleString()}</span>
                  <span>({((currentStock.priceChange / (currentStock.currentPrice - currentStock.priceChange)) * 100).toFixed(2)}%)</span>
                </span>
              </PriceWrapperStyle>
              <ImagePlaceholderStyle>img</ImagePlaceholderStyle>
              <ScoreStyle>
                <span>85점</span>
                <span style={{ color: 'red' }}>+79점 ▲</span>
              </ScoreStyle>
              <CategoryTagListStyle>
                {currentStock.tags.map((tag) => (
                  <div key={tag}>{tag}</div>
                ))}
              </CategoryTagListStyle>
              <IconButtonGroupStyle>
                <button type="button" onClick={handleAddToFavorites}>🤍</button>
                <button type="button" onClick={handleNeverShowAgain}>다신 안보기</button>
                <button type="button" onClick={handleMockPurchase}>모의 매수</button>
                <button type="button" onClick={handleSearchStock}>🔍</button>
              </IconButtonGroupStyle>
            </CardStyle>
          </div>
        ) : (
          <EndMessageStyle>모든 종목을 확인했어요!</EndMessageStyle>
        )}
        {toast && <ToastStyle key={toast}>{toast}</ToastStyle>}
      </WrapperStyle>

      <BottomNavigation />
    </>
  );
};

export default ShortView;
