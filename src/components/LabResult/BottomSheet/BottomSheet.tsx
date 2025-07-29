import { ReactElement } from 'react';
import { Title } from '../LabResult.Style';
import { Overlay, BottomSheetContainer, Header, CloseButton, Content } from './BottomSheet.Style';

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactElement;
}

function BottomSheet({ isOpen, onClose, title, children }: BottomSheetProps) {
  if (!isOpen) return null;

  return (
    <Overlay onClick={onClose}>
      <BottomSheetContainer onClick={(e: React.MouseEvent) => e.stopPropagation()}>
        <Header>
          <Title>{title}</Title>

        </Header>
        <Content>
          {children}
        </Content>
        <CloseButton onClick={onClose}>닫기</CloseButton>
      </BottomSheetContainer>
    </Overlay>
  );
}

export default BottomSheet; 