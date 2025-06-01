import { useState } from 'react';
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
import { webPath } from '@router/index';
import { STOCK_COUNTRY } from '@ts/Types';
import TinderCard from 'react-tinder-card'

interface StockCard {
  id: string;
  symbolName: string;
  currentPrice: number;
  priceChange: number;
  country: STOCK_COUNTRY
  tags: string[];
}

const mockStocks: StockCard[] = [
  { id: '1', symbolName: '삼성전자', currentPrice: 71500, priceChange: 1200, country: 'KOREA', tags: ['IT', '반도체'] },
  { id: '2', symbolName: '네이버', currentPrice: 205000, priceChange: -1500, country: 'KOREA', tags: ['플랫폼', '인터넷'] },
  { id: '3', symbolName: '카카오', currentPrice: 61000, priceChange: 500, country: 'KOREA', tags: ['모빌리티', '광고'] },
];

const ShortView = () => {
  const [index, setIndex] = useState(0);
  const [toast, setToast] = useState<string | null>(null);
  const [history, setHistory] = useState<StockCard[]>([]);
  const navigate = useNavigate();
  const currentStock = mockStocks[index];

  const handleSwipe = (direction: string) => {
    console.log(direction);
    setTimeout(() => {
      if (direction === 'down') {
        if (history.length === 0) return; // do nothing if no history
        const last = history[0];
        const lastIndex = mockStocks.findIndex(stock => stock.id === last.id);
        setIndex(lastIndex);
        setHistory((prev) => prev.slice(1));
        return;
      }

      setIndex((prev) => prev + 1);

      if (direction === 'right') {
        setHistory((prev) => [mockStocks[index], ...prev]);
        setToast(`${currentStock.symbolName} 모의 매수 등록했어요!`);
        setTimeout(() => setToast(null), 3000);
      } else if (direction === 'left') {
        setHistory((prev) => [mockStocks[index], ...prev]);
        setToast(`${currentStock.symbolName}은(는) 다시 안볼게요 👋`);
        setTimeout(() => setToast(null), 3000);
      }
    }, 400); // match transition duration
  };

  const handleAddToFavorites = () => {
    setToast(`${currentStock.symbolName}을(를) 관심 종목에 추가했어요!`);
    setTimeout(() => setToast(null), 3000);
  };

  const handleNeverShowAgain = () => {
    setToast(`${currentStock.symbolName}은(는) 다시 안볼게요 👋`);
    setTimeout(() => setToast(null), 3000);
    setIndex((prev) => prev + 1);
  };

  const handleMockPurchase = () => {
    setToast(`${currentStock.symbolName} 모의 매수 등록했어요!`);
    setTimeout(() => setToast(null), 3000);
  };

  const handleSearchStock = () => {
    const symbolName = currentStock.symbolName;
    const country = currentStock.country;
    navigate(webPath.search(), { state: { symbolName, country } });
  };

  const onSwipe = (direction: any) => {
    handleSwipe(direction);
  }

  return (
    <>
      <HeaderLogo onClick={() => navigate('/')}>
        <LogoSVG />
      </HeaderLogo>
      <WrapperStyle>
        {currentStock ? (
          <TinderCard
            key={currentStock.id}
            onSwipe={onSwipe}
            preventSwipe={history.length === 0 ? ['up', 'down'] : ['up']}
          >
            <CardStyle>
              <TitleStyle>{currentStock.symbolName}</TitleStyle>
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

          </TinderCard>
        ) : (
          <EndMessageStyle>모든 종목을 확인했어요!</EndMessageStyle>
        )}
        {toast && <ToastStyle key={toast}>{toast}</ToastStyle>}
      </WrapperStyle >

      <BottomNavigation />
    </>
  );
};

export default ShortView;
