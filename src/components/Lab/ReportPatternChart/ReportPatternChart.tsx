import { useEffect, useRef, useState } from 'react';
import { theme } from '@styles/themes';
import {
  ReportPatternChartAxisLabel,
  ReportPatternChartContainer,
  ReportPatternChartItem,
  ReportPatternChartQuadrant,
  ReportPatternChartTutorialQuadrant,
} from './ReportPatternChart.Style';
import { PatternQuadrantKey, patternQuadrantList } from './ReportPatternChart.Type';

const ReportPatternChart = ({
  reportPatternsQuadrant = 'top-right',
  reportPatternsCoordinates = [],
  isTutorial = false,
}: {
  reportPatternsQuadrant?: PatternQuadrantKey;
  reportPatternsCoordinates?: { dateLabel: string; x: number; y: number }[];
  isTutorial?: boolean;
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvasSize, setCanvasSize] = useState<{ width: number; height: number }>({ width: 0, height: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const { width, height } = canvas;
    ctx.clearRect(0, 0, width, height);

    ctx.fillStyle = theme.colors.sub_gray10;
    ctx.strokeStyle = theme.colors.sub_gray10;
    ctx.lineWidth = 2;

    const triangleSide = 12;
    const triangleHeight = (Math.sqrt(3) / 2) * triangleSide;

    ctx.beginPath();
    ctx.moveTo(width / 2, 0);
    ctx.lineTo(width / 2, height);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, height / 2);
    ctx.lineTo(width, height / 2);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(width, height / 2);
    ctx.lineTo(width - triangleHeight, height / 2 - triangleSide / 2);
    ctx.lineTo(width - triangleHeight, height / 2 + triangleSide / 2);
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(width / 2, 0);
    ctx.lineTo(width / 2 - triangleSide / 2, triangleHeight);
    ctx.lineTo(width / 2 + triangleSide / 2, triangleHeight);
    ctx.closePath();
    ctx.fill();
  }, [canvasRef, canvasSize]);

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

  return (
    <ReportPatternChartContainer>
      <ReportPatternChartAxisLabel className="roi" isTutorial={isTutorial}>
        수익률
      </ReportPatternChartAxisLabel>
      <div>
        <canvas ref={canvasRef} width={canvasSize.width} height={canvasSize.height} />
        {!isTutorial && <ReportPatternChartQuadrant quadrant={reportPatternsQuadrant} />}
        <ReportPatternChartAxisLabel className="index" isTutorial={isTutorial}>
          인간지표
        </ReportPatternChartAxisLabel>
        {isTutorial ? (
          <ReportPatternChartTutorialQuadrant>
            {patternQuadrantList.map((e) => (
              <div key={`REPORT_PATTERN_TUTORIAL_QUADRANT_${e.key}`} className={e.key.split('-').join(' ')}>
                <div>
                  <p className="title">{e.title}</p>
                  <p className="description">{e.description}</p>
                </div>
                <span>→ {e.roi}</span>
              </div>
            ))}
          </ReportPatternChartTutorialQuadrant>
        ) : (
          reportPatternsCoordinates.map((e) => (
            <ReportPatternChartItem
              key={`REPORT_PATTERN_ITEM_${e.dateLabel}`}
              x={e.x}
              y={e.y}
              quadrant={reportPatternsQuadrant}
            >
              <p>{e.dateLabel}</p>
              <span />
            </ReportPatternChartItem>
          ))
        )}
      </div>
    </ReportPatternChartContainer>
  );
};

export default ReportPatternChart;
