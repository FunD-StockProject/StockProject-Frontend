import styled from '@emotion/styled';
import { theme } from '@styles/themes';

export const Container = styled.div`
  width: 100%;
  max-width: 420px;
  padding: 20px 12px;
  min-height: 100vh;
  box-sizing: border-box;
  overflow-x: hidden;

  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const Title = styled.div`
  ${theme.font.title20Semibold}
  color: ${theme.colors.sub_white};
`;

export const Description = styled.p`
  ${theme.font.body14Medium}
  color: ${theme.colors.sub_white};
  display: flex;
  align-items: center;
`;

export const Highlight = styled.span`
  background: ${theme.colors.grayscale80};
  border-radius: 16px;
  padding: 4px 12px;
  font-weight: 700;
  margin: 0 6px;
`;

