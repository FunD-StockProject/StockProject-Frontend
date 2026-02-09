import styled from '@emotion/styled';
import { useEffect, useMemo, useRef, useState } from 'react';
import { getDiffText } from '@utils/Number';
import { deltaToColor } from '@utils/ScoreConvert';
import { PortfolioResultPatternHistory } from '@controllers/experiment/api';
import { theme } from '@styles/themes';
import SpeechBubbleSVG from '@assets/design/speechBubble.svg?react';
import AimSVG from '@assets/icons/aim.svg?react';
import { ReportPatternChartTutorialQuadrant } from './ReportPatternChart.Style';
import { PatternQuadrantKey, patternQuadrantList } from './ReportPatternChart.Type';

const ChartCanvas = styled.canvas({
  position: 'absolute',
  top: '0',
  left: '0',
  width: '100%',
  height: '100%',
  bottom: '0',
  right: '0',
  borderRadius: '4px',
});

const ChartAxisLabelContainer = styled.div({
  position: 'absolute',
  left: '4px',
  top: '4px',
  right: '4px',
  bottom: '4px',
});

const ChartAxisLabel = styled.div(
  ({ position }: { position: 'top' | 'bottom' | 'left' | 'right' }) => ({
    left: position === 'left' ? '0' : position === 'right' ? 'auto' : '50%',
    top: position === 'top' ? '0' : position === 'bottom' ? 'auto' : '50%',
    right: position === 'right' ? '0' : position === 'left' ? 'auto' : '50%',
    bottom: position === 'bottom' ? '0' : position === 'top' ? 'auto' : '50%',

    ['>p']: {
      rotate: position === 'left' ? '-90deg' : position === 'right' ? '90deg' : '0deg',
      transform: `translateY(${position === 'top' ? '50%' : position === 'bottom' ? '-50%' : '0'}) translateY(${position === 'left' || position === 'right' ? '50%' : '0'})`,
    },
  }),
  {
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    ['>p']: {
      ...theme.font.detail10Medium,
      color: theme.colors.sub_gray7,
      position: 'absolute',
      margin: '0',
      whiteSpace: 'nowrap',
    },
  },
);

const ChartInduceContainer = styled.div({
  position: 'absolute',
  right: '0',
  bottom: '0',
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  background: theme.colors.sub_black,
  padding: '2px 8px',
  borderRadius: '10px',
  margin: '8px',

  ['>p']: {
    ...theme.font.detail10Medium,
    color: theme.colors.sub_gray9,
    margin: '0',
  },

  ['>svg']: {
    width: '10px',
    height: 'auto',
    aspectRatio: '1 / 1',
    fill: theme.colors.sub_gray9,
  },
});

const ChartSelectedItemContainer = styled.div(
  ({ pos }: { pos: { x: number; y: number } }) => ({
    bottom: pos.y,
    left: pos.x,
  }),
  {
    position: 'absolute',
    zIndex: '2',
  },
);

const ChartSelectedItemContent = styled.div(
  ({ delta }: { delta: number }) => ({
    ['p.roi']: {
      color: deltaToColor(delta) ?? theme.colors.sub_gray4,
    },
  }),
  {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',

    width: '112px',

    padding: '6px 12px',
    boxSizing: 'border-box',
    borderRadius: '5px',

    transform: 'translateX(-50%)',
    bottom: '24px',

    ['p']: {
      margin: '0',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },

    ['>p']: {
      ...theme.font.detail12Semibold,
      color: theme.colors.sub_gray4,
    },

    ['>div']: {
      display: 'flex',
      flexDirection: 'column',

      ['>div']: {
        display: 'flex',
        justifyContent: 'space-between',

        ['>p']: {
          ['&.name']: {
            color: theme.colors.sub_gray7,
          },

          ['&.value']: {
            color: theme.colors.sub_gray4,
          },
        },
      },
      ['p']: {
        ...theme.font.detail10Medium,
      },
    },

    ['>svg']: {
      position: 'absolute',
      top: '0',
      left: '0',
      zIndex: '-1',
    },
  },
);

const ChartDotsContainer = styled.div({
  position: 'absolute',
  top: '0',
  left: '0',
  width: '100%',
  height: '100%',
});

const ChartDot = styled.div(
  ({
    pos,
    delta,
    selected,
    isOpaque,
  }: {
    pos: { x: number; y: number };
    delta: number;
    selected: boolean;
    isOpaque: boolean;
  }) => ({
    left: pos.x,
    bottom: pos.y,
    opacity: isOpaque ? '0.5' : '1',

    ['>span']: {
      background: deltaToColor(delta) ?? theme.colors.sub_gray4,
      width: selected ? '16px' : '10px',
      border: selected ? `1px solid ${theme.colors.sub_white}` : 'none',
      boxShadow: selected ? `0 0 0 4px ${theme.colors.sub_white}33` : 'none',
    },
  }),
  {
    position: 'absolute',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'opacity 0.1s ease-in-out',

    ['>span']: {
      borderRadius: '50%',
      position: 'absolute',
      height: 'auto',
      aspectRatio: '1 / 1',
      transition: 'width 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
      zIndex: '1',
    },

    ['>p']: {
      ...theme.font.detail12Medium,
      color: theme.colors.sub_gray6,
      position: 'absolute',
      whiteSpace: 'nowrap',
      left: '50%',
      transform: 'translateX(-50%)',
      top: '8px',
      margin: '0',
      maxWidth: '64px',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      textAlign: 'center',
      zIndex: '0',
      userSelect: 'none',
    },
  },
);

