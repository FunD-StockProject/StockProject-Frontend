import styled from '@emotion/styled';
import { useKeywordRankingsQuery } from '@controllers/stocks/query';
import { theme } from '@styles/themes';

const Wrapper = styled.div({
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',

  ['>p']: {
    ...theme.font.body18Semibold,
    color: theme.colors.sub_white,
    margin: '0 20px',
  },
});

const PopularKeywordsContainer = styled.div({
  display: 'flex',
  padding: '0 20px',
  overflow: 'auto',
  gap: '8px',

  msOverflowStyle: 'none',
  ['::-webkit-scrollbar']: {
    display: 'none',
  },

  ['>span']: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    flexShrink: '0',
    padding: '8px 16px',
    borderRadius: '999px',
    ...theme.font.body16Medium,
    color: theme.colors.sub_gray1,
    border: `1px solid ${theme.colors.sub_gray9}`,
  },
});

const PopularKeywords = ({ setSearchValue }: { setSearchValue: (value: string) => void }) => {
  const { data: keywordRankings } = useKeywordRankingsQuery();

  const handlePopularKeywordClick = (keyword: string) => () => {
    setSearchValue(keyword);
  };

  return (
    <Wrapper>
      <p>현재 가장 많이 언급되는 키워드</p>
      <PopularKeywordsContainer>
        {keywordRankings?.map((e) => (
          <span key={`KEYWORD_RANKING_${e}`} onClick={handlePopularKeywordClick(e)}>
            {e}
          </span>
        ))}
      </PopularKeywordsContainer>
    </Wrapper>
  );
};

export default PopularKeywords;
