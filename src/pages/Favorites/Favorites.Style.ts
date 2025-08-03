import styled from '@emotion/styled';
import { theme } from '@styles/themes';

export const Container = styled.div`
  min-height: 100vh;
  background: ${theme.colors.sub_black};
  color: ${theme.colors.sub_white};
  padding: 0;
  position: relative;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  border-bottom: 1px solid ${theme.colors.sub_gray9};
`;

export const HeaderTitle = styled.div`
  ${theme.font.body18Semibold};
  color: ${theme.colors.sub_white};
  flex: 1;
  margin-left: 15px;
`;

export const EditButton = styled.span`
  cursor: pointer;
  background: none;
  margin-left: 12px;
  display: inline-flex;
  align-items: baseline;
`;

export const UpdateInfo = styled.div`
  ${theme.font.detail12Medium};
  color: ${theme.colors.sub_gray6};
  margin-top: 8px;
`;

export const Content = styled.div`
  padding: 20px;
  flex: 1;
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  gap: 20px;
`;

export const ChatBubble = styled.div`
  background: ${theme.colors.sub_white};
  color: ${theme.colors.sub_black};
  padding: 12px 16px;
  border-radius: 18px;
  ${theme.font.body14Regular};
  align-self: flex-start;
  max-width: 200px;
`;

export const ChatBubbleRight = styled(ChatBubble)`
  align-self: flex-end;
  background: ${theme.colors.sub_blue5};
  color: ${theme.colors.sub_white};
`;

export const Avatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${theme.colors.sub_gray7};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  margin: 10px 0;
`;

export const ActionButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  margin-top: 30px;
`;

export const ActionButton = styled.button`
  background: ${theme.colors.sub_gray11};
  color: ${theme.colors.sub_white};
  border: none;
  padding: 16px;
  border-radius: 12px;
  ${theme.font.body14Medium};
  cursor: pointer;
  text-align: left;
  transition: background 0.2s ease;
`;

export const ActionButtonPrimary = styled(ActionButton)`
  background: ${theme.colors.sub_blue5};
  
  &:hover {
    background: ${theme.colors.sub_blue6};
  }
`;

export const StockList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
`;

export const StockItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: ${theme.colors.sub_gray11};
  border-radius: 12px;
  transition: background 0.2s ease;
  
  &:hover {
    background: ${theme.colors.sub_gray9};
  }
`;

export const StockInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const StockName = styled.div`
  ${theme.font.body16Semibold};
  color: ${theme.colors.sub_white};
`;

export const StockPriceRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const StockPrice = styled.div`
  ${theme.font.body14Medium};
  color: ${theme.colors.sub_white};
`;

export const StockChange = styled.div`
  ${theme.font.body14Regular};
  color: ${theme.colors.danger};
`;

export const StockScoreRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const StockScore = styled.div`
  ${theme.font.detail12Medium};
  color: ${theme.colors.sub_gray6};
`;

export const StockScoreChange = styled.div`
  ${theme.font.detail12Medium};
  color: ${theme.colors.danger};
`;

export const NotificationIcon = styled.button<{ isActive: boolean }>`
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: ${props => props.isActive ? theme.colors.sub_blue5 : theme.colors.sub_gray7};
  transition: color 0.2s ease;
`;

export const Checkbox = styled.input`
  width: 20px;
  height: 20px;
  cursor: pointer;
  accent-color: ${theme.colors.sub_gray1};
`;

export const DeleteButton = styled.button`
  background: ${theme.colors.sub_gray1};
  color: ${theme.colors.sub_black};
  border: none;
  padding: 16px;
  border-radius: 12px;
  ${theme.font.body14Medium};
  cursor: pointer;
  width: 100%;
  margin-top: 20px;
`;

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
  max-width: 320px;
  width: 100%;
  position: relative;
  z-index: 1001;
`;

export const ModalTitle = styled.h3`
  ${theme.font.body18Semibold};
  color: ${theme.colors.sub_black};
  margin: 0 0 12px 0;
  text-align: center;
`;

export const ModalDescription = styled.p`
  ${theme.font.body14Regular};
  color: ${theme.colors.sub_gray6};
  margin: 0 0 24px 0;
  text-align: center;
  line-height: 1.4;
`;

export const ModalButtons = styled.div`
  display: flex;
  gap: 12px;
`;

export const ModalButton = styled.button`
  flex: 1;
  background: ${theme.colors.sub_gray2};
  color: ${theme.colors.sub_gray7}; 
  border: none;
  padding: 12px;
  border-radius: 500px;
  ${theme.font.body14Medium};
  cursor: pointer;
`;

export const ModalButtonPrimary = styled(ModalButton)`
  background: ${theme.colors.sub_black};
  color: ${theme.colors.sub_white};
`; 
