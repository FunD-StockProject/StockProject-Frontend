import styled from '@emotion/styled';
import { theme } from '@styles/themes';

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: flex;
  align-items: flex-end;
`;

export const BottomSheetContainer = styled.div`
  background: ${theme.colors.sub_black};
  border-radius: 20px 20px 0 0;
  width: 100%;
  max-height: 80vh;
  overflow-y: auto;
  padding: 20px;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

export const Title = styled.h2`
  ${theme.font.title20Semibold};
  color: ${theme.colors.sub_white};
  margin: 0;
`;

export const CloseButton = styled.button`
  background: ${theme.colors.sub_blue6};
  color: ${theme.colors.sub_white};
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  width: 100%;
`;

export const Content = styled.div`
  color: ${theme.colors.sub_white};
`; 