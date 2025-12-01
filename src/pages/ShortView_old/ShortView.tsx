import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StockCountryKey } from '@ts/StockCountry';
import { getItemLocalStorage } from '@utils/LocalStorage';
import useToast from '@hooks/useToast';
import { webPath } from '@router/index';
import ShortViewNeedLogin from '@components/ShortView/NeedLogin/NeedLogin';
import ShortViewTutorial from '@components/ShortView/Tutorial/Tutorial';
import {
  useAddBookmarkMutation,
  useAddHideMutation,
  useBookmarkListQuery,
  useDeleteBookmarkMutation,
  useRemoveHideMutation,
} from '@controllers/query/favorites';
import { useBuyExperimentMutation } from '@controllers/query/portfolio';
import { useShortViewQuery } from '@controllers/query/shortview';
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

export interface StockCardShortview {
  id: string;
  stockId: number;
  stockName: string;
  price: number;
  priceDiff: number;
  score: number;
  diff: number;
  country: StockCountryKey;
  keywords: string[];
}

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

const mockStocks: StockCardShortview[] = [
  {
    id: '1',
    stockId: 904,
    stockName: '삼성전자',
    price: 71500,
    priceDiff: 1200,
    score: 85,
    diff: 79,
    country: 'KOREA',
    keywords: ['IT', '반도체'],
  },
  {
    id: '2',
    stockId: 89,
    stockName: 'NAVER',
    price: 205000,
    priceDiff: -1500,
    score: 51,
    diff: -12,
    country: 'KOREA',
    keywords: ['플랫폼', '인터넷'],
  },
  {
    id: '3',
    stockId: 5990,
    stockName: '인텔',
    price: 61000,
    priceDiff: 500,
    score: 43,
    diff: 5,
    country: 'OVERSEA',
    keywords: ['모빌리티', '광고'],
  },
  {
    id: '4',
    stockId: 2716,
    stockName: '한화',
    price: 83800,
    priceDiff: 200,
    score: 89,
    diff: 11,
    country: 'KOREA',
    keywords: ['모빌리티', '광고'],
  },
];

const ShortView = () => {
  const navigate = useNavigate();

  const isLogin = !!getItemLocalStorage('access_token');
  const [stocks, setStocks] = useState<StockCardShortview[]>(!isLogin ? [mockStocks[0]] : []);
  const { toast, showToast, hideToast } = useToast();
  const { data: shortviewStock } = useShortViewQuery();
  const currentStock = stocks?.[0];

  const tinderCardComponentRef = useRef<TinderCardProps>(null);

  const { data: bookmarkList } = useBookmarkListQuery();
  const isBookmark = (bookmarkList ?? []).some((e) => e.stockId == currentStock?.stockId);
  const { mutate: addBookMark } = useAddBookmarkMutation();
  const { mutate: deleteBookmark } = useDeleteBookmarkMutation();
  const { mutate: buyExperiment } = useBuyExperimentMutation();
  const { mutate: addHide } = useAddHideMutation();
  const { mutate: removeHide } = useRemoveHideMutation();

  useEffect(() => {
    if (!shortviewStock) return;
    setStocks((prev) => [...prev, ...shortviewStock.filter((e) => !prev.some((b) => b.stockId == e.stockId))]);
  }, [shortviewStock]);

  const lastHideStockIdRef = useRef<number>();

  const neverseenAction = () => {
    if (!currentStock) return;
    console.log('never seen');
    showToast(
      <>
        <CheckSVG className="check" />
        <p>다시 안보기 설정 완료! 👋</p>
        <p className="cancel" onClick={handleCancelNeverSeen}>
          취소하기
        </p>
      </>,
    );
    addHide(currentStock.stockId);
    lastHideStockIdRef.current = currentStock.stockId;
    setStocks((prev) => prev.slice(1));
  };

  const purchaseAction = () => {
    if (!currentStock) return;
    console.log('purchase');
    buyExperiment({ stockId: currentStock.stockId, country: currentStock.country });
    setStocks((prev) => prev.slice(1));
    navigate(webPath.labPurchase(), { state: { step: 4 } });
  };

  const handleClickNeverSeen = () => {
    if (!currentStock) return;
    tinderCardComponentRef.current?.handleClickNeverSeen();
  };

  const handleCancelNeverSeen = () => {
    if (!lastHideStockIdRef.current) return;
    console.log('cancel never seen');
    removeHide(lastHideStockIdRef.current);
    hideToast();
  };

  const handleClickFavorite = () => {
    if (!currentStock) return;
    if (!isBookmark) {
      showToast(
        <>
          <HeartSVG className="heart" />
          <p>관심 등록 완료! 민심 급변 시 알림 드릴게요</p>
        </>,
      );
      addBookMark(currentStock.stockId);
    } else {
      deleteBookmark(currentStock.stockId);
    }
  };

  const handleClickPurchase = () => {
    tinderCardComponentRef.current?.handleClickPurchase();
  };

  return (
    <ShortViewContainer>
      <ShortViewContent
        style={{
          background: 'red',
        }}
      >
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
        <ShortViewButton className={isBookmark ? 'heart-active' : 'heart'} onClick={handleClickFavorite}>
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
