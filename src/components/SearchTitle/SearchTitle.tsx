import ZipyoSVG from '@assets/zipyo.svg?react';
import {
  SearchTitleButton,
  SearchTitleContainer,
  SearchTitleContent,
  SearchTitleCountryButton,
  SearchTitleLayout,
  SearchTitleText,
} from './SearchTitle.Syle';

const SearchTitle = ({
  stockName,
  resultMode,
  onClick,
}: {
  stockName: string;
  resultMode: 'indicator' | 'chart';
  onClick: (e: any) => void;
}) => {
  return (
    <SearchTitleLayout>
      <SearchTitleContainer>
        <SearchTitleCountryButton>국내 주식</SearchTitleCountryButton>
        <SearchTitleContent>
          <SearchTitleText>
            {stockName}
            <ZipyoSVG />
          </SearchTitleText>
          <SearchTitleButton onClick={onClick}>
            {resultMode == 'indicator' ? '차트' : '인간지표'} 보기
          </SearchTitleButton>
        </SearchTitleContent>
        인간지표는 공식 지표가 아니므로 참고 용도로만 활용해 주세요
      </SearchTitleContainer>
    </SearchTitleLayout>
  );
};

export default SearchTitle;
