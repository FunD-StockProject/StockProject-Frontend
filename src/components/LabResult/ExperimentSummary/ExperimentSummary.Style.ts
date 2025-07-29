import styled from '@emotion/styled';
import { theme } from '@styles/themes';

export const Container = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Title = styled.div`
  ${theme.font.body14Medium}
`;

export const SummaryItem = styled.div`
  display: flex;
  align-items: center;
`;

export const Emoji = styled.span`
  font-size: 16px;
  margin-right: 8px;
`;

export const SummaryText = styled.span`
  ${theme.font.body14Medium}
  color: ${theme.colors.sub_white};
`;

export const ProfitText = styled.span`
  color: ${theme.colors.grayscale50};
`;