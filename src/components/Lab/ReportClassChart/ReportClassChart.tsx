import { useCallback, useEffect, useRef, useState } from 'react';
import { theme } from '@styles/themes';
import { Container, Content, IndexContainer, TooltipContainer, TooltipLine } from './ReportClassChart.Style';
import { ReportClassType } from './ReportClassChart.Type';

const ReportClassChart = ({
  reportClass,
  successRate,
  sameGradeUserRate,
}: {
  reportClass: ReportClassType;
  successRate: number;
  sameGradeUserRate: number;
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const [tooltipWidth, setTooltipWidth] = useState<number>(0);

  useEffect(() => {
    if (tooltipRef.current) {
      setTooltipWidth(tooltipRef.current.clientWidth);
    }
  }, [tooltipRef]);

  const fx = (x: number, mu: number, sigma: number) => {
    return Math.exp(-Math.pow((x - mu) / sigma, 2) / 2) / (sigma * Math.sqrt(2 * Math.PI));
  };

  const drawChart = useCallback(
    (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
      const { width, height } = canvas;

      ctx.clearRect(0, 0, width, height);
      ctx.lineWidth = 2;
      ctx.strokeStyle = theme.colors.sub_blue7;

      ctx.beginPath();
      for (let x = 0; x <= 100; x += 1) {
        const y = fx(x, 50, 20);
        const pos: [number, number] = [(x * width) / 100, (1 - y / 0.025) * height];
        ctx[x === 0 ? 'moveTo' : 'lineTo'](...pos);
      }
      ctx.stroke();

      ctx.lineTo(width, height);
      ctx.lineTo(0, height);

      ctx.closePath();

      const gradient = ctx.createLinearGradient(0, 0, 0, height);
      gradient.addColorStop(0, theme.colors.sub_blue5);
      gradient.addColorStop(1, `${theme.colors.sub_blue5}00`);
      ctx.fillStyle = gradient;

      ctx.fill();
    },
    [canvasRef],
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return;
    }

    drawChart(ctx, canvas);
  }, []);

  return (
    <Container>
      <Content>
        <canvas ref={canvasRef} />
        <TooltipLine successRate={successRate} />
        <TooltipContainer ref={tooltipRef} successRate={successRate} width={tooltipWidth}>
          <p className="title">
            성공률 <b>{reportClass.range}</b>
          </p>
          <p className="description">(전체 유저 중 {sameGradeUserRate.toFixed(1)}%)</p>
        </TooltipContainer>
      </Content>
      <IndexContainer className="index">
        {Array.from({ length: 11 }).map((_, idx) => (
          <span key={`REPORT_CLASS_CHART_INDEX_${idx}`}>{idx}</span>
        ))}
      </IndexContainer>
    </Container>
  );
};

export default ReportClassChart;
