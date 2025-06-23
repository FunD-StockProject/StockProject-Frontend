import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';

import BackLogo from '@assets/backLogo.svg?react';
import SearchSVG from '@assets/icons/search.svg?react';

import CancelSVG from '@assets/icons/cancel.svg?react';
import {
  BackIcon,
  Container,
  Description,
  InnerContainer,
  NavButton,
  NavButtonContainer,
  SearchBar,
  SearchIconWrapper,
  SearchInput,
  Title,
  TopBar,
  TopBarTitle,
} from '../Common.Style';

import {
  Section,
  SectionTitle,
  IndustryBox,
  IndustryTag,
  SelectedStockWrapper,
  SelectedStockTag,
  RemoveStockButton,
  SelectedStockSymbolName,
} from './StockSelection.Style';
import StockSearch from '../StockSearch/StockSearch';
import { AutoCompleteItem } from '@controllers/api.Type';
import { webPath } from '@router/index';


const StockSelection = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const country = location.state?.country ?? null;
  const [selectedStocks, setSelectedStocks] = useState<AutoCompleteItem[]>([]);
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const toggleIndustry = (label: string) => {
    setSelectedIndustries(prev =>
      prev.includes(label) ? prev.filter(item => item !== label) : [...prev, label]
    );
  };

  const isValid = selectedIndustries.length > 0 || selectedStocks.length > 0;

  return (
    <Container>
      <TopBar statusRate={60}>
        <BackIcon onClick={() => navigate(-1)}>
          <BackLogo />
        </BackIcon>
        <TopBarTitle>종목 선택</TopBarTitle>
      </TopBar>
      <InnerContainer>
        {isSearching && (
          <StockSearch
            onClose={(selected) => {
              if (selected && selected.length > 0) {
                setSelectedStocks(selected);
              }
              setIsSearching(false); // 검색창 닫기
            }}
            country={country}
          />
        )}
        <Title>
          구체적으로 관심있는 <br />
          종목/산업이 있다면 모두 선택해주세요
        </Title>
        <Description>* 중복 선택도 가능해요!</Description>

        <Section>
          <SectionTitle>관심 종목</SectionTitle>
          <SearchBar onClick={() => setIsSearching(true)}>
            <SearchInput
              type="text"
              placeholder="종목명 or TICKER를 입력해주세요"
              onFocus={() => {
                setIsSearching(true);
                setTimeout(() => {
                  document.activeElement instanceof HTMLElement && document.activeElement.blur();
                }, 100); // added slight delay to ensure visual smoothness
              }}
            />
            <SearchIconWrapper>
              <SearchSVG width={20} height={20} />
            </SearchIconWrapper>
          </SearchBar>
          <SelectedStockWrapper>
            {selectedStocks.map((stock) => (
              <SelectedStockTag key={stock.symbol}>
                <SelectedStockSymbolName>{stock.symbolName}</SelectedStockSymbolName>
                <RemoveStockButton
                  onClick={() =>
                    setSelectedStocks(prev => prev.filter(s => s.symbol !== stock.symbol))
                  }
                >
                  <CancelSVG width={10} height={10} />
                </RemoveStockButton>
              </SelectedStockTag>
            ))}
          </SelectedStockWrapper>
        </Section>

        <Section>
          <SectionTitle>관심 산업</SectionTitle>
          <IndustryBox>
            {[
              '전기전자', '기계장비', '금속', '음식료 담배', '제약', '운송장비',
              '유통', '기타금융', '화학', '증권', '이외산업',
            ].map((label) => (

              <IndustryTag
                key={label}
                selected={selectedIndustries.includes(label)}
                onClick={() => toggleIndustry(label)}
              >
                {label}
              </IndustryTag>
            ))}
          </IndustryBox>
        </Section>

        <NavButtonContainer>
          <NavButton onClick={() => navigate(-1)}>이전</NavButton>
          <NavButton
            next={true}
            active={isValid}
            disabled={!isValid}
            onClick={() => navigate(webPath.labStockPurchase(), { state: { selectedStocks, selectedIndustries, country } })}
          >
            선택완료
          </NavButton>
        </NavButtonContainer>

      </InnerContainer>
    </Container>
  );
};

export default StockSelection;
