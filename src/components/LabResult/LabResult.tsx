
import ScoreTable from './ScoreTable/ScoreTable';
import HumanIndexSection from './HumanIndexSection/HumanIndexSection';
import InvestmentPatternSection from './InvestmentPatternSection/InvestmentPatternSection';
import HistorySection from './HistorySection/HistorySection';
import ExperimentSummary from './ExperimentSummary/ExperimentSummary';
import HumanTypeBottomSheet from './BottomSheet/HumanTypeBottomSheet';
import QuadrantBottomSheet from './BottomSheet/QuadrantBottomSheet';
import { useState } from 'react';
import {
  Container,
  Description,
  Title,
  Highlight,
  EmptyStateContainer,
  EmptyStateTitle,
  EmptyStateSubtitle,
  EmptyStateDescription,
  StartButton,
  GlowEffect
} from './LabResult.Style';
import { useNavigate } from 'react-router-dom';
import { webPath } from '@router/index';

const LabResult = () => {
  const [showHumanTypeSheet, setShowHumanTypeSheet] = useState(false);
  const [showQuadrantSheet, setShowQuadrantSheet] = useState(false);
  const navigate = useNavigate();

  // 실험 상태 체크 (실제로는 API에서 가져올 데이터)
  const hasOngoingExperiments = true; // 진행중인 실험이 있는지
  const hasCompletedExperiments = true; // 완료된 실험이 있는지
  const daysUntilCompletion = 1; // 실험 완료까지 남은 일수

  const handleStartMockPurchase = () => {
    navigate(webPath.labIntro());
  };

  // 진행중인 실험이 없을 때
  if (!hasOngoingExperiments && !hasCompletedExperiments) {
    return (
      <Container>
        <EmptyStateContainer>
          <EmptyStateTitle>
            진행중인 실험이 없어요😊
          </EmptyStateTitle>
          <EmptyStateSubtitle>
            지금 바로 나만의 포트폴리오를 만들어볼까요?
          </EmptyStateSubtitle>
          <StartButton onClick={handleStartMockPurchase}>
            모의매수 시작하기
          </StartButton>
        </EmptyStateContainer>
      </Container>
    );
  }

  // 진행중인 실험이 있지만 완료된 실험이 없을 때
  if (hasOngoingExperiments && !hasCompletedExperiments) {
    return (
      <Container>
        <EmptyStateContainer>
          <EmptyStateTitle>
            아직 완성된 실험이 없어요
          </EmptyStateTitle>
          <EmptyStateSubtitle>
            실험 완료까지 D-{daysUntilCompletion}남았어요!
          </EmptyStateSubtitle>
          <EmptyStateDescription>
            조금만 기다려주세요
          </EmptyStateDescription>
          <GlowEffect />
        </EmptyStateContainer>
      </Container>
    );
  }

  // 완료된 실험이 있을 때 (기존 결과 화면)
  const scoreTableData = [
    { range: '60점 이하', avg: '-2.3%', median: '-1.8%' },
    { range: '60-70점', avg: '1.2%', median: '0.9%' },
    { range: '70-80점', avg: '3.8%', median: '3.2%' },
    { range: '80점 이상', avg: '2.1%', median: '1.7%' }
  ];

  const humanIndexData = {
    userScore: 2,
    userType: '인간 아님',
    successRate: '0~20%',
    maintainRate: '15%',
    purchasedCount: 10,
    profitCount: 2
  };

  const investmentPatternData = {
    patternType: '가치 선점형',
    patternDescription: `점수가 낮을 때 매수하여, 수익을 보는 투자 패턴\n= 남들이 관심 없을 때 진입을 해두는 경우가 많아요! 매수하는 패턴을 보입니다.`
  };

  const historyData = [
    { x: -10, y: 15, label: '0418' },
    { x: -20, y: 22, label: '0420' },
    { x: 10, y: -15, label: '0419' },
    { x: 30, y: 18, label: '0421' },
    { x: 25, y: -10, label: '0422' }
  ];

  const experimentSummaryData = {
    totalExperiments: 4,
    highestProfit: {
      score: 78,
      range: '78점 구간'
    },
    lowestProfit: {
      score: 80,
      range: '80점 이상 구간'
    }
  };

  return (
    <Container>
      <Title>실험 결과</Title>
      <Description>
        다음 매수 때는, <Highlight>✨70~80점 구간</Highlight>에 주목해보세요!
      </Description>
      <ScoreTable data={scoreTableData} />
      <ExperimentSummary {...experimentSummaryData} />
      <HumanIndexSection
        userScore={humanIndexData.userScore}
        userType={humanIndexData.userType}
        userNickName="김철수"
        successRate={humanIndexData.successRate}
        maintainRate={humanIndexData.maintainRate}
        purchasedCount={humanIndexData.purchasedCount}
        profitCount={humanIndexData.profitCount}
        onShowTypes={() => setShowHumanTypeSheet(true)}
      />

      <InvestmentPatternSection
        patternType={investmentPatternData.patternType}
      />

      <HistorySection
        data={historyData}
        patternType={investmentPatternData.patternType}
        patternDescription={investmentPatternData.patternDescription}
        onShowQuadrant={() => setShowQuadrantSheet(true)}
      />

      <HumanTypeBottomSheet
        isOpen={showHumanTypeSheet}
        onClose={() => setShowHumanTypeSheet(false)}
      />

      <QuadrantBottomSheet
        isOpen={showQuadrantSheet}
        onClose={() => setShowQuadrantSheet(false)}
      />
    </Container>
  );
};

export default LabResult; 