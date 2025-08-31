import { useNavigate } from 'react-router-dom';
import { webPath } from '@router/index';
import { ImgDiv } from '@components/Common/Common';
import businessSVG from '@assets/footer/footer_business.svg';
import commentSVG from '@assets/footer/footer_comment.svg';
import developerSVG from '@assets/footer/footer_developer.svg';
import dictSVG from '@assets/footer/footer_dict.svg';
import InstagramSVG from '@assets/footer/footer_instagram.svg?react';
import LinkedInSVG from '@assets/footer/footer_linkedin.svg?react';
import termSVG from '@assets/footer/footer_term.svg';
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
  const navigate = useNavigate();

  const handleClickServiceGuide = () => {
    navigate(webPath.about());
  };

  const handleClickBusinessProposal = () => {
    window.open('mailto:humanzipyo2024@gmail.com?cc=anyany3151@naver.com');
  };

  const handleClickServiceCenter = () => {
    window.open('https://forms.gle/eus2xRNHGxbSBaAK9');
  };

  const handleClickTermUse = () => {
    navigate(webPath.term(), {
      state: { termKey: 'agreeTerm' },
    });
  };

  const handleClickTermPrivacy = () => {
    navigate(webPath.term(), {
      state: { termKey: 'agreePrivacy' },
    });
  };

  return (
    <>
      <FooterContainer>
        <FooterContents>
          <FooterTitle>
            About
            <LogoSVG width={80} height={21} />
          </FooterTitle>
          <FooterButtonContainer>
            <FooterButton img={dictSVG} str="서비스 가이드" onClick={handleClickServiceGuide} />
            <FooterButton img={businessSVG} str="비즈니스 제안" onClick={handleClickBusinessProposal} />
            <FooterButton img={commentSVG} str="고객센터" onClick={handleClickServiceCenter} />
            <FooterButton img={termSVG} str="서비스 이용약관" onClick={handleClickTermUse} />
            <FooterButton img={developerSVG} str="개인정보 처리방침" onClick={handleClickTermPrivacy} />
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
