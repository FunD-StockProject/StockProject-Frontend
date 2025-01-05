import AddToHomeSVG from '@assets/PWA/AddToHome.svg?react';
import RunAppSVG from '@assets/PWA/RunApp.svg?react';
import ShareButtonSVG from '@assets/PWA/ShareButton.svg?react';
import { DetailContainer, DetailItem, DetailNumber, DetailText, HeaderText, OrderContainer } from './IOSSafari.style';

const IOSSafari = () => (
  <OrderContainer>
    <HeaderText>
      홈화면에 앱을 <br />
      추가하세요.
    </HeaderText>
    <DetailContainer>
      <DetailItem>
        <div>
          <DetailNumber>1</DetailNumber>
          <DetailText>하단 공유 버튼 탭</DetailText>
        </div>
        <ShareButtonSVG style={{ margin: '-20px 0' }} />
      </DetailItem>
      <DetailItem>
        <div>
          <DetailNumber>2</DetailNumber>
          <DetailText>홈 화면에 추가</DetailText>
        </div>
        <AddToHomeSVG />
      </DetailItem>
      <DetailItem>
        <div>
          <DetailNumber>3</DetailNumber>
          <DetailText>생성된 앱 실행</DetailText>
        </div>
        <RunAppSVG />
      </DetailItem>
    </DetailContainer>
  </OrderContainer>
);

export default IOSSafari;
