import styled from '@emotion/styled';
import { theme } from '@styles/themes';

export const BottomSheetOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1001;
  display: flex;
  align-items: flex-end;
  justify-content: center;
`;

export const BottomSheetContainer = styled.div`
  width: 100%;
  max-width: 500px;
  background: ${theme.colors.sub_black};
  border-radius: 16px 16px 0 0;
  overflow: hidden;
  animation: slideUp 0.3s ease-out;
  
  @keyframes slideUp {
    from {
      transform: translateY(100%);
    }
    to {
      transform: translateY(0);
    }
  }
`;

export const BottomSheetContent = styled.div`
  padding: 24px;
  max-height: 80vh;
  overflow-y: auto;
`;

export const HeaderSection = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
`;

export const CompanyLogo = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
`;

export const CompanyName = styled.h2`
  color: ${theme.colors.sub_white};
  font-size: 20px;
  font-weight: 600;
  margin: 0;
`;

export const SummarySection = styled.div`
  margin-bottom: 24px;
`;

export const SummaryTable = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 16px;
`;

export const SummaryRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 16px;
`;

export const SummaryCell = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const SummaryLabel = styled.div`
  color: ${theme.colors.sub_gray5};
  font-size: 12px;
  font-weight: 500;
`;

export const SummaryValue = styled.div`
  color: ${theme.colors.sub_white};
  font-size: 14px;
  font-weight: 600;
`;

export const GraphSection = styled.div`
  margin-bottom: 24px;
`;

export const GraphContainer = styled.div`
  width: 100%;
`;

export const CloseButton = styled.button`
  width: 100%;
  background: ${theme.colors.sub_blue6};
  color: ${theme.colors.sub_white};
  border: none;
  border-radius: 12px;
  padding: 16px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background: ${theme.colors.sub_blue7};
  }
`; 