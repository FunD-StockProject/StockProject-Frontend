import { useAutoComplete, usePopularStockFetchQuery } from "@controllers/query";
import { SearchBar, SearchInput, SearchIconWrapper } from "../Common.Style";
import { SearchModal, SearchModalButton, SearchModalFooter, SearchKeywordSection, SearchKeywordList, SearchKeywordItem, RightArrowSVGWrapper, SearchTitle, SearchHeader, CancelSVGWrapper, NoResultSection, NoResultDesc, NoResultTitle } from "./StockSearch.Style";

import SearchSVG from '@assets/icons/search.svg?react';
import RightArrowSVG from '@assets/icons/rightArrow.svg?react';
import CancelSVG from '@assets/icons/cancel.svg?react';
import UncheckSVG from '@assets/icons/uncheck.svg?react';
import CheckSVG from '@assets/icons/check.svg?react';
import { useEffect, useRef, useState } from "react";
// import { useIsMobile } from "@hooks/useIsMobile";
import { AutoCompleteItem } from "@controllers/api.Type";

import { fetchAutoComplete } from "@controllers/api";

const useComponentFocus = (
  initialState: boolean,
  ref: React.RefObject<HTMLElement>,
): [boolean, React.Dispatch<React.SetStateAction<boolean>>] => {
  const [isFocus, setIsFocus] = useState<boolean>(initialState);

  useEffect(() => ref.current?.[isFocus ? 'focus' : 'blur'](), [isFocus]);

  return [isFocus, setIsFocus];
};

const StockSearch = ({ onClose, country, initialSelectedStocks }: { onClose: (selcted: any) => void, country: string, initialSelectedStocks: AutoCompleteItem[] }) => {


  const inputRef = useRef<HTMLInputElement>(null);
  const [popularStocks] = usePopularStockFetchQuery();
  const filteredStocks = popularStocks.filter(stock => stock.country === country);

  const [inputValue, setInputValue] = useState<string>('');
  const [selectedStocks, setSelectedStocks] = useState<AutoCompleteItem[]>(initialSelectedStocks);
  const [_isFocusInput, setIsFocusInput] = useComponentFocus(false, inputRef);
  const [isActiveSearchBar, setIsActiveSearchBar] = useState<boolean>(false);
  const [searchedStocks, setSearchedStocks] = useAutoComplete(fetchAutoComplete, 'symbolName');
  const filteredSearchedStocks = searchedStocks.filter(stock => stock.country === country);

  useEffect(() => {
    if (inputValue.length > 0) {
      setSearchedStocks(inputValue);
    }
  }, [inputValue]);


  const handleItemClick = (item: AutoCompleteItem) => {
    setSelectedStocks((prev) => {
      const exists = prev.some((s) => s.symbol === item.symbol);
      return exists ? prev.filter((s) => s.symbol !== item.symbol) : [...prev, item];
    });
  };

  const handleSearchValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
  };

  const updateActiveSearchBar = (active: boolean) => {
    setIsActiveSearchBar(active);
  };

  const handleSearchBarInputFocus = () => {
    setIsFocusInput(true);
    updateActiveSearchBar(true);
  };


  return (
    <SearchModal>
      <SearchHeader>
        <CancelSVGWrapper onClick={() => onClose(selectedStocks)}>
          <CancelSVG />
        </CancelSVGWrapper>
        <div style={{ flex: 1 }}>
          <SearchBar>
            <SearchInput
              type="text"
              value={inputValue}
              ref={inputRef}
              placeholder="종목명 or TICKER를 입력해주세요"
              onChange={handleSearchValueChange}
              onFocus={handleSearchBarInputFocus}
              onBlur={() => setIsActiveSearchBar(false)}
            />
            <SearchIconWrapper>
              <SearchSVG width={20} height={20} />
            </SearchIconWrapper>
          </SearchBar>
        </div>
      </SearchHeader>
      {!isActiveSearchBar ? (
        <SearchKeywordSection>
          <SearchTitle>인간지표 인기검색어</SearchTitle>
          <SearchKeywordList>
            {filteredStocks.map((stock, index) => (
              <SearchKeywordItem
                key={`${stock.ticker}+${index}`}
                onClick={() => {
                  setInputValue(stock.symbolName);
                  setIsActiveSearchBar(true);
                }}
              >
                <span className="index">{index + 1}</span>
                <span className="name">{stock.symbolName}</span>
                <RightArrowSVGWrapper>
                  <RightArrowSVG />
                </RightArrowSVGWrapper>
              </SearchKeywordItem>
            ))}
          </SearchKeywordList>
        </SearchKeywordSection>
      ) : (
        <SearchKeywordSection>
          <SearchTitle>검색 결과</SearchTitle>
          {filteredSearchedStocks.length > 0 ?
            <>
              <SearchKeywordList>
                {filteredSearchedStocks.map((stock, index) => (
                  <SearchKeywordItem
                    key={`${stock.ticker}+${index}`}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => handleItemClick(stock)}
                  >
                    <span className="name">{stock.symbolName}</span>
                    <RightArrowSVGWrapper>
                      {selectedStocks.some(s => s.symbol === stock.symbol) ? <CheckSVG /> : <UncheckSVG />}
                    </RightArrowSVGWrapper>
                  </SearchKeywordItem>
                ))}
              </SearchKeywordList>
            </>
            : (
              <NoResultSection>
                <NoResultTitle>
                  검색결과가 없어요 😭
                </NoResultTitle>
                <NoResultDesc>
                  다른 종목을 다시 검색해보세요
                </NoResultDesc>
              </NoResultSection>
            )
          }
        </SearchKeywordSection>
      )}
      <SearchModalFooter>
        <SearchModalButton onClick={() => onClose(selectedStocks)}>
          선택하기 {selectedStocks.length > 0 ? selectedStocks.length : ''}
        </SearchModalButton>
      </SearchModalFooter>
    </SearchModal >
  );
};

export default StockSearch;
