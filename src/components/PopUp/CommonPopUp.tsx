import { ConfirmButton, PopUpContainer, PopUpContent } from './CommonPopUp.style';

const CommonPopUp = ({ children, onClose }: { children: any; onClose: () => void }) => (
  <PopUpContainer>
    <PopUpContent>{children}</PopUpContent>
    <ConfirmButton onClick={onClose}>이해했어요</ConfirmButton>
  </PopUpContainer>
);

export default CommonPopUp;
