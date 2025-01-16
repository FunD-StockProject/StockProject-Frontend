import { ImgDiv } from '@components/Common/Common';
import businessSVG from '@assets/footer/footer_business.svg';
import commentSVG from '@assets/footer/footer_comment.svg';
import developerSVG from '@assets/footer/footer_developer.svg';
import dictSVG from '@assets/footer/footer_dict.svg';
import InstagramSVG from '@assets/footer/footer_instagram.svg?react';
import LinkedInSVG from '@assets/footer/footer_linkedin.svg?react';
import ThreadsSVG from '@assets/footer/footer_threads.svg?react';
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

const openLinkedIn = () => {
  window.open('https://www.linkedin.com/company/humanzipyo');
};

const openThreads = () => {
  window.open('https://www.threads.net/@humanzipyo');
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
          <FooterButtonContainer>
            <FooterButton img={dictSVG} str="데이터 추출 방식 자세히 보기" onClick={openDictionaryModel} />
            <FooterButton img={commentSVG} str="서비스 의견 남기기" onClick={openSurveyWindow} />
            <FooterButton img={businessSVG} str="비즈니스 제안" onClick={openBusinessProposal} />
            <FooterButton img={developerSVG} str="만든이들" onClick={openCreatorsInfoModal} />
          </FooterButtonContainer>
          <FooterIconsContainer>
            <InstagramSVG onClick={openInstagram} />
            <LinkedInSVG onClick={openLinkedIn} />
            <ThreadsSVG onClick={openThreads} />
          </FooterIconsContainer>
        </FooterContents>
      </FooterContainer>
    </>
  );
};

export default Footer;
