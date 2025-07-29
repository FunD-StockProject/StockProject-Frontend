import styled from '@emotion/styled';
import { theme } from '@styles/themes';

export const SectionContainer = styled.div`
  background: rgba(255,255,255,0.05);
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 20px;
`;

export const Title = styled.h3`
  ${theme.font.title20Semibold};
  color: ${theme.colors.sub_white};
  margin-bottom: 16px;
`;

export const PatternDisplay = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
`;

export const PatternBadge = styled.span<{ background: string }>`
  background: ${props => props.background};
  color: ${theme.colors.sub_white};
  padding: 4px 12px;
  border-radius: 16px;
  font-weight: 600;
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
