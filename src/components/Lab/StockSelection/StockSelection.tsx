import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import BackLogo from '@assets/backLogo.svg?react';
import SearchSVG from '@assets/icons/search.svg?react';

import CancelSVG from '@assets/icons/cancel.svg?react';
import {
  BackIcon,
  Container,
  Description,
  Divider,
  InnerContainer,
  NavButton,
  NavButtonContainer,
  SearchBar,
  SearchIconWrapper,
  SearchInput,
  Title,
  ToastStyle,
  TopBar,
  IndustryTag,
  TopBarTitle,
} from '../Common.Style';

import {
  Section,
  SectionTitle,
  IndustryBox,
  SelectedStockWrapper,
  SelectedStockTag,
  RemoveStockButton,
  SelectedStockSymbolName,
  SearchModalOverlay,
} from './StockSelection.Style';
import { AutoCompleteItem } from '@controllers/api.Type';
import { webPath } from '@router/index';
import WarningSVG from '@assets/icons/warning.svg?react';
import StockSearch from '../StockSearch/StockSearch';

const industries = {
  KOREA:
    [
      '전기전자', '기계장비', '금속', '음식료 담배', '제약', '운송장비',
      '유통', '기타금융', '화학', '증권', '이외산업',
    ],
  OVERSEA:
    [
      '에너지', '소재', '산업재', '임의소비재', '필수소비재', '헬스케어',
      '금융', 'IT', '화학', '커뮤니케이션', '유틸리티', '부동산', '이외산업',
    ]
}

const StockSelection = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const country = location.state?.country ?? null;
  const [selectedStocks, setSelectedStocks] = useState<AutoCompleteItem[]>([]);
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [toast, setToast] = useState<React.ReactNode | null>(null);

  const isValid = selectedIndustries.length > 0 || selectedStocks.length > 0;

  const toggleIndustry = (label: string) => {
    setSelectedIndustries(prev => {
      const isSelected = prev.includes(label);
      if (isSelected) {
        return prev.filter(item => item !== label); // deselect
      } else if (prev.length >= 3) {
        showToast(
          <>
            <WarningSVG style={{ marginRight: '6px' }} />
            종목은 최대 3개까지만 선택할 수 있어요.
          </>
        );
        return prev;
      } else {
        return [...prev, label];
      }
    });
  };

  useEffect(() => {
    if (location.state?.selectedStocks) {
      setSelectedStocks(location.state.selectedStocks);
    }
  }, [location.state?.selectedStocks]);

  const showToast = (message: React.ReactNode) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <Container>
      {isModalOpen && (
        <>
          <SearchModalOverlay />
          <StockSearch
            onClose={(selected: any) => {
              if (selected && selected.length > 0) {
                setSelectedStocks(selected);
              }
              setIsModalOpen(false);
            }}
            country={country}
            initialSelectedStocks={selectedStocks}
          />
        </>
      )}
      <TopBar statusRate={60}>
        <BackIcon onClick={() => navigate(-1)}>
          <BackLogo />
        </BackIcon>
        <TopBarTitle>포트폴리오 생성하기</TopBarTitle>
      </TopBar>
      <InnerContainer>
        <Title>
          구체적으로 관심있는 <br />
          종목/산업이 있다면 모두 선택해주세요.
        </Title>
        <Description>
          * 검색으로 종목을 직접 추가할 수 있어요. <br />
          * 원하는 특정 종목이 없다면,  <br />
          관심 있는 산업을 최대 3개까지 선택해주세요.
        </Description>

        <Divider />
        <Section>
          <SectionTitle>관심 종목</SectionTitle>
          <SearchBar onClick={() => setIsModalOpen(true)}>
            <SearchInput
              type="text"
              placeholder="종목명 or TICKER를 입력해주세요"
              onClick={() => setIsModalOpen(true)}
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
                  onClick={() => {
                    const truncatedName = stock.symbolName.length > 14 ? `${stock.symbolName.slice(0, 14)}...` : stock.symbolName;
                    setSelectedStocks(prev => prev.filter(s => s.symbol !== stock.symbol));
                    showToast(
                      <>
                        <WarningSVG style={{ marginRight: '6px' }} />
                        {truncatedName} 종목을 삭제하였습니다.
                      </>
                    );
                  }}
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
            {industries[country as 'KOREA' | 'OVERSEA'].map((label: string) => (
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
          <NavButton onClick={() => navigate(webPath.labMarketSelection())}>이전</NavButton>
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
      {toast && <ToastStyle key={toast.toString()}>{toast}</ToastStyle>}
    </Container >
  );
};

export default StockSelection;
