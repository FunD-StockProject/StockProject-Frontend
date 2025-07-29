import styled from '@emotion/styled';
import { theme } from '@styles/themes';

export const ChartContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  padding: 12px 10px;
  box-sizing: border-box;
  background-color: rgba(255,255,255,0.05);
`;

export const TooltipContainer = styled.div`
  background: ${theme.colors.sub_white};
  border-radius: 400px;
  padding: 10px 19px;
  color: ${theme.colors.sub_black};
  font-size: 10px;
  line-height: 1.5;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  
  p {
    margin: 0;
    white-space: nowrap;
    font-weight: 500;
  }
`;

export const TooltipBubble = styled.div<{ isVisible: boolean }>`
  font-size: 12px;
  position: absolute;
  top: 50px;
  left: 10px;
  background-color: ${theme.colors.sub_white};
  padding: 10px 19px;
  border-radius: 400px;
  color: ${theme.colors.sub_black};
  text-align: center;
  z-index: 20;
`;

export const QuestionButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  color: ${theme.colors.grayscale50};
  font-size: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
  z-index: 20;
  
  &:hover {
    color: ${theme.colors.sub_white};
  }
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