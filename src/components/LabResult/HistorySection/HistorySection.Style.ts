import styled from '@emotion/styled';
import { theme } from '@styles/themes';

export const SectionContainer = styled.div`
  background: rgba(255,255,255,0.05);
  border-radius: 12px;
  padding: 16px 12px;
  width: 100%;
  margin: 0 auto;
  overflow: visible;
  box-sizing: border-box;
`;

export const Title = styled.div`
  ${theme.font.title20Semibold};
  color: ${theme.colors.sub_white};
  margin-bottom: 16px;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
`;

export const PatternTitle = styled.h4`
  ${theme.font.body16Semibold};
  margin: 20px 0 12px 0;
  color: ${theme.colors.sub_white};
`;

export const PatternDescription = styled.p`
  ${theme.font.body14Regular};
  color: ${theme.colors.sub_white};
  margin-bottom: 16px;
`;

export const QuestionButton = styled.button`
  background: none;
  border: none;
  color: ${theme.colors.sub_blue6};
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
  
  &:hover {
    text-decoration: underline;
  }
`;

export const QuadrantButton = styled.div`
  font-size: 12px;
  font-weight: 600;
  color: ${theme.colors.sub_gray5};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 4px;
  white-space: nowrap;
`;