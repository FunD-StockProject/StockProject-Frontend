import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { MARKET_CODES, STOCK_COUNTRY_TYPE } from '@ts/Constants';
import { StockInfo } from '@controllers/api.Type';
import AlertSVG from '@assets/alert.svg?react';
import ZipyoSVG from '@assets/zipyo.svg?react';
import {
  SearchInfo,
  SearchTitleAnimatedText,
  SearchTitleButton,
  SearchTitleContainer,
  SearchTitleContent,
  SearchTitleCountryButton,
  SearchTitleLabelContainer,
  SearchTitleLabelItem,
  SearchTitleSVG,
  SearchTitleText,
} from './SearchTitle.Style';

const SearchTitle = ({ stockInfo, resultMode, onClick }: { stockInfo: StockInfo; resultMode: 'indicator' | 'chart'; onClick: (e: any) => void }) => {
  const { state } = useLocation();
  const titleTextRef = useRef<HTMLDivElement>(null);
  const [animated, setAnimated] = useState<boolean>(false);

  useEffect(() => {
    if (!titleTextRef.current) return;
    setAnimated(titleTextRef.current.scrollWidth > titleTextRef.current.offsetWidth);
  }, [state]);

  const priceDiff = (diff: number) => {
    return `${(diff < 0 ? '-' : '+') + Math.abs(diff).toLocaleString()}`;
  };

  const money = stockInfo.country === 'KOREA' ? '₩' : '$';
  return (
    stockInfo && (
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
          <SearchTitleButton onClick={onClick}>{resultMode == 'indicator' ? '차트' : '인간지표'} 보기</SearchTitleButton>
        </SearchTitleContent>
        <SearchTitleLabelContainer>
          <SearchTitleLabelItem>{stockInfo.symbol}</SearchTitleLabelItem>
          <SearchTitleLabelItem>{MARKET_CODES[stockInfo.exchangeNum]}</SearchTitleLabelItem>
          <SearchTitleLabelItem bold={true} delta={stockInfo.priceDiff}>
            {money} {stockInfo.price.toLocaleString()}
            <span>
              {`
                ${priceDiff(stockInfo.priceDiff)}
                (${stockInfo.priceDiffPerCent}%)
              `}
            </span>
          </SearchTitleLabelItem>
        </SearchTitleLabelContainer>
        <SearchInfo>
          <AlertSVG />
          인간지표는 공식 지표가 아니므로 참고 용도로만 활용해 주세요
        </SearchInfo>
      </SearchTitleContainer>
    )
  );
};

export default SearchTitle;
