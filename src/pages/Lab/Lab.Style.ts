import styled from "@emotion/styled";
import { theme } from "@styles/themes";

export const PriceText = styled.div<{ isPositive?: boolean }>`
  ${theme.font.detail12Medium};
  color: ${({ isPositive }) =>
    isPositive === undefined
      ? theme.colors.sub_white
      : isPositive
        ? '#ff4d4f'
        : theme.colors.sub_blue6};
`;

export const Container = styled.div`
  background: ${theme.colors.sub_black};
  min-height: 100vh;
  padding: 12px;
  padding-bottom: 120px;
`;

export const TabContainer = styled.div`
  ${theme.font.body18Semibold}
  display: flex;
  border-bottom: 1px solid ${theme.colors.sub_gray6};
  padding: 0 24px;
`;

export const Tab = styled.div<{ selected: boolean }>`
  padding: 12px 16px;
  color: ${({ selected }) => selected ? theme.colors.sub_gray1 : theme.colors.sub_gray6};
  border-bottom: ${({ selected }) => selected ? `2px solid ${theme.colors.sub_gray4}` : 'none'};
  cursor: pointer;
`;

export const GuideBox = styled.div`
  background: ${theme.colors.sub_blue6};
  border-radius: 8px;
  padding: 24px;
  margin-top: 20px;
  color: ${theme.colors.sub_white};
`;

export const GuideTitle = styled.p`
  ${theme.font.title20Semibold}
  margin-bottom: 8px;
`;

export const GuideText = styled.p`
  ${theme.font.body14Medium}
`;

export const GuideButton = styled.button`
  ${theme.font.detail12Semibold}
  margin-top: 12px;
  padding: 8px 16px;
  background: ${theme.colors.sub_white};
  color: ${theme.colors.sub_blue6};
  border-radius: 8px;
  border: none;
  cursor: pointer;
`;

export const SummarySection = styled.div`
  margin-top: 24px;
`;

export const SummaryTitle = styled.p`
  ${theme.font.title20Medium}
  margin-bottom: 12px;
`;

export const SummaryCardContainer = styled.div`
  display: flex;
  gap: 16px;
`;

export const SummaryCard = styled.div`
  background: ${theme.colors.sub_gray11};
  border-radius: 8px;
  flex: 1;
  text-align: center;
`;

export const SummaryLabel = styled.p`
  ${theme.font.body14Semibold}
  color: ${theme.colors.sub_white};
`;

export const SummaryValue = styled.p`
  ${theme.font.body14Medium}
  color: ${theme.colors.sub_gray5};
`;

export const StatusSection = styled.div`
  margin-top: 24px;
`;

export const StatusTitle = styled.p`
  ${theme.font.title20Medium}
`;

export const Highlight = styled.span`
  ${theme.font.title20Semibold}
  color: ${theme.colors.sub_blue5};
`;

export const StatusMessage = styled.p`
  ${theme.font.body18Medium}
  color: ${theme.colors.sub_gray7};
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const MessageLink = styled.span`
  ${theme.font.body14Medium}
  color: ${theme.colors.sub_gray6};
  text-decoration: underline;
  cursor: pointer;
`;

export const TopBar = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 16px 0;
`;

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

export const AddStockButtonWrapper = styled.div`
  position: fixed;
  bottom: 80px;
  right: 40px;
  z-index: 1000;
`;

export const AddStockButton = styled.button`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: ${theme.colors.sub_blue5};
  color: ${theme.colors.sub_white};
  border: none;
  font-size: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  cursor: pointer;
`;
