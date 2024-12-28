import CommonPopUp from '../CommonPopUp';
import { PopUpTitle } from '../CommonPopUp.style';

const FearPopUp = ({ onClose }: { onClose: () => void }) => (
  <CommonPopUp onClose={onClose}>
    <PopUpTitle>공포지수란?</PopUpTitle>
  </CommonPopUp>
);

export default FearPopUp;
