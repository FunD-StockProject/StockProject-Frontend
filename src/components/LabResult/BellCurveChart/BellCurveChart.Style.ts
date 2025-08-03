import styled from '@emotion/styled';
import { theme } from '@styles/themes';

export const ChartContainer = styled.div`
  width: 100%;
  height: 300px;
  position: relative;
  margin-bottom: 10px;
`;

export const TooltipContainer = styled.div<{ left: number }>`
  ${theme.font.detail12Semibold}
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 403.43px;
  padding: 10px 16px;
  color: ${theme.colors.sub_white};
  backdrop-filter: blur(10px);
  position: absolute;
  z-index: 10;
  width: 110px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  left: ${({ left }) => `${left}px`};
  transform: translateX(-50%);
  
  p {
    margin: 0;
    opacity: 0.8;
    font-size: 10px;
  }
`;

export const TooltipBubble = styled.div<{ isVisible: boolean }>`
  font-size: 12px;
  position: absolute;
  top: 50px;
  background-color: ${theme.colors.sub_white};
  padding: 10px 19px;
  border-radius: 400px;
  color: ${theme.colors.sub_black};
  text-align: center;
  z-index: 20;
`;

export const QuestionButton = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 10;
  color: ${theme.colors.sub_gray5};
  font-size: 10px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
  text-decoration: underline;
`;

export const CutoffReferenceLine = styled.line`
  stroke: blue;
  stroke-width: 1;
  stroke-dasharray: 3 3;
`;

// 스타일 상수
export const userDotStyle = {
  fill: theme.colors.sub_blue7,
  stroke: theme.colors.sub_white,
  strokeWidth: 2,
  r: 6
};

export const userLineStyle = {
  stroke: theme.colors.sub_blue7,
  strokeWidth: 1,
  strokeDasharray: '3 3'
};