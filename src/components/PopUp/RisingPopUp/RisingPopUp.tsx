import CommonPopUp from '../CommonPopUp';
import { PopUpContent, PopUpTitle } from '../CommonPopUp.style';

const RisingPopUp = ({ onClose }: { onClose: () => void }) => (
  <CommonPopUp onClose={onClose}>
    <PopUpTitle>🔥 현재 민심 급상승 중</PopUpTitle>
    <PopUpContent>
      <div>현재 각종 주식 커뮤니티에서 투자자들의 민심이 긍정적으로 급상승 중인 종목입니다.</div>
    </PopUpContent>
  </CommonPopUp>
);

export default RisingPopUp;
