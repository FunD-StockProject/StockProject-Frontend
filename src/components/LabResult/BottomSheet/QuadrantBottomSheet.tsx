import BottomSheet from './BottomSheet';
import ScatterChart from '../ScatterChart/ScatterChart';
import { LegendContainer, LegendTitle, LegendGrid, LegendCell, QuadrantChart, } from './QuadrantBottomSheet.Style';

import { HUMAN_TYPE_LIST } from '@constants/patternTypes';

interface QuadrantBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

function QuadrantBottomSheet({ isOpen, onClose }: QuadrantBottomSheetProps) {
  return (
    <BottomSheet
      isOpen={isOpen}
      onClose={onClose}
      title="각 사분면은 무슨 패턴이에요?"
    >
      <div>
        <LegendContainer>
          <LegendTitle>성공/실패 기준</LegendTitle>
          <LegendGrid>
            <LegendCell color="#3B82F6">
              <div className="title-badge">수익률</div>
              <div className="content">
                <div>0점 위쪽 → 실험 성공 😊</div>
                <div>0점 아래쪽 → 실험 실패 😢</div>
              </div>
            </LegendCell>
            <LegendCell color="#EF4444">
              <div className="title-badge">인간지표</div>
              <div className="content">
                <div>50점 왼쪽 → 실험 성공 😊</div>
                <div>50점 오른쪽 → 실험 실패 😢</div>
              </div>
            </LegendCell>
          </LegendGrid>
        </LegendContainer>

        <QuadrantChart>
          <div style={{ position: 'relative' }}>
            {/* 실제 ScatterChart 추가 */}
            <div style={{ marginBottom: '20px' }}>
              <ScatterChart
                data={[]}
                patternType="" />
            </div>
            {/* 사분면 설명 추가 */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              pointerEvents: 'none',
              zIndex: 5
            }}>
              {/* Top-Left Quadrant */}
              <div style={{ position: 'absolute', top: '40px', left: '40px', maxWidth: '120px' }}>
                <div style={{ fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                  {HUMAN_TYPE_LIST[0].emoji} {HUMAN_TYPE_LIST[0].type}
                </div>
                <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: '11px', marginBottom: '8px', lineHeight: '1.3' }}>
                  : 인간지표 낮을 때 매수
                </div>
                <div style={{
                  background: '#8B4513',
                  color: 'white',
                  padding: '3px 6px',
                  borderRadius: '4px',
                  display: 'inline-block',
                  fontSize: '9px'
                }}>
                  → 수익
                </div>
              </div>

              {/* Top-Right Quadrant */}
              <div style={{ position: 'absolute', top: '40px', right: '50px', maxWidth: '120px' }}>
                <div style={{ fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                  {HUMAN_TYPE_LIST[1].emoji} {HUMAN_TYPE_LIST[1].type}
                </div>
                <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: '11px', marginBottom: '8px', lineHeight: '1.3' }}>
                  : 인간지표 높을 때 매수
                </div>
                <div style={{
                  background: '#8B4513',
                  color: 'white',
                  padding: '3px 6px',
                  borderRadius: '4px',
                  display: 'inline-block',
                  fontSize: '9px'
                }}>
                  → 수익
                </div>
              </div>

              {/* Bottom-Left Quadrant */}
              <div style={{ position: 'absolute', bottom: '30px', left: '40px', maxWidth: '120px' }}>
                <div style={{ fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                  {HUMAN_TYPE_LIST[2].emoji} {HUMAN_TYPE_LIST[2].type}
                </div>
                <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: '11px', marginBottom: '8px', lineHeight: '1.3' }}>
                  : 인간지표 낮을 때 매수
                </div>
                <div style={{
                  background: '#8B4513',
                  color: 'white',
                  padding: '3px 6px',
                  borderRadius: '4px',
                  display: 'inline-block',
                  fontSize: '9px'
                }}>
                  → 손실
                </div>
              </div>

              {/* Bottom-Right Quadrant */}
              <div style={{ position: 'absolute', bottom: '30px', right: '50px', maxWidth: '120px' }}>
                <div style={{ fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                  {HUMAN_TYPE_LIST[3].emoji} {HUMAN_TYPE_LIST[3].type}
                </div>
                <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: '11px', marginBottom: '8px', lineHeight: '1.3' }}>
                  : 인간지표 높을 때 매수
                </div>
                <div style={{
                  background: '#8B4513',
                  color: 'white',
                  padding: '3px 6px',
                  borderRadius: '4px',
                  display: 'inline-block',
                  fontSize: '9px'
                }}>
                  → 손실
                </div>
              </div>
            </div>
          </div>
        </QuadrantChart>
      </div >
    </BottomSheet >
  );
}

export default QuadrantBottomSheet; 