import { ImgDiv } from '@components/Common/Common';
import businessSVG from '@assets/footer/footer_business.svg';
import commentSVG from '@assets/footer/footer_comment.svg';
import developerSVG from '@assets/footer/footer_developer.svg';
import dictSVG from '@assets/footer/footer_dict.svg';
import InstagramSVG from '@assets/footer/footer_instagram.svg';
import LinkedinSVG from '@assets/footer/footer_linkedin.svg';
import LogoSVG from '@assets/logo_white.svg?react';
import {
  FooterButtonContainer,
  FooterButtonItemContainer,
  FooterContainer,
  FooterContents,
  FooterIconsContainer,
  FooterTitle,
} from './Footer.Style';

const FooterButton = ({
  img,
  str,
  onClick,
}: {
  img: string;
  str: string;
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
}) => {
  return (
    <FooterButtonItemContainer onClick={onClick}>
      <ImgDiv alt={str} src={img} objectFit="cover" />
      {str}
    </FooterButtonItemContainer>
  );
};
const openDictionaryModel = () => {
  window.open('https://balanced-bun-351.notion.site/17412e0c80b880259849c17228046794?pvs=4');
};

const openSurveyWindow = () => {
  window.open('https://forms.gle/G8cvb7RqtPjGhxvK7');
};

const openBusinessProposal = () => {
  window.open('mailto:humanzipyo2024@gmail.com?cc=anyany3151@naver.com');
};

const openCreatorsInfoModal = () => {
  window.open('https://balanced-bun-351.notion.site/crew-17412e0c80b8807ab157fb40648f33dd?pvs=4');
};

const openInstagram = () => {
  window.open('https://www.instagram.com/humanzipyo/');
};

const openLinkedin = () => {
  window.open('https://www.linkedin.com/company/humanzipyo');
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
            <FooterButton img={dictSVG} str="데이터 추출 방식 자세히 보기" onClick={openDictionaryModel} />
            <FooterButton img={commentSVG} str="서비스 의견 남기기" onClick={openSurveyWindow} />
            <FooterButton img={businessSVG} str="비즈니스 제안" onClick={openBusinessProposal} />
            <FooterButton img={developerSVG} str="만든이들" onClick={openCreatorsInfoModal} />
          </FooterButtonContainer>
          <FooterIconsContainer>
            <ImgDiv alt={'인스타그램'} src={InstagramSVG} objectFit="fill" onClick={openInstagram} />
            <ImgDiv alt={'링크드인'} src={LinkedinSVG} objectFit="fill" onClick={openLinkedin} />
          </FooterIconsContainer>
        </FooterContents>
      </FooterContainer>
    </>
  );
};

export default Footer;
