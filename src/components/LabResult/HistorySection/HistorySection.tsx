

import ScatterChart from '../ScatterChart/ScatterChart';
import { SectionContainer, Title, PatternTitle, PatternDescription, QuadrantButton } from './HistorySection.Style';
import QuestionMarkSVG from '@assets/icons/questionMark.svg?react';
import { HUMAN_TYPE_LIST } from '@constants/patternTypes';
interface HistoryDataPoint {
  x: number; // 인간지표
  y: number; // 수익률
  label: string; // 날짜
}

interface HistorySectionProps {
  data: HistoryDataPoint[];
  patternType: string;
  patternDescription: string;
  onShowQuadrant?: () => void;
}

function HistorySection({
  data,
  patternType,
  patternDescription,
  onShowQuadrant
}: HistorySectionProps) {
  const humanType = HUMAN_TYPE_LIST.find(item => item.type === patternType);

  return (
    <SectionContainer>
      <Title>
        <QuadrantButton onClick={onShowQuadrant}>
          <QuestionMarkSVG /> 각 사분면은 무슨 패턴이에요?
        </QuadrantButton>
      </Title>
      <ScatterChart data={data} patternType={patternType} />
      <PatternTitle>◆ {patternType}이란?</PatternTitle>
      <PatternDescription>
        {humanType?.emoji} {patternDescription}
      </PatternDescription>
    </SectionContainer>
  );
}

export default HistorySection; 