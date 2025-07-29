import { getTypeEmoji } from '@utils/humanIndexUtils';
import { ChartContainer, TooltipContainer } from './BellCurveChart.Style';
import { theme } from '@styles/themes';
import { ReactElement, useMemo } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  ResponsiveContainer,
  ReferenceLine,
  ReferenceDot,
} from 'recharts';

interface BellCurveChartProps {
  userScore: number;
  userType: string;
  successRate: string;
  maintainRate: string;
}

interface DataPoint {
  x: number;
  y: number;
}

function BellCurveChart({ userScore, userType, successRate, maintainRate }: BellCurveChartProps): ReactElement {
  // 정규분포 데이터 생성
  const data = useMemo(() => {
    const points: DataPoint[] = [];
    for (let x = 0; x <= 10; x += 0.1) {
      // 정규분포 공식: 평균=5, 표준편차=1.5
      const y = Math.exp(-Math.pow((x - 5) / 1.5, 2) / 2) / (1.5 * Math.sqrt(2 * Math.PI)) * 100;
      points.push({ x, y });
    }
    return points;
  }, []);

  // 사용자 점수에 해당하는 y값 계산
  const userYPosition = Math.exp(-Math.pow((userScore - 5) / 1.5, 2) / 2) / (1.5 * Math.sqrt(2 * Math.PI)) * 100;

  return (
    <ChartContainer>
      <TooltipContainer style={{ position: 'absolute', top: '30px', left: '0px', zIndex: 10 }}>
        <p>이는 <span style={{ color: 'red' }}>성공률이 {successRate}</span>이며,</p>
        <p>전체 유저 중 {maintainRate}가</p>
        <p><span style={{ color: 'red' }}> {getTypeEmoji(userType)}인간 아님  지표</span>에 해당됩니다.</p>
      </TooltipContainer>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart
          data={data}
          margin={{ top: 60, right: 0, left: 0, bottom: 20 }}
        >
          <defs>
            <linearGradient id="bellCurveGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={theme.colors.sub_blue6} stopOpacity={0.9} />
              <stop offset="50%" stopColor={theme.colors.sub_blue6} stopOpacity={0.6} />
              <stop offset="100%" stopColor={theme.colors.sub_blue6} stopOpacity={0.2} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="x"
            type="number"
            domain={[0, 10]}
            ticks={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
            tickFormatter={(value) => `${value}`}
            stroke="rgba(255,255,255,0.5)"
            tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12 }}
            allowDataOverflow={false}
          />
          <YAxis hide />
          <Area
            type="monotone"
            dataKey="y"
            stroke="none"
            fill="url(#bellCurveGradient)"
            isAnimationActive={false}
          />
          <ReferenceLine
            x={userScore}
            stroke={theme.colors.sub_blue6}
            strokeDasharray="3 3"
            strokeWidth={1}
          />
          <ReferenceDot
            x={userScore}
            y={userYPosition}
            r={4}
            fill={theme.colors.sub_blue6}
            stroke="#fff"
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}

export default BellCurveChart; 