const ReportPatternChart = ({
  type = 'value-preemptive',
  history,
  isTutorial = false,
}: {
  type?: PatternQuadrantKey;
  history?: PortfolioResultPatternHistory[];
  isTutorial?: boolean;
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvasSize, setCanvasSize] = useState<{ width: number; height: number }>({ width: 0, height: 0 });

  const historyItems = useMemo(() => {
    if (!history?.length) return [];

    const { width, height } = canvasSize;

    let minRoi = Infinity,
      maxRoi = -Infinity,
      minScore = Infinity,
      maxScore = -Infinity;

    history.forEach((e) => {
      if (e.roi <= 0 && e.roi < minRoi) minRoi = e.roi;
      if (e.roi >= 0 && e.roi > maxRoi) maxRoi = e.roi;
      if (e.score <= 50 && e.score < minScore) minScore = e.score;
      if (e.score >= 50 && e.score > maxScore) maxScore = e.score;
    });

    const yieldScale = height / 2 - 36;
    const scoreScale = width / 2 - 36;

    return history.map((e, idx) => ({
      ...e,
      pos: {
        x:
          e.score < 50
            ? -((e.score - 50) / (minScore - 50)) * scoreScale + width / 2
            : ((e.score - 50) / (maxScore - 50)) * scoreScale + width / 2,
        y: e.roi < 0 ? -(e.roi / minRoi) * yieldScale + height / 2 : (e.roi / maxRoi) * yieldScale + height / 2,
      },
      idx,
    }));
  }, [history, canvasSize]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const { width, height } = canvasSize;
    const DPR = window.devicePixelRatio;
    canvas.width = width * DPR;
    canvas.height = height * DPR;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);

    ctx.fillStyle = theme.colors.sub_blue10;

    const x = type === 'trend-preemptive' || type === 'lagging-follower' ? width / 2 : 0;
    const y = type === 'reverse-investor' || type === 'lagging-follower' ? height / 2 : 0;
    ctx.fillRect(x, y, width / 2, height / 2);
    ctx.strokeStyle = theme.colors.sub_gray10;
    ctx.lineWidth = 1;

    ctx.beginPath();
    ctx.moveTo(width / 2, 20);
    ctx.lineTo(width / 2, height - 20);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(20, height / 2);
    ctx.lineTo(width - 20, height / 2);
    ctx.stroke();
  }, [canvasRef, canvasSize]);

  const [selectedItem, setSelectedItem] = useState<{
    date: string;
    score: number;
    roi: number;
    stockId: number;
    stockName: string;
    duplicateName: boolean;
    pos: {
      x: number;
      y: number;
    };
    idx: number;
  }>();

  useEffect(() => {
    const container = canvasRef.current;
    if (!container) return;

    const resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;

      const { width, height } = entry.contentRect;
      setCanvasSize({ width, height });
    });

    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  const axisLabels: { text: string; position: 'top' | 'bottom' | 'left' | 'right' }[] = [
    {
      text: '수익률 High',
      position: 'top',
    },
    {
      text: '수익률 Low',
      position: 'bottom',
    },
    {
      text: '인간지표 Low',
      position: 'left',
    },
    {
      text: '인간지표 High',
      position: 'right',
    },
  ];

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: 'auto',
        aspectRatio: '3 / 2',
        background: theme.colors.sub_gray11,
        borderRadius: '4px',
      }}
    >
      <ChartCanvas ref={canvasRef} />
      <ChartAxisLabelContainer>
        {axisLabels.map((e) => (
          <ChartAxisLabel key={`REPORT_PATTERN_CHART_AXIS_LABEL_${e.position}`} position={e.position}>
            <p>{e.text}</p>
          </ChartAxisLabel>
        ))}
      </ChartAxisLabelContainer>
      {!isTutorial ? (
        <>
          <ChartDotsContainer>
            {historyItems.map((e, idx) => (
              <ChartDot
                key={`REPORT_PATTERN_CHART_ITEM_${idx}`}
                pos={e.pos}
                selected={selectedItem?.idx === e.idx}
                isOpaque={!!selectedItem && selectedItem?.idx !== e.idx}
                delta={e.roi}
              >
                <span
                  onClick={() => {
                    setSelectedItem((prev) => (prev?.idx === e.idx ? undefined : e));
                  }}
                />
                <p>{e.stockName}</p>
              </ChartDot>
            ))}
          </ChartDotsContainer>
          {selectedItem && (
            <ChartSelectedItemContainer pos={selectedItem.pos}>
              <ChartSelectedItemContent delta={selectedItem.roi}>
                <SpeechBubbleSVG />
                <p>{selectedItem.stockName}</p>
                <div>
                  <div>
                    <p className="name">수익률</p>
                    <p className="roi">{getDiffText({ percentDiff: selectedItem.roi, option: { percentFixed: 1 } })}</p>
                  </div>
                  <div>
                    <p className="name">인간지표</p>
                    <p className="value">{selectedItem.score}점</p>
                  </div>
                  <div>
                    <p className="name">매수일</p>
                    <p className="value">XX.{selectedItem.date}</p>
                  </div>
                </div>
              </ChartSelectedItemContent>
            </ChartSelectedItemContainer>
          )}
          <ChartInduceContainer>
            <AimSVG />
            <p>점을 터치해보세요</p>
          </ChartInduceContainer>
        </>
      ) : (
        <ReportPatternChartTutorialQuadrant>
          {patternQuadrantList.map((e) => (
            <div key={`REPORT_PATTERN_TUTORIAL_QUADRANT_${e.key}`} className={e.key}>
              <div>
                <p className="title">
                  {e.emoji} {e.title}
                </p>
                <p className="description">{e.score}</p>
              </div>
              <span>→ {e.roi}</span>
            </div>
          ))}
        </ReportPatternChartTutorialQuadrant>
      )}
    </div>
  );
};

export default ReportPatternChart;
