import CommonPopUp from '../CommonPopUp';
import { PopUpContent, PopUpTitle } from '../CommonPopUp.style';

const HotPopUp = ({ onClose }: { onClose: () => void }) => (
  <CommonPopUp onClose={onClose}>
    <PopUpTitle>👑 현재 시장 반응 TOP 3</PopUpTitle>
    <PopUpContent>
      <div>
        한국투자증권’ 순위를 기반으로 집계됩니다.
      </div>
    </PopUpContent>
  </CommonPopUp>
);

export default HotPopUp;
