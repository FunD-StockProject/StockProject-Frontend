import styled from '@emotion/styled';
import { theme } from '@styles/themes';

export const SectionContainer = styled.div`
  
  border-radius: 16px;
`;

export const Title = styled.div`
  ${theme.font.title20Semibold};
  margin-bottom: 10px;
  color: ${theme.colors.sub_white};
`;

export const PatternDisplay = styled.div`
  ${theme.font.body18Semibold}
`;

export const PatternBadge = styled.span<{ background: string }>`
  background: ${props => props.background};
  color: ${theme.colors.sub_white};
  padding: 4px 12px;
  height: 32px;
  display: inline-flex;
  align-items: center;
  border-radius: 50px;
  margin: 0 4px;
  ${theme.font.body16Medium};
`;
