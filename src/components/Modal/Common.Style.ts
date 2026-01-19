import styled from '@emotion/styled';
import { theme } from '@styles/themes';

export const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const ModalOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
`;

export const ModalContent = styled.div`
  background: ${theme.colors.sub_white};
  border-radius: 20px;
  padding: 24px;
  margin: 20px;
  max-width: 324px;
  width: 100%;
  position: relative;
  z-index: 1001;
`;

export const ModalTitle = styled.h3`
  ${theme.font.title20Semibold};
  color: ${theme.colors.sub_black};
  margin: 0 0 12px 0;
  text-align: left;
`;

export const ModalDescription = styled.p`
  ${theme.font.body16Medium};
  color: ${theme.colors.sub_gray7};
  margin: 0 0 24px 0;
  text-align: left;
  line-height: 1.4;
`;

export const ModalButtons = styled.div`
  display: flex;
  gap: 12px;
`;

export const ModalButton = styled.button`
  flex: 1;
  background: ${theme.colors.sub_gray2};
  color: ${theme.colors.sub_gray8};
  border: none;
  padding: 12px 0;
  border-radius: 500px;
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
`;

export const ModalButtonPrimary = styled(ModalButton)`
  background: ${theme.colors.sub_black};
  color: ${theme.colors.sub_white};
`;
