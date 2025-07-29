import styled from '@emotion/styled';
import { theme } from '@styles/themes';

export const SectionContainer = styled.div`
  background: rgba(255,255,255,0.05);
  border-radius: 4px;
  width: 100%;
  max-width: 420px;
  margin: 0 auto;
  padding: 12px 10px;
  box-sizing: border-box;
`;

export const Title = styled.div`
  ${theme.font.title20Semibold};
  color: ${theme.colors.sub_white};
`;

export const PatternTitle = styled.h4`
  ${theme.font.body16Semibold};
  margin: 20px 0 12px 0;
  color: ${theme.colors.sub_white};
`;

export const PatternDescription = styled.p`
  ${theme.font.body14Regular};
  color: ${theme.colors.sub_white};
  line-height: 1.6;
  margin-bottom: 16px;
`; 