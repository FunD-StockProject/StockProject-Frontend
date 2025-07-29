import HistorySection from "./HistorySection/HistorySection";
import HumanIndexSection from "./HumanIndexSection/HumanIndexSection";
import InvestmentPatternSection from "./InvestmentPatternSection/InvestmentPatternSection";
import { Container, Title, Description, Highlight, } from "./LabResult.Style";
import ScoreTable from "./ScoreTable/ScoreTable";
import ExperimentSummary from './ExperimentSummary/ExperimentSummary';
// import HumanTypeGuide from './HumanTypeGuide/HumanTypeGuide';


const LabResult = () => {
  // 샘플 데이터
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
    { x: -30, y: 15, label: '0418' },
    { x: -20, y: 12, label: '0420' },
    { x: -25, y: -8, label: '0419' },
    { x: 35, y: 18, label: '0421' },
    { x: 40, y: -10, label: '0422' }
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
      <ExperimentSummary
        totalExperiments={experimentSummaryData.totalExperiments}
        highestProfit={experimentSummaryData.highestProfit}
        lowestProfit={experimentSummaryData.lowestProfit}
      />
      <HumanIndexSection {...humanIndexData} userNickName="뚜루미" />
      {/* <HumanTypeGuide /> */}
      <InvestmentPatternSection {...investmentPatternData} />
      <HistorySection
        data={historyData}
        patternType={investmentPatternData.patternType}
        patternDescription={investmentPatternData.patternDescription}
      />

    </Container>
  );
};

export default LabResult; 