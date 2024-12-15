import AddToHome from '@assets/AddToHome.svg';
import BottomShareButtonTab from '@assets/BottomShareButtonTab.png';
import RunApp from '@assets/RunApp.png';
import { DetailContainer, DetailImage, DetailItem, DetailNumber, DetailText, HeaderText, OrderContainer } from './IOSSafari.style';

const IOSSafari = () => (
  <OrderContainer>
    <HeaderText>
      홈화면에 앱을 <br />
      추가하세요.
    </HeaderText>
    <DetailContainer>
      <DetailItem>
        <DetailNumber>1</DetailNumber>
        <DetailText>하단 공유 버튼 탭</DetailText>
      </DetailItem>
      <div style={{ margin: '-30px 0' }}>
        <DetailImage src={BottomShareButtonTab} alt="공유 버튼" />
      </div>
      <DetailItem>
        <DetailNumber>2</DetailNumber>
        <DetailText>홈 화면에 추가</DetailText>
      </DetailItem>
      <DetailImage src={AddToHome} alt="홈 화면 추가" />
      <DetailItem>
        <DetailNumber>3</DetailNumber>
        <DetailText>생성된 앱 실행</DetailText>
      </DetailItem>
      <DetailImage src={RunApp} alt="앱 실행" />
    </DetailContainer>
  </OrderContainer>
);

export default IOSSafari;
