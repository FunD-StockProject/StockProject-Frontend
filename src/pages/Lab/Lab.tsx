import { useState } from 'react';
import {
  Container,
  TabContainer,
  GuideBox,
  GuideTitle,
  GuideText,
  GuideButton,
  SummarySection,
  SummaryTitle,
  SummaryCardContainer,
  SummaryCard,
  SummaryLabel,
  SummaryValue,
  StatusSection,
  StatusMessage,
  MessageLink,
  Tab,
  AddStockButtonWrapper,
  AddStockButton,
} from './Lab.Style';
import { useNavigate } from 'react-router-dom';
import { webPath } from '@router/index';
import SamsungLogoSVGURL from '@assets/sangsung.svg?url';
import AddStockSVG from '@assets/icons/addStock.svg?react';
import { ExperimentItem } from '@ts/Interfaces';
import ExperimentList from '@components/Lab/StockRecordSheet/ExperimentList/ExpermentList';
import { StatusTitle } from '@components/Lab/Common.Style';

const mocksummaryMetrics = [
  { label: '총 실험 수', value: 12 },
  { label: '성공률', value: 62.5 },
  { label: '평균 수익률', value: 1.26 }
];

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


const Lab = () => {
  const navigate = useNavigate();
  const isFirstTime = false;
  const [selectedTab, setSelectedTab] = useState<'현황' | '결과'>('현황');

  const handleIntroClick = () => {
    navigate(webPath.labIntro());
  };
  return (
    <Container>
      <TabContainer>
        <div onClick={() => setSelectedTab('현황')}>
          <Tab selected={selectedTab === '현황'}>매수현황</Tab>
        </div>
        <div onClick={() => setSelectedTab('결과')}>
          <Tab selected={selectedTab === '결과'}>매수결과</Tab>
        </div>
      </TabContainer>

      {selectedTab === '현황' ? (
        <>
          {isFirstTime ? (
            <>
              <GuideBox>
                <GuideTitle>실험실이 처음이신가요?</GuideTitle>
                <GuideText>
                  평소 눈여겨 본 종목이 있다면, 모의매수를 <br />통해 시장 타이밍을 잡아보세요!
                </GuideText>
                <GuideButton onClick={handleIntroClick}>모의매수 시작 &gt;</GuideButton>
              </GuideBox>

              <SummarySection>
                <SummaryTitle>모의 매수 현황</SummaryTitle>
                <SummaryCardContainer>
                  {mocksummaryMetrics.map((item, idx) => (
                    <SummaryCard key={idx}>
                      <SummaryLabel>{item.label}</SummaryLabel>
                      <SummaryValue>{item.value}</SummaryValue>
                    </SummaryCard>
                  ))}
                </SummaryCardContainer>
              </SummarySection>

              <StatusSection>
                <StatusTitle>
                  진행중인 실험
                </StatusTitle>
                <StatusMessage>
                  아직 진행중인 실험이 없어요 😢<br />
                  <MessageLink onClick={handleIntroClick}>궁금한 종목 모의매수 하러가기 &gt;</MessageLink>
                </StatusMessage>
              </StatusSection>
            </>
          ) : (
            <>
              <SummarySection>
                <SummaryTitle>모의 매수 현황</SummaryTitle>
                <SummaryCardContainer>
                  <SummaryCard onClick={() => navigate(webPath.labStockRecordSheet())}>
                    <SummaryLabel>{mocksummaryMetrics[0].label}</SummaryLabel>
                    <SummaryValue>{mocksummaryMetrics[0].value}회</SummaryValue>
                  </SummaryCard>
                  <SummaryCard>
                    <SummaryLabel>{mocksummaryMetrics[1].label}</SummaryLabel>
                    <SummaryValue>{mocksummaryMetrics[1].value}%</SummaryValue>
                  </SummaryCard>
                  <SummaryCard>
                    <SummaryLabel>{mocksummaryMetrics[2].label}</SummaryLabel>
                    <SummaryValue>{mocksummaryMetrics[2].value}%</SummaryValue>
                  </SummaryCard>
                </SummaryCardContainer>
              </SummarySection>

              <StatusSection>
                <StatusTitle>
                  진행중인 실험 {mockExperiments.length} 회
                </StatusTitle>
                <ExperimentList experiment={mockExperiments} />
                <AddStockButtonWrapper>
                  <AddStockButton onClick={handleIntroClick}>
                    <AddStockSVG />
                  </AddStockButton>
                </AddStockButtonWrapper>
              </StatusSection>
            </>
          )}
        </>
      ) : <div>매수 결과</div>}
    </Container>
  );
};

export default Lab;
