import styled from '@emotion/styled';
import { theme } from '@styles/themes';

export const TypeSelector = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
  overflow-x: auto;
  white-space: nowrap;
  padding-bottom: 8px;
  
  /* 스크롤바 숨기기 */
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

export const TypeButton = styled.button<{ isSelected: boolean }>`
  background: ${props => props.isSelected ? theme.colors.sub_blue6 : 'rgba(255, 255, 255, 0.1)'};
  color: ${props => props.isSelected ? 'white' : theme.colors.sub_white};
  border: none;
  padding: 8px 16px;
  border-radius: 50px;
  ${theme.font.body14Semibold};
  cursor: pointer;
  transition: all 0.2s ease;
`;

export const TypeContent = styled.div`
  margin-top: 20px;
`;

export const TypeTitle = styled.h3`
  ${theme.font.body16Semibold};
  color: ${theme.colors.sub_white};
  margin-bottom: 12px;
`;

export const TypeDescription = styled.p`
  ${theme.font.body14Regular};
  color: ${theme.colors.sub_white};
  line-height: 1.6;
  margin-bottom: 20px;
  white-space: pre-line;
`;

export const BellCurveContainer = styled.div`
  position: relative;
  margin: 20px 0;
`;

export const TooltipText = styled.div`
  background: rgba(255, 255, 255, 0.95);
  color: ${theme.colors.sub_black};
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 14px;
  line-height: 1.5;
  margin-top: 16px;
  text-align: center;
`;