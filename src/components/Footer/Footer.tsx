import { ImgDiv } from '@components/Common/Common';
import commentSVG from '@assets/footer_comment.svg';
import developerSVG from '@assets/footer_developer.svg';
import dictSVG from '@assets/footer_dict.svg';
import LogoSVG from '@assets/logo_white.svg?react';
import {
  FooterButtonContainer,
  FooterButtonItemContainer,
  FooterContainer,
  FooterContents,
  FooterTitle,
} from './Footer.Style';

const FooterButton = ({ img, str }: { img: string; str: string }) => {
  return (
    <FooterButtonItemContainer>
      <ImgDiv alt={str} src={img} objectFit="cover" />
      {str}
    </FooterButtonItemContainer>
  );
};

const Footer = () => {
  return (
    <>
      <FooterContainer>
        <FooterContents>
          <FooterTitle>
            About
            <LogoSVG />
          </FooterTitle>
          개미들이 원하던 서비스! '인간지표'가 2025년 1월 11일에 공식 오픈이 예정되어있어요! 😊
          <br />
          '인간지표'를 사용하면서 불편한 부분이나 추가로 원하는 기능이 있으면 언제든지 피드백해주세요 :)
          <FooterButtonContainer>
            <FooterButton img={dictSVG} str="인간지표 백과사전" />
            <FooterButton img={commentSVG} str="서비스 의견 남기기" />
            <FooterButton img={developerSVG} str="만든이들" />
          </FooterButtonContainer>
        </FooterContents>
      </FooterContainer>
    </>
  );
};

export default Footer;
