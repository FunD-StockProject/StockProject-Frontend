import { useRef, useState } from 'react';
import { StockCountryKey } from '@ts/StockCountry';
import { getItemLocalStorage } from '@utils/LocalStorage';
import useToast from '@hooks/useToast';
import ShortViewNeedLogin from '@components/ShortView/NeedLogin/NeedLogin';
import ShortViewTutorial from '@components/ShortView/Tutorial/Tutorial';
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
import TinderCardItem, { TinderCardProps } from './TinderCard/TinderCard';

export interface StockCard {
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
    stockId: 904,
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
    stockId: 89,
    symbolName: 'NAVER',
    currentPrice: 205000,
    priceChange: -1500,
    score: 51,
    scoreChange: -12,
    country: 'KOREA',
    tags: ['플랫폼', '인터넷'],
  },
  {
    id: '3',
    stockId: 5990,
    symbolName: '인텔',
    currentPrice: 61000,
    priceChange: 500,
    score: 43,
    scoreChange: 5,
    country: 'OVERSEA',
    tags: ['모빌리티', '광고'],
  },
  {
    id: '4',
    stockId: 2716,
    symbolName: '한화',
    currentPrice: 83800,
    priceChange: 200,
    score: 89,
    scoreChange: 11,
    country: 'KOREA',
    tags: ['모빌리티', '광고'],
  },
];

const ShortView = () => {
  const isLogin = !!getItemLocalStorage('access_token');
  const [stocks, setStocks] = useState<StockCard[]>(isLogin ? mockStocks : [mockStocks[0]]);
  const [isFavorite, setIsFavorite] = useState(false);
  const { toast, showToast, hideToast } = useToast();

  const tinderCardComponentRef = useRef<TinderCardProps>(null);

  const neverseenAction = () => {
    console.log('never seen');
    setStocks((prev) => prev.slice(1));
    showToast(
      <>
        <CheckSVG className="check" />
        <p>다시 안보기 설정 완료! 👋</p>
        <p className="cancel" onClick={handleCancelNeverSeen}>
          취소하기
        </p>
      </>,
    );
  };

  const purchaseAction = () => {
    console.log('purchase');
    setStocks((prev) => prev.slice(1));
  };

  const handleClickNeverSeen = () => {
    tinderCardComponentRef.current?.handleClickNeverSeen();
  };

  const handleCancelNeverSeen = () => {
    console.log('cancel never seen');
    hideToast();
  };

  const handleClickFavorite = () => {
    if (!isFavorite) {
      showToast(
        <>
          <HeartSVG className="heart" />
          <p>관심 등록 완료! 민심 급변 시 알림 드릴게요</p>
        </>,
      );
    }
    setIsFavorite((prev) => !prev);
  };

  const handleClickPurchase = () => {
    tinderCardComponentRef.current?.handleClickPurchase();
  };

  return (
    <ShortViewContainer>
      <ShortViewContent>
        {stocks.slice(0, 2).map((e, i) => (
          <TinderCardItem
            ref={i === 0 ? tinderCardComponentRef : null}
            key={`SHORT-VIEW-ITEM-${e.stockId}`}
            stock={e}
            isTop={i === 0}
            neverseenAction={neverseenAction}
            purchaseAction={purchaseAction}
          />
        ))}
      </ShortViewContent>
      <ShortViewButtonContainer>
        <ShortViewButton className="cross" onClick={handleClickNeverSeen}>
          <CrossSVG />
        </ShortViewButton>
        <ShortViewButton className={isFavorite ? 'heart-active' : 'heart'} onClick={handleClickFavorite}>
          <HeartSVG />
        </ShortViewButton>
        <ShortViewButton className="money" onClick={handleClickPurchase}>
          <MoneySVG />
        </ShortViewButton>
        {toast.enabled && <ShortViewToast closing={toast.closing}>{toast.message}</ShortViewToast>}
      </ShortViewButtonContainer>
      {isLogin ? <ShortViewTutorial /> : <ShortViewNeedLogin />}
    </ShortViewContainer>
  );
};

export default ShortView;
