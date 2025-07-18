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
  StatusTitle,
  StatusMessage,
  MessageLink,
  Tab,
  ExperimentTable,
  ExperimentRow,
  ExperimentCell,
  ExperimentHeader,
  ExperimentLogo,
  PriceText,
  ExperimentText,
  AddStockButtonWrapper,
  AddStockButton,
  ExperimentHeaderCell,
} from './Lab.Style';
import { useNavigate } from 'react-router-dom';
import { webPath } from '@router/index';
import SamsungLogoSVGURL from '@assets/sangsung.svg?url';
import AddStockSVG from '@assets/icons/addStock.svg?react';
import { ExperimentItem } from '@ts/Interfaces';

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
  },
  {
    id: 2,
    name: 'Deloitte',
    logo: SamsungLogoSVGURL,
    buyPrice: 50000,
    buyScore: 50,
    currentPrice: 60000,
    currentScore: 60,
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
                  <SummaryCard>
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
                  진행중인 실험 {mockExperiments.length} 개
                </StatusTitle>
                <ExperimentTable>
                  <ExperimentHeader>
                    <ExperimentHeaderCell>매수일/상태</ExperimentHeaderCell>
                    <ExperimentHeaderCell style={{ flex: 2 }}>종목명</ExperimentHeaderCell>
                    <ExperimentHeaderCell>매수시점</ExperimentHeaderCell>
                    <ExperimentHeaderCell>현재시점</ExperimentHeaderCell>
                    <ExperimentHeaderCell>수익률</ExperimentHeaderCell>
                  </ExperimentHeader>
                  {mockExperiments.map((item) => {
                    const scoreDiff = item.currentScore - item.buyScore;
                    const scoreDiffPercent = ((scoreDiff / item.buyScore) * 100).toFixed(0);
                    return (
                      <ExperimentRow key={item.id}>
                        <ExperimentCell>
                          <div>25.05.06</div>
                          <PriceText>실험중 (D-2)</PriceText>
                        </ExperimentCell>
                        <ExperimentCell style={{ flexDirection: 'row', flex: 2 }}>
                          <ExperimentLogo src={item.logo} alt="logo" />
                          <ExperimentText>{item.name}</ExperimentText>
                        </ExperimentCell>
                        <ExperimentCell>
                          <div>{item.buyScore}점</div>
                          <PriceText>{item.buyPrice.toLocaleString()}</PriceText>
                        </ExperimentCell>
                        <ExperimentCell >
                          <div>{item.currentScore}점</div>
                          <PriceText>{item.currentPrice.toLocaleString()}</PriceText>
                        </ExperimentCell>
                        <ExperimentCell>
                          <div style={{ textAlign: 'center' }}>
                            {scoreDiff >= 0 ? '+' : ''}
                            {scoreDiff.toLocaleString()}점
                            <PriceText isPositive={scoreDiff >= 0}>
                              ({scoreDiffPercent}%)
                            </PriceText>
                          </div>
                        </ExperimentCell>
                      </ExperimentRow>
                    );
                  })}
                </ExperimentTable>
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
