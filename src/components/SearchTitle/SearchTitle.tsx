import { ButtonDiv, FlexDiv, ImgDiv } from '../../components/Common';
import { Text, TextDetail, TextHeading, TextTitle } from '../../components/Text';
import { SearchTitleContainer, SearchTitleContents } from './SearchTitle.Syle';

const SearchTitle = ({ stockName, resultMode, onClick }: { stockName: string; resultMode: 'indicator' | 'chart'; onClick: (e: any) => void }) => {
  return (
    <SearchTitleContainer>
      <SearchTitleContents>
        <FlexDiv flexDirection="column" gap="18px" width="100%">
          <ButtonDiv background="grayscale70" padding="12px 24px" width="fit-content" radius="30px">
            <TextDetail color="primary0" weight="Bold">
              국내 주식
            </TextDetail>
          </ButtonDiv>
          <FlexDiv justifyContent="space-between" width="100%">
            <FlexDiv>
              <TextHeading color="grayscale10">{stockName}</TextHeading>
              <ImgDiv />
            </FlexDiv>
            <ButtonDiv background="primary50" padding="16px 32px" radius="30px" onClick={onClick}>
              <Text size="Large" weight="Bold" color="grayscale5">
                {resultMode == 'indicator' ? '차트' : '인간지표'} 보기
              </Text>
            </ButtonDiv>
          </FlexDiv>
          <TextTitle size="Large" color="grayscale30">
            인간지표는 공식 지표가 아니므로 참고 용도로만 활용해 주세요
          </TextTitle>
        </FlexDiv>
      </SearchTitleContents>
    </SearchTitleContainer>
  );
};

export default SearchTitle;
