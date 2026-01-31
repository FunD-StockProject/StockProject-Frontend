import { useKeywordRankingsQuery } from '@controllers/stocks/query';
import { PopularKeywordsContainer, Wrapper } from './PopularKeywords.Style';

const PopularKeywords = ({ setInputValue }: { setInputValue: (value: string) => void }) => {
  const { data: keywordRankings } = useKeywordRankingsQuery();

  const handlePopularKeywordClick = (keyword: string) => () => {
    setInputValue(keyword);
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
