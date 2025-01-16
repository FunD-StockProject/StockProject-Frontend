import AddToHomeSVG from '@assets/PWA/Android/AddToHome.svg?react';
import ShareButtonSVG from '@assets/PWA/Android/ShareButton.svg?react';
import RunAppSVG from '@assets/PWA/RunApp.svg?react';
import {
  DetailContainer,
  DetailItem,
  DetailNumber,
  DetailText,
  HeaderText,
  OrderContainer,
} from '../Common.style';

const IOS = () => (
  <OrderContainer>
    <HeaderText>
      홈화면에 앱을 <br />
      추가하세요.
    </HeaderText>
    <DetailContainer>
      <DetailItem>
        <div>
          <DetailNumber>1</DetailNumber>
          <DetailText>chrome 접속, 상단 우측 버튼 탭</DetailText>
        </div>
        <ShareButtonSVG />
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

export default IOS;
