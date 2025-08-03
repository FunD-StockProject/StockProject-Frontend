import styled from '@emotion/styled';
import { theme } from '@styles/themes';

export const StepBox = styled.div`
  background-color: ${theme.colors.sub_gray11};
  width: 100%;
  margin-bottom: 40px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 14px;
  box-sizing: border-box;
`;

export const StepLabel = styled.div`
  ${theme.font.body16Medium};
  color: ${theme.colors.sub_gray4};
  margin-bottom: 20px;
  text-align: center;
  padding: 20px;
  background-color: ${theme.colors.sub_black};
  border-radius: 50px;
  display: inline-block;
`;

export const StepImage = styled.img`
  width: 280px;
  height: auto;
  margin: 0 auto 20px;
  display: block;
  
  @media (max-width: 768px) {
    width: 250px;
  }
`;

export const StepDescription = styled.div`
  ${theme.font.body14Regular};
  color: ${theme.colors.sub_gray5};
  text-align: center;
  line-height: 1.5;
  margin-bottom: 20px;
  max-width: 400px;
`;

export const WarningText = styled.div`
  ${theme.font.body14Medium};
  color: ${theme.colors.sub_gray8};  
`;
