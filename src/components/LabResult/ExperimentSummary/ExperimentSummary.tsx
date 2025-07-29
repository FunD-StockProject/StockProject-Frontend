
import { SummaryItem, Emoji, SummaryText, Container, Title, ProfitText } from "./ExperimentSummary.Style";


interface ExperimentSummaryProps {
  totalExperiments: number;
  highestProfit: {
    score: number;
    range: string;
  };
  lowestProfit: {
    score: number;
    range: string;
  };
}

function ExperimentSummary({
  totalExperiments,
  highestProfit,
  lowestProfit
}: ExperimentSummaryProps) {
  return (
    <Container>
      <Title>이번주에 총 {totalExperiments}건의 실험을 진행하셨습니다.</Title>

      <SummaryItem>
        <Emoji>😊</Emoji>
        <SummaryText>
          <ProfitText>가장 높은 수익률</ProfitText> | {highestProfit.score}점 구간
        </SummaryText>
      </SummaryItem>

      <SummaryItem>
        <Emoji>😭</Emoji>
        <SummaryText>
          <ProfitText>가장 낮은 수익률</ProfitText> | {lowestProfit.score}점 이상 구간
        </SummaryText>
      </SummaryItem>
    </Container>
  );
}

export default ExperimentSummary; 