import { Backdrop, CloseButton, ConfirmButton, PopUpContainer } from './CommonPopUp.style';

const CommonPopUp = ({ children, onClose }: { children: any; onClose: () => void }) => (
  <>
    <Backdrop onClick={onClose} />
    <PopUpContainer>
      <CloseButton onClick={onClose}>✕</CloseButton>
      {children}
      <ConfirmButton onClick={onClose}>이해했어요</ConfirmButton>
    </PopUpContainer>
  </>
);

export default CommonPopUp;
