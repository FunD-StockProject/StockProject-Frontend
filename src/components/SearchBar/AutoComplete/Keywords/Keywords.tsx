import { useState } from 'react';
import { useEffect } from 'react';
import { SmallStockCard } from '@components/CardList/StockCard/StockCard';
import {
  SearchBarItemContainer,
  SearchBarItemContents,
  SearchBarItemTitle,
} from '@components/SearchBar/SearchBar.Style';
import { fetchSearchKeyword } from '@controllers/stocks/api';
import { useAutoComplete } from '@controllers/stocks/query';
import { AutoCompleteEmptyContainer } from '../AutoComplete.Style';

const AutoCompleteKeywords = ({ searchValue }: { searchValue: string }) => {
  const [searchedKeywords, setSearchedKeywords] = useAutoComplete(fetchSearchKeyword, 'keyword');
  const [matchedKeyword, setMatchedKeyword] = useState<string>('');

  useEffect(() => {
    setSearchedKeywords(searchValue);
  }, [searchValue]);

  useEffect(() => {
    if (!searchedKeywords?.length) return;
    setMatchedKeyword(searchValue);
  }, [searchedKeywords]);

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
        {searchedKeywords?.length ? (
          searchedKeywords?.map(({ stockId, symbolName, score, diff, keywordNames }, index) => {
            const stock = {
              stockId: stockId,
              symbolName: symbolName,
              score: score,
              diff: diff,
              keywords: keywordNames.includes(matchedKeyword) ? keywordNames : [keywordNames[0], matchedKeyword],
            };

            return <SmallStockCard key={`SEARCHED_KEYWORD_${index}`} stock={stock} country="KOREA" />;
          })
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
