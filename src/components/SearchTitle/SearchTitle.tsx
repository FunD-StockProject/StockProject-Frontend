import ZipyoSVG from '../../assets/zipyo.svg?react';
import { theme } from '../../styles/themes';
import { ButtonDiv, FlexDiv, ImgDiv, StyledSVG } from '../Common/Common';
import { Text, TextDetail, TextDisplay, TextHeading, TextTitle } from '../Text/Text';
import { SearchTitleButton, SearchTitleContainer, SearchTitleContents } from './SearchTitle.Syle';

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
    <SearchTitleContainer>
      <SearchTitleContents>
        <ButtonDiv background="grayscale70" padding="12px 24px" width="fit-content" radius="30px">
          <TextTitle size="XSmall" color="primary0">
            국내 주식
          </TextTitle>
        </ButtonDiv>
        <FlexDiv justifyContent="space-between" width="100%">
          <FlexDiv>
            <FlexDiv alignItems="center" gap="12px">
              <TextDisplay size="Small" color="grayscale10">
                {stockName}
              </TextDisplay>
              <StyledSVG svg={ZipyoSVG} fill="primary40" type="Display" size="Small" />
            </FlexDiv>
            <ImgDiv />
          </FlexDiv>
          <SearchTitleButton onClick={onClick}>
            <TextTitle size="Medium" color="grayscale5">
              {resultMode == 'indicator' ? '차트' : '인간지표'} 보기
            </TextTitle>
          </SearchTitleButton>
        </FlexDiv>
        <TextTitle color="grayscale30">인간지표는 공식 지표가 아니므로 참고 용도로만 활용해 주세요</TextTitle>
      </SearchTitleContents>
    </SearchTitleContainer>
  );
};

export default SearchTitle;
