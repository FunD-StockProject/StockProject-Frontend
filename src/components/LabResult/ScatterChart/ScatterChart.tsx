import { ChartContainer } from './ScatterChart.Style';
import { theme } from '@styles/themes';
import { ReactElement, useMemo } from 'react';

interface ScatterDataPoint {
  x: number; // 인간지표
  y: number; // 수익률
  label: string; // 날짜
}

interface ScatterChartProps {
  data: ScatterDataPoint[];
  patternType?: string;
}

function ScatterChart({ data, patternType }: ScatterChartProps): ReactElement {
  const width = 350;
  const height = 250;
  const margin = { top: 50, right: 0, bottom: 0, left: 0 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const xScale = (x: number) => margin.left + ((x + 50) / 100) * innerWidth;
  const yScale = (y: number) => margin.top + ((50 - y) / 100) * innerHeight;

  // patternType에 따른 하이라이트 사분면 결정
  const getHighlightQuadrant = (patternType?: string) => {
    switch (patternType) {
      case '가치 선점형':
        return 'top-left';
      case '트렌드 선점형':
        return 'top-right';
      case '역행 투자형':
        return 'bottom-left';
      case '후행 추종형':
        return 'bottom-right';
      default:
        return 'top-left'; // 기본값
    }
  };

  const highlightQuadrant = patternType && getHighlightQuadrant(patternType);

  const points = useMemo(() => {
    return data.map((point, i) => (
      <g key={i}>
        <circle
          cx={xScale(point.x)}
          cy={yScale(point.y)}
          r="4"
          fill={theme.colors.sub_blue6}
        />
        <text
          x={xScale(point.x) + 8}
          y={yScale(point.y) - 4}
          textAnchor="start"
          fill={theme.colors.sub_white}
          fontSize="12"
          fontWeight="500"
        >
          {point.label}
        </text>
      </g>
    ));
  }, [data]);

  const centerLines = (
    <>
      {/* 수직 화살표 (y축) */}
      <line
        x1={xScale(0)}
        y1={margin.top}
        x2={xScale(0)}
        y2={height - margin.bottom - 10}
        stroke={theme.colors.sub_gray7}
        strokeWidth="1"
      />
      <polygon
        points={`${xScale(0)},${margin.top} ${xScale(0) - 5},${margin.top + 10} ${xScale(0) + 5},${margin.top + 10}`}
        fill={theme.colors.sub_gray7}
      />

      {/* 수평 화살표 (x축) */}
      <line
        x1={margin.left}
        y1={yScale(0)}
        x2={width - margin.right}
        y2={yScale(0)}
        stroke={theme.colors.sub_gray7}
        strokeWidth="1"
      />
      <polygon
        points={`${width - margin.right},${yScale(0)} ${width - margin.right - 10},${yScale(0) - 5} ${width - margin.right - 10},${yScale(0) + 5}`}
        fill={theme.colors.sub_gray7}
      />
    </>
  );

  // 하이라이트 영역 동적 생성
  const highlightArea = useMemo(() => {
    let path = '';
    switch (highlightQuadrant) {
      case 'top-left':
        path = `M ${xScale(-50)} ${yScale(0) - 5} L ${xScale(0) - 5} ${yScale(0) - 5} L ${xScale(0) - 5} ${yScale(50) - 5} L ${xScale(-50)} ${yScale(50) - 5} Z`;
        break;
      case 'top-right':
        path = `M ${xScale(0) + 5} ${yScale(0) - 5} L ${xScale(50)} ${yScale(0) - 5} L ${xScale(50)} ${yScale(50) - 5} L ${xScale(0) + 5} ${yScale(50) - 5} Z`;
        break;
      case 'bottom-left':
        path = `M ${xScale(-50)} ${yScale(-50)} L ${xScale(0) - 5} ${yScale(-50)} L ${xScale(0) - 5} ${yScale(0) + 5} L ${xScale(-50)} ${yScale(0) + 5} Z`;
        break;
      case 'bottom-right':
        path = `M ${xScale(0) + 5} ${yScale(-50) + 5} L ${xScale(50)} ${yScale(-50) + 5} L ${xScale(50)} ${yScale(0) + 5} L ${xScale(0) + 5} ${yScale(0) + 5} Z`;
        break;
      default:
        return null;
    }

    return (
      <path
        d={path}
        fill={theme.colors.sub_blue6}
        fillOpacity={0.4}
        rx={40}
      />
    );
  }, [highlightQuadrant]);

  return (
    <ChartContainer>
      <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="xMidYMid meet">
        <rect x="0" y="0" width={width} height={height} fill="#1a1a1a" rx="12" />

        {highlightArea}
        {centerLines}
        {points}

        {/* y축 레이블 (12시 - 상단 중앙) */}
        <text
          x={width / 2}
          y={margin.top - 20}
          textAnchor="middle"
          fontSize="15"
          fill={theme.colors.sub_gray6}
          fontWeight="500"
        >
          수익률
        </text>

        {/* x축 레이블 (3시 - 오른쪽 중앙) */}
        <text
          x={width - margin.right - 10}
          y={height / 2 + 60}
          textAnchor="end"
          fill={theme.colors.sub_gray6}
          fontSize="15"
          fontWeight="500"
        >
          인간지표
        </text>

      </svg>
    </ChartContainer>
  );
}

export default ScatterChart;