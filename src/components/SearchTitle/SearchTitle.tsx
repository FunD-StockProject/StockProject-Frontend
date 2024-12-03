import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { MARKET_CODES, STOCK_COUNTRY_TYPE } from '@ts/Constants';
import { fetchRealStockInfo } from '@controllers/api';
import { StockInfo } from '@controllers/api.Type';
import ZipyoSVG from '@assets/zipyo.svg?react';
import {
  SearchTitleAnimatedText,
  SearchTitleButton,
  SearchTitleContainer,
  SearchTitleContent,
  SearchTitleCountryButton,
  SearchTitleLabelContainer,
  SearchTitleLabelItem,
  SearchTitleLayout,
  SearchTitleSVG,
  SearchTitleText,
} from './SearchTitle.Style';

const SearchTitle = ({
  stockInfo,
  resultMode,
  onClick,
}: {
  stockInfo: StockInfo;
  resultMode: 'indicator' | 'chart';
  onClick: (e: any) => void;
}) => {
  const { state } = useLocation();

  const titleTextRef = useRef<HTMLDivElement>(null);

  const [animated, setAnimated] = useState<boolean>(false);

  useEffect(() => {
    if (!titleTextRef.current) return;
    setAnimated(titleTextRef.current.scrollWidth > titleTextRef.current.offsetWidth);
  }, [state]);
  // stockInfo.price = 164900.0;
  // stockInfo.priceDiff = 6100.0;
  // stockInfo.priceDiffPerCent = 3.84;
  // stockInfo.priceSign = 2;

  const [realStockInfo, setRealStockInfo] = useState({
    symbol: '000660',
    exchange: '001',
    price: 164900.0,
    priceDiff: 6100.0,
    priceDiffPerCent: 3.84,
    priceSign: 2,
  });
  const getRealStockInfo = async () => {
    const res = await fetchRealStockInfo(stockInfo.stockId, stockInfo.country);
    setRealStockInfo(res);
    debugger;
  };
  useEffect(() => {
    getRealStockInfo();
  }, []);

  const color = realStockInfo.priceSign <= 3 ? 'red' : 'blue';
  const symbol = realStockInfo.priceSign <= 3 ? '+' : '-';
  const money = stockInfo.country === 'KOREA' ? '₩' : '$';
  return (
    <SearchTitleLayout>
      <SearchTitleContainer>
        <SearchTitleCountryButton>{STOCK_COUNTRY_TYPE[stockInfo.country]} 주식</SearchTitleCountryButton>
        <SearchTitleContent>
          <SearchTitleText ref={titleTextRef}>
            {stockInfo.symbolName}
            <SearchTitleAnimatedText animated={animated}>{stockInfo.symbolName}</SearchTitleAnimatedText>
          </SearchTitleText>
          <SearchTitleSVG>
            <ZipyoSVG />
          </SearchTitleSVG>
          <SearchTitleButton onClick={onClick}>
            {resultMode == 'indicator' ? '차트' : '인간지표'} 보기
          </SearchTitleButton>
        </SearchTitleContent>
        <SearchTitleLabelContainer>
          <SearchTitleLabelItem>{stockInfo.symbol}</SearchTitleLabelItem>
          <SearchTitleLabelItem>{MARKET_CODES[stockInfo.exchangeNum]}</SearchTitleLabelItem>
          <SearchTitleLabelItem bold={true} delta={1900 > 0}>
            {money} {realStockInfo.price.toLocaleString()}
            <span style={{ color }}>
              {symbol}
              {realStockInfo.priceDiff.toLocaleString()} ({realStockInfo.priceDiffPerCent}%)
            </span>
          </SearchTitleLabelItem>
        </SearchTitleLabelContainer>
        인간지표는 공식 지표가 아니므로 참고 용도로만 활용해 주세요
      </SearchTitleContainer>
    </SearchTitleLayout>
  );
};

export default SearchTitle;
