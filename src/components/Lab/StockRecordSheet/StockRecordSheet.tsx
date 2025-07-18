import { useNavigate } from "react-router-dom";
import { Container, TopBar, BackIcon, TopBarTitle, InnerContainer, StatusTitle } from "../Common.Style";

import BackLogoSVG from '@assets/backLogo.svg?react';

import {
  FilterContainer,
  FilterTabs,
  FilterTab,
  SortDropdown,
  TitleContainer,
} from "./StockRecordSheet.style";

import SamsungLogoSVGURL from '@assets/sangsung.svg?url';
import { ExperimentItem } from "@ts/Interfaces";
import ExperimentList from "./ExperimentList/ExpermentList";
import { useState } from "react";
const mockExperiments: ExperimentItem[] = [
  {
    id: 1,
    name: '삼성전자',
    logo: SamsungLogoSVGURL,
    buyPrice: 50000,
    buyScore: 50,
    currentPrice: 60000,
    currentScore: 60,
    autoSellIn: 3,
    buyDate: '24.11.01',
  },
  {
    id: 2,
    name: 'Deloitte',
    logo: SamsungLogoSVGURL,
    buyPrice: 50000,
    buyScore: 50,
    currentPrice: 60000,
    currentScore: 60,
    autoSellIn: 2,
    buyDate: '24.11.05',
  },
  {
    id: 3,
    name: '애플',
    logo: SamsungLogoSVGURL,
    buyPrice: 70000,
    buyScore: 65,
    currentPrice: 80000,
    currentScore: 68,
    autoSellIn: 1,
    buyDate: '24.11.10',
  },
  {
    id: 4,
    name: '테슬라',
    logo: SamsungLogoSVGURL,
    buyPrice: 90000,
    buyScore: 72,
    currentPrice: 88000,
    currentScore: 70,
    autoSellIn: 0,
    buyDate: '24.11.15',
  },
  {
    id: 5,
    name: '네이버',
    logo: SamsungLogoSVGURL,
    buyPrice: 1000,
    buyScore: 80,
    currentPrice: 1300,
    currentScore: 85,
    autoSellIn: 2,
    buyDate: '24.11.18',
  },
  {
    id: 6,
    name: '카카오',
    logo: SamsungLogoSVGURL,
    buyPrice: 600,
    buyScore: 47,
    currentPrice: 60000,
    currentScore: 45,
    autoSellIn: 3,
    buyDate: '24.11.',
  },
  {
    id: 7,
    name: '현대차',
    logo: SamsungLogoSVGURL,
    buyPrice: 95000,
    buyScore: 66,
    currentPrice: 99000,
    currentScore: 70,
    autoSellIn: 4,
    buyDate: '24.11.23',
  },
  {
    id: 8,
    name: 'LG화학',
    logo: SamsungLogoSVGURL,
    buyPrice: 500000,
    buyScore: 85,
    currentPrice: 510000,
    currentScore: 87,
    autoSellIn: 0,
    buyDate: '24.11.26',
  },
  {
    id: 9,
    name: '마이크로소프트',
    logo: SamsungLogoSVGURL,
    buyPrice: 310000,
    buyScore: 78,
    currentPrice: 330000,
    currentScore: 82,
    autoSellIn: 5,
    buyDate: '24.11.28',
  },
  {
    id: 10,
    name: '엔비디아',
    logo: SamsungLogoSVGURL,
    buyPrice: 450000,
    buyScore: 90,
    currentPrice: 470000,
    currentScore: 92,
    autoSellIn: 1,
    buyDate: '24.12.01',
  },
  {
    id: 11,
    name: '아마존',
    logo: SamsungLogoSVGURL,
    buyPrice: 180000,
    buyScore: 58,
    currentPrice: 176000,
    currentScore: 56,
    autoSellIn: 2,
    buyDate: '24.12.03',
  },
  {
    id: 12,
    name: '구글',
    logo: SamsungLogoSVGURL,
    buyPrice: 200000,
    buyScore: 62,
    currentPrice: 2000,
    currentScore: 67,
    autoSellIn: 4,
    buyDate: '24.12.05',
  },
];

const StockRecordSheet = () => {
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState<'active' | 'completed'>('active');
  const [sortOption, setSortOption] = useState<'latest' | 'oldest' | 'highReturn' | 'lowReturn'>('latest');
  const filteredExperiments = mockExperiments
    .filter((item) => {
      if (statusFilter === 'active') return item.autoSellIn > 0;
      if (statusFilter === 'completed') return item.autoSellIn <= 0;
      return true;
    })
    .sort((a, b) => {
      if (sortOption === 'latest') return b.id - a.id;
      if (sortOption === 'oldest') return a.id - b.id;

      const returnRateA = (a.currentPrice - a.buyPrice) / a.buyPrice;
      const returnRateB = (b.currentPrice - b.buyPrice) / b.buyPrice;

      if (sortOption === 'highReturn') return returnRateB - returnRateA;
      if (sortOption === 'lowReturn') return returnRateA - returnRateB;
      return 0;
    });
  return (
    <Container>
      <TopBar statusRate={0}>
        <BackIcon onClick={() => navigate(-1)}>
          <BackLogoSVG />
        </BackIcon>
        <TopBarTitle>매수 기록지</TopBarTitle>

      </TopBar>
      <InnerContainer style={{ padding: '12px' }}>
        <TitleContainer>
          <StatusTitle>
            총 실험 {mockExperiments.length} 회
          </StatusTitle>
          <SortDropdown value={sortOption} onChange={(e) => setSortOption(e.target.value as any)}>
            <option value="latest">최신순</option>
            <option value="oldest">오래된 순</option>
            <option value="gain">수익률 순</option>
          </SortDropdown>
        </TitleContainer>
        <FilterContainer>
          <FilterTabs>
            <FilterTab selected={statusFilter === 'active'} onClick={() => setStatusFilter('active')}>실험중</FilterTab>
            <FilterTab selected={statusFilter === 'completed'} onClick={() => setStatusFilter('completed')}>실험완료</FilterTab>
          </FilterTabs>
        </FilterContainer>
        <ExperimentList experiment={filteredExperiments} />
      </InnerContainer>
    </Container>
  )
};

export default StockRecordSheet;
