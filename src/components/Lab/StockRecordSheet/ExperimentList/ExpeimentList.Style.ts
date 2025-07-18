import styled from "@emotion/styled";
import { theme } from "@styles/themes";



export const ExperimentTable = styled.div`
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const ExperimentHeader = styled.div`
  ${theme.font.body14Medium} // 셀과 동일한 폰트로 변경
  display: flex;
  padding: 12px 0 0 0; 
  color: ${theme.colors.sub_gray6};
  border-top: 1px solid ${theme.colors.sub_gray9};
  text-align: center;
`;

export const ExperimentHeaderCell = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ExperimentRow = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid ${theme.colors.sub_gray10};
  color: ${theme.colors.sub_white};
  gap: 4px;
`;

export const ExperimentCell = styled.div<{ flexDirection?: string; }>`
  ${theme.font.body14Semibold}
  flex: 1;
  display: flex;
  flex-direction: ${({ flexDirection }) => flexDirection ?? 'column'};
  align-items: center;
  justify-content: center;
  color: ${theme.colors.sub_white};
`;

export const ExperimentLogo = styled.img`
  flex: 1;
  width: 26px;
  height: 26px;
  border-radius: 50%;
`;

export const ExperimentText = styled.div`
  ${theme.font.body14Medium}
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;


export const PriceText = styled.div<{ isPositive?: boolean }>`
  ${theme.font.detail12Medium};
  color: ${({ isPositive }) =>
    isPositive === undefined
      ? theme.colors.sub_white
      : isPositive
        ? '#ff4d4f'
        : theme.colors.sub_blue6};
`;