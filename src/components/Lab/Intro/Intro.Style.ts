import styled from '@emotion/styled';
import { theme } from '@styles/themes';


export const StepBox = styled.div`
  background: ${theme.colors.sub_gray10};
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
`;

export const StepLabel = styled.span`
  ${theme.font.body14Medium};
  background: ${theme.colors.sub_gray7};
  color: ${theme.colors.sub_white};
  padding: 4px 8px;
  border-radius: 8px;
  display: inline-block;
`;

export const StepImage = styled.div`
  background: ${theme.colors.sub_gray10};
  height: 120px;
  border-radius: 8px;
  margin-top: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.sub_white};
`;

