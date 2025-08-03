import styled from '@emotion/styled';
import { theme } from '@styles/themes';

export const ExperimentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 20px;
`;

export const ExperimentCard = styled.div`
  display: flex;
  align-items: center;
  padding: 16px 20px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  justify-content: space-between;
`;

export const RankNumber = styled.div`
  color: ${theme.colors.sub_blue6};
  font-weight: 700;
  font-size: 16px;
  min-width: 24px;
`;

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
`;

export const CompanyLogo = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
`;

export const CompanyName = styled.div`
  color: ${theme.colors.sub_white};
  ${theme.font.body14Semibold}
`;

export const DateStatus = styled.div`
  color: ${theme.colors.sub_gray5};
  font-size: 12px;
  min-width: 120px;
`;

export const PerformanceText = styled.span<{ isPositive: boolean }>`
  color: ${props => props.isPositive ? '#FF6B6B' : theme.colors.sub_blue6};
`;

export const DetailsButton = styled.button`
  background: linear-gradient(135deg, ${theme.colors.sub_blue6} 0%, ${theme.colors.sub_blue7} 100%);
  color: ${theme.colors.sub_white};
  border: none;
  border-radius: 6px;
  padding: 8px 16px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  min-width: 60px;
  white-space: nowrap;
`;

// 기존 테이블 스타일들 (필요시 사용)
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


export const PriceText = styled.span<{ isPositive?: boolean }>`
  ${theme.font.detail12Medium};
  color: ${({ isPositive }) =>
    isPositive === undefined
      ? theme.colors.sub_white
      : isPositive
        ? '#ff4d4f'
        : theme.colors.sub_blue6};
`;

export const DataContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 60%;
  ${theme.font.detail12Medium};
  color: ${theme.colors.sub_gray6};
`;