

import ScatterChart from '../ScatterChart/ScatterChart';
import { SectionContainer, PatternTitle, PatternDescription } from './HistorySection.Style';
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
}

function HistorySection({
  data,
  patternType,
}: HistorySectionProps) {
  const humanType = HUMAN_TYPE_LIST.find(item => item.type === patternType);

  return (
    <>
      <ScatterChart data={data} />
      <SectionContainer>
        <PatternTitle>
          {humanType?.emoji} {humanType?.type}
        </PatternTitle>
        <PatternDescription>
          {humanType?.description} 이란?
        </PatternDescription>
      </SectionContainer>
    </>
  );
}

export default HistorySection; 