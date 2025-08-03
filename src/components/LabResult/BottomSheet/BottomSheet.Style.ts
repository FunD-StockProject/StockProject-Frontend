import styled from '@emotion/styled';
import { theme } from '@styles/themes';

export const Overlay = styled.div<{ isDragging?: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: flex;
  align-items: flex-end;
  pointer-events: ${props => props.isDragging ? 'none' : 'auto'};
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
`;

export const BottomSheetContainer = styled.div`
  background: ${theme.colors.sub_black};
  border-radius: 16px 16px 0 0;
  width: 100%;
  max-height: 80vh;
  overflow-y: auto;
  padding: 20px;
  position: relative;
  display: flex;
  flex-direction: column;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  cursor: grab;
  user-select: none;

  &:active {
    cursor: grabbing;
  }

  &::before {
    content: '';
    position: absolute;
    top: 8px;
    left: 50%;
    transform: translateX(-50%);
    width: 40px;
    height: 4px;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 2px;
  }
`;

export const Title = styled.div`
  ${theme.font.body18Semibold};
  color: ${theme.colors.sub_white};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;

`;

export const CloseButton = styled.button`
  background: ${theme.colors.sub_blue6};
  color: ${theme.colors.sub_white};
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  width: calc(100% - 40px);
  position: absolute;
  bottom: 20px;
  left: 20px;
`;

export const Content = styled.div`
  color: ${theme.colors.sub_white};
  flex: 1;
  overflow-y: auto;
  margin-bottom: 60px;
`; 