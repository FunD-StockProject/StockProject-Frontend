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
  Highlight,
  StatusMessage,
  MessageLink,
  Tab
} from './Lab.Style';
import { useNavigate } from 'react-router-dom';
import { webPath } from '@router/index';

const mocksummaryMetrics = [
  { label: '총 실험 수', value: '0회' },
  { label: '성공률', value: '0%' },
  { label: '평균 수익률', value: '0%' }
];

const Lab = () => {
  const navigate = useNavigate();
  const isFirstTime = true;
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
          {isFirstTime && (
            <GuideBox>
              <GuideTitle>실험실이 처음이신가요?</GuideTitle>
              <GuideText>
                평소 눈여겨 본 종목이 있다면, 모의매수를 <br />통해 시장 타이밍을 잡아보세요!
              </GuideText>
              <GuideButton onClick={handleIntroClick}>모의매수 시작 &gt;</GuideButton>
            </GuideBox>
          )}

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
              진행중인 실험 <Highlight>0</Highlight>
            </StatusTitle>
            {isFirstTime ? (
              <>
                <StatusMessage>
                  아직 진행중인 실험이 없어요 😢<br />
                  <MessageLink onClick={handleIntroClick}>궁금한 종목 모의매수 하러가기 &gt;</MessageLink>
                </StatusMessage>
              </>
            ) : (
              <div>진행 중인 실험...</div>
            )
            }
          </StatusSection>
        </>
      ) : <div>매수 결과</div>}
    </Container>
  );
};

export default Lab;
