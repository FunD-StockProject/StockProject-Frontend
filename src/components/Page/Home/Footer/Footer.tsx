import useRouter from '@router/useRouter';
import businessSVG from '@assets/footer/footer_business.svg?react';
import commentSVG from '@assets/footer/footer_comment.svg?react';
import developerSVG from '@assets/footer/footer_developer.svg?react';
import dictSVG from '@assets/footer/footer_dict.svg?react';
import InstagramSVG from '@assets/footer/footer_instagram.svg?react';
import LinkedInSVG from '@assets/footer/footer_linkedin.svg?react';
import termSVG from '@assets/footer/footer_term.svg?react';
import ThreadsSVG from '@assets/footer/footer_threads.svg?react';
import LogoSVG from '@assets/logo_white.svg?react';
import {
  FooterButton,
  FooterButtonContainer,
  FooterContainer,
  FooterContents,
  FooterIconsContainer,
  FooterTitle,
} from './Footer.Style';

const HomeFooter = () => {
  const { openInstagram, openLinkedIn, openThreads, navToAbout, navToTerm, openBusinessProposal, openServiceCenter } =
    useRouter();

  const FooterButtonList = [
    {
      svg: dictSVG,
      title: '서비스 가이드',
      onClick: navToAbout,
    },
    {
      svg: businessSVG,
      title: '비즈니스 제안',
      onClick: openBusinessProposal,
    },
    {
      svg: commentSVG,
      title: '고객센터',
      onClick: openServiceCenter,
    },
    {
      svg: termSVG,
      title: '서비스 이용약관',
      onClick: () => navToTerm('agreeTerm'),
    },
    {
      svg: developerSVG,
      title: '개인정보 처리방침',
      onClick: () => navToTerm('agreePrivacy'),
    },
  ];

  const SVGButtonList = [
    {
      svg: InstagramSVG,
      onClick: openInstagram,
    },
    {
      svg: LinkedInSVG,
      onClick: openLinkedIn,
    },
    {
      svg: ThreadsSVG,
      onClick: openThreads,
    },
  ];

  return (
    <FooterContainer>
      <FooterContents>
        <FooterTitle>
          <p>About</p>
          <LogoSVG width={80} height={21} />
        </FooterTitle>
        <FooterButtonContainer>
          {FooterButtonList.map((item) => (
            <FooterButton key={`FOOTER_BUTTON_${item.title}`} onClick={item.onClick}>
              <item.svg />
              <p>{item.title}</p>
            </FooterButton>
          ))}
        </FooterButtonContainer>
        <FooterIconsContainer>
          {SVGButtonList.map((item, index) => (
            <item.svg key={`FOOTER_ICON_${index}`} onClick={item.onClick} />
          ))}
        </FooterIconsContainer>
      </FooterContents>
    </FooterContainer>
  );
};

export default HomeFooter;
