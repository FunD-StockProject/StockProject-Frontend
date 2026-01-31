import { useMemo } from 'react';
import { useEffect } from 'react';
import { SmallStockCard } from '@components/CardList/StockCard/StockCard';
import { fetchSearchKeyword } from '@controllers/stocks/api';
import { useAutoComplete } from '@controllers/stocks/query';
import { SearchBarItemContainer, SearchBarItemContents, SearchBarItemTitle } from '../../SearchBar.Style';
import { AutoCompleteEmptyContainer } from '../AutoComplete.Style';

const AutoCompleteKeywords = ({ searchValue }: { searchValue: string }) => {
  const [searchedKeywords, setSearchedKeywords] = useAutoComplete(fetchSearchKeyword, 'keyword');

  useEffect(() => {
    setSearchedKeywords(searchValue);
  }, [searchValue]);

  const matchedKeyword = searchedKeywords?.length ? searchValue : '';

  const stocksForRender = useMemo(() => {
    if (!searchedKeywords?.length) return [];

    return searchedKeywords.map(({ stockId, symbolName, score, diff, keywordNames, country }) => {
      const safeKeywordNames = keywordNames ?? [];
      const baseKeyword = safeKeywordNames[0]; // 없을 수도 있음

      const keywords = safeKeywordNames.includes(matchedKeyword)
        ? safeKeywordNames
        : ([baseKeyword, matchedKeyword].filter(Boolean) as string[]);

      return {
        stockId,
        symbolName,
        score,
        diff,
        keywords,
        country,
      };
    });
  }, [searchedKeywords, matchedKeyword]);

  const hasResults = stocksForRender.length > 0;

  return (
    <SearchBarItemContainer>
      <SearchBarItemTitle>
        검색결과
        {matchedKeyword && (
          <p>
            <b>'{matchedKeyword}'</b>이(가) 가장 많이 언급된 종목순으로 노출됩니다
          </p>
        )}
      </SearchBarItemTitle>
      <SearchBarItemContents>
        {hasResults ? (
          stocksForRender.map((stock) => (
            <SmallStockCard key={`SEARCHED_KEYWORD_${stock.stockId}`} stock={stock} country={stock.country} />
          ))
        ) : (
          <AutoCompleteEmptyContainer>
            <p className="empty_title">'{searchValue}' 검색어에 해당하는 결과가 없어요 😭</p>
            <p className="empty_subtitle">다른 종목을 다시 검색해보세요</p>
          </AutoCompleteEmptyContainer>
        )}
      </SearchBarItemContents>
    </SearchBarItemContainer>
  );
};

export default AutoCompleteKeywords;
