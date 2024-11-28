import { useEffect, useRef, useState } from 'react';
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
  SearchTitleText,
} from './SearchTitle.Syle';

const SearchTitle = ({
  stockInfo,
  resultMode,
  onClick,
}: {
  stockInfo: StockInfo;
  resultMode: 'indicator' | 'chart';
  onClick: (e: any) => void;
}) => {
  const titleContainerRef = useRef<HTMLDivElement>(null);

  const [animated, setAnimated] = useState<boolean>(false);

  useEffect(() => {
    if (!titleContainerRef.current) return;
    if (titleContainerRef.current.scrollWidth > titleContainerRef.current.offsetWidth) {
      setAnimated(true);
    }
  }, []);

  return (
    <SearchTitleLayout>
      <SearchTitleContainer>
        <SearchTitleCountryButton>국내 주식</SearchTitleCountryButton>
        <SearchTitleContent ref={titleContainerRef}>
          <SearchTitleText>
            {!animated ? (
              <span>{stockInfo.symbolName}</span>
            ) : (
              <SearchTitleAnimatedText>
                <span>{stockInfo.symbolName}</span>
              </SearchTitleAnimatedText>
            )}
            <ZipyoSVG />
          </SearchTitleText>
          <SearchTitleButton onClick={onClick}>
            {resultMode == 'indicator' ? '차트' : '인간지표'} 보기
          </SearchTitleButton>
        </SearchTitleContent>
        <SearchTitleLabelContainer>
          <SearchTitleLabelItem>{stockInfo.symbol}</SearchTitleLabelItem>
          <SearchTitleLabelItem>코스피</SearchTitleLabelItem>
          <SearchTitleLabelItem bold={true} delta={1900 > 0}>
            {'57,900'}
            <span>{'+1900(3.39%)'}</span>
          </SearchTitleLabelItem>
        </SearchTitleLabelContainer>
        인간지표는 공식 지표가 아니므로 참고 용도로만 활용해 주세요
      </SearchTitleContainer>
    </SearchTitleLayout>
  );
};

export default SearchTitle;
