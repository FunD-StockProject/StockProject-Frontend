import { ExperimentItem } from "@ts/Interfaces";
import { CompanyLogo, CompanyName } from "./ExpeimentList.Style";
import { BottomSheetOverlay, BottomSheetContainer, BottomSheetContent, HeaderSection, SummarySection, SummaryTable, SummaryRow, SummaryCell, SummaryLabel, SummaryValue, GraphSection, GraphContainer, CloseButton } from "./ExperimentDetailBottomSheet.Style";
import { useMemo } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, ReferenceLine } from 'recharts';
import { theme } from "@styles/themes";

interface ExperimentDetailBottomSheetProps {
  experiment: ExperimentItem | null;
  isOpen: boolean;
  onClose: () => void;
}

const ExperimentDetailBottomSheet = ({ experiment, isOpen, onClose }: ExperimentDetailBottomSheetProps) => {
  if (!experiment || !isOpen) return null;

  const scoreDiff = experiment.currentScore - experiment.buyScore;
  const scoreDiffPercent = ((scoreDiff / experiment.buyScore) * 100).toFixed(1);
  const priceDiff = experiment.currentPrice - experiment.buyPrice;
  const priceDiffPercent = ((priceDiff / experiment.buyPrice) * 100).toFixed(1);

  // 그래프 데이터 생성
  const graphData = useMemo(() => {
    const baseScore = experiment.buyScore;
    const currentScore = experiment.currentScore;
    const isExperimenting = experiment.autoSellIn > 0;

    // 실험 진행 상태에 따라 데이터 생성
    if (isExperimenting) {
      // 실험 중일 때 - D-5, D-4, D-3만 데이터 있음, D-2, D-1은 비어있음
      return [
        { day: 'D-5', score: baseScore, price: experiment.buyPrice, isCurrent: false },
        { day: 'D-4', score: Math.round((baseScore + currentScore) / 2), price: Math.round((experiment.buyPrice + experiment.currentPrice) / 2), isCurrent: false },
        { day: 'D-3', score: currentScore, price: experiment.currentPrice, isCurrent: true },
        { day: 'D-2', score: null, price: null, isCurrent: false },
        { day: 'D-1', score: null, price: null, isCurrent: false }
      ] as Array<{ day: string, score: number | null, price: number | null, isCurrent: boolean }>;
    } else {
      // 실험 완료일 때 - 전체 5일 데이터
      return [
        { day: 'D-5', score: baseScore - 2, price: experiment.buyPrice * 0.98, isCurrent: false },
        { day: 'D-4', score: baseScore - 1, price: experiment.buyPrice * 0.99, isCurrent: false },
        { day: 'D-3', score: baseScore + 1, price: experiment.buyPrice * 1.01, isCurrent: false },
        { day: 'D-2', score: baseScore + 0.5, price: experiment.buyPrice * 1.005, isCurrent: false },
        { day: 'D-1', score: currentScore, price: experiment.currentPrice, isCurrent: true }
      ] as Array<{ day: string, score: number | null, price: number | null, isCurrent: boolean }>;
    }
  }, [experiment]);



  return (
    <BottomSheetOverlay onClick={onClose}>
      <BottomSheetContainer onClick={(e) => e.stopPropagation()}>
        <BottomSheetContent>
          {/* Header Section */}
          <HeaderSection>
            <CompanyLogo src={experiment.logo} alt="logo" />
            <CompanyName>{experiment.name}</CompanyName>
          </HeaderSection>

          {/* Summary Section */}
          <SummarySection>
            <SummaryTable>
              <SummaryRow>
                <SummaryCell>
                  <SummaryLabel>매수일/상태</SummaryLabel>
                  <SummaryValue>{experiment.buyDate}</SummaryValue>
                  <SummaryValue>{experiment.autoSellIn > 0 ? '실험중' : '실험완료'}</SummaryValue>
                </SummaryCell>
                <SummaryCell>
                  <SummaryLabel>매수시점</SummaryLabel>
                  <SummaryValue>{experiment.buyScore}점</SummaryValue>
                  <SummaryValue>{experiment.buyPrice.toLocaleString()}원</SummaryValue>
                </SummaryCell>
                <SummaryCell>
                  <SummaryLabel>현재시점</SummaryLabel>
                  <SummaryValue>{experiment.currentScore}점</SummaryValue>
                  <SummaryValue>{experiment.currentPrice.toLocaleString()}원</SummaryValue>
                </SummaryCell>
                <SummaryCell>
                  <SummaryLabel>수익률</SummaryLabel>
                  <SummaryValue style={{ color: scoreDiff >= 0 ? '#FF6B6B' : '#4A90E2' }}>
                    {scoreDiff >= 0 ? '+' : ''}{scoreDiffPercent}%
                  </SummaryValue>
                </SummaryCell>
              </SummaryRow>
            </SummaryTable>
          </SummarySection>

          {/* Graph Section */}
          <GraphSection>
            <GraphContainer>
              <div style={{
                width: '100%',
                height: '200px',
                background: 'rgba(255,255,255,0.05)',
                borderRadius: '8px',
                padding: '10px',
                boxSizing: 'border-box',
                position: 'relative'
              }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={graphData} margin={{ top: 5, right: 40, left: 40, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis
                      dataKey="day"
                      stroke="rgba(255,255,255,0.6)"
                      fontSize={12}
                    />
                    <YAxis
                      stroke="transparent"
                      fontSize={0}
                      domain={['dataMin - 5', 'dataMax + 5']}
                      hide={true}
                    />
                    <Line
                      type="monotone"
                      dataKey="score"
                      stroke={theme.colors.sub_blue6}
                      strokeWidth={2}
                      dot={{ fill: '#4A90E2', strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6, stroke: theme.colors.sub_blue6, strokeWidth: 3, fill: theme.colors.sub_blue6 }}
                      connectNulls={false}
                    />
                    {/* 현재 포인트 강조 */}
                    {graphData.find(d => d.isCurrent) && (
                      <ReferenceLine
                        x={graphData.find(d => d.isCurrent)?.day}
                        stroke={theme.colors.sub_blue6}
                        strokeDasharray="3 3"
                        strokeWidth={1}
                      />
                    )}
                  </LineChart>
                </ResponsiveContainer>

                {/* 고정된 툴팁 */}
                {graphData.find(d => d.isCurrent) && (
                  <div style={{
                    position: 'absolute',
                    top: '100px',
                    left: experiment.autoSellIn === 0 ? '80%' : '60%', // 실험 완료시 D-1(80%), 실험중일 때 D-3(60%)
                    transform: 'translateX(-50%)',
                    background: 'rgba(255,255,255,0.12)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '400px',
                    padding: '8px 12px',
                    color: 'white',
                    fontSize: '10px',
                    minWidth: '120px',
                    backdropFilter: 'blur(10px)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                    zIndex: 1000
                  }}>
                    <div style={{ marginBottom: '2px' }}>
                      <span style={{ color: 'rgba(255,255,255,0.8)' }}>인간지표 | </span>
                      <span style={{ color: 'white' }}>{experiment.currentScore}점</span>
                      <span style={{ color: scoreDiff >= 0 ? '#FF6B6B' : '#4A90E2' }}>
                        {' '}({scoreDiff >= 0 ? '+' : ''}{scoreDiff}점)
                      </span>
                    </div>
                    <div style={{ marginBottom: '2px' }}>
                      <span style={{ color: 'rgba(255,255,255,0.8)' }}>수익률 | </span>
                      <span style={{ color: 'white' }}>{priceDiffPercent}%</span>
                      <span style={{ color: parseFloat(priceDiffPercent) >= 0 ? '#FF6B6B' : '#4A90E2' }}>
                        {' '}({parseFloat(priceDiffPercent) >= 0 ? '+' : ''}{priceDiffPercent}%)
                      </span>
                    </div>
                    <div style={{
                      fontSize: '8px',
                      color: 'rgba(255,255,255,0.6)',
                      marginTop: '2px',
                      fontStyle: 'italic'
                    }}>
                      *()는 매수시점 대비
                    </div>
                  </div>
                )}
              </div>
            </GraphContainer>
          </GraphSection>

          {/* Close Button */}
          <CloseButton onClick={onClose}>
            닫기
          </CloseButton>
        </BottomSheetContent>
      </BottomSheetContainer>
    </BottomSheetOverlay>
  );
};

export default ExperimentDetailBottomSheet; 