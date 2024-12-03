import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { MARKET_CODES, STOCK_COUNTRY_TYPE } from '@ts/Constants';
import { useQueryComponent } from '@hooks/useQueryComponent';
import { StockInfo } from '@controllers/api.Type';
import { RealStockInfoQuery } from '@controllers/query';
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

  const [stock, suspend] = useQueryComponent({ query: RealStockInfoQuery(stockInfo.stockId, stockInfo.country) });

  useEffect(() => {
    if (!titleTextRef.current) return;
    setAnimated(titleTextRef.current.scrollWidth > titleTextRef.current.offsetWidth);
  }, [state]);

  const priceDiff = (diff: number) => {
    return `${(diff < 0 ? '-' : '+') + Math.abs(diff).toLocaleString()}`;
  };

  const money = stockInfo.country === 'KOREA' ? '₩' : '$';
  return (
    suspend ||
    (stock && (
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
            <SearchTitleLabelItem bold={true} delta={stock.priceDiff > 0}>
              {money} {stock.price.toLocaleString()}
              <span>
                {`
                ${priceDiff(stock.priceDiff)}
                (${stock.priceDiffPerCent}%)
              `}
              </span>
            </SearchTitleLabelItem>
          </SearchTitleLabelContainer>
          인간지표는 공식 지표가 아니므로 참고 용도로만 활용해 주세요
        </SearchTitleContainer>
      </SearchTitleLayout>
    ))
  );
};

export default SearchTitle;
