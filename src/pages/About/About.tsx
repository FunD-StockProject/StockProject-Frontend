import { useEffect, useState } from 'react';
import GuageChart from '@components/Search/GuageChart/GuageChart';
import CommonRulePNG from '@assets/design/common_rule.png';
import ArrowUpSVG from '@assets/icons/arrowUp.svg?react';
import LogoWhiteSVG from '@assets/logo/logo_white.svg?react';
import {
  AboutContainer,
  AboutGuageChartContainer,
  AboutGuageChartInner,
  AboutGuageChartLevelContainer,
  AboutGuageChartLevelItem,
  AboutGuageChartRangeContainer,
  AboutGuageChartRangeItem,
  AboutGuageChartTextContainer,
  AboutTitleContainer,
  AboutTrustContainer,
  AboutTrustContents,
  AboutTrustFooter,
  AboutTrustTitle,
  AboutUpScrollButton,
} from './About.Style';
import AboutHowTo from './HowTo/HowTo';

const AboutPage = () => {
  const scoreText = ['대곰탕', '곰탕', '어?', '호황', '대호황'];
  const scoreRange = [
    [0, 30],
    [30, 40],
    [40, 50],
    [50, 70],
    [70, 100],
  ];

  const [isUpScrollButton, setIsUpScrollButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setIsUpScrollButton(scrollTop > 0);
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleClickUpScrollButton = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AboutContainer>
      <AboutTitleContainer>
        <span>
          <LogoWhiteSVG />
          점수란 무엇인가요?
        </span>
        <p>
          인간지표는 개미들의 ‘민심 온도계’예요.
          <br />
          점수는 총 5단계로, 높을수록 시장 분위기가 들떠 있거나
          <br />
          과열된 상태를 뜻해요.
        </p>
      </AboutTitleContainer>
      <AboutGuageChartContainer>
        <AboutGuageChartInner>
          <GuageChart score={60} />
        </AboutGuageChartInner>
        <AboutGuageChartTextContainer>
          <AboutGuageChartLevelContainer>
            {scoreText.map((e, index) => {
              return (
                <AboutGuageChartLevelItem key={`ZIPYO_POPUP_SCORE_TEXT_${index}`} index={index}>
                  LV{index + 1}. {e}
                </AboutGuageChartLevelItem>
              );
            })}
          </AboutGuageChartLevelContainer>
          <AboutGuageChartRangeContainer>
            {scoreRange.map((e, index) => {
              return (
                <AboutGuageChartRangeItem key={`ZIPYO_POPUP_SCORE_RANGE_${index}`}>
                  {e[0]}~{e[1]}점
                </AboutGuageChartRangeItem>
              );
            })}
          </AboutGuageChartRangeContainer>
        </AboutGuageChartTextContainer>
      </AboutGuageChartContainer>
      <AboutHowTo />
      <AboutTrustContainer>
        <AboutTrustTitle>
          <LogoWhiteSVG />
          믿을만한 정보인가요?
        </AboutTrustTitle>
        <AboutTrustContents>
          <p>
            해당 점수는 <b>비공식적인 지표</b>로, 투자 또는 중대한
            <br />
            의사결정을 내릴 때 <b>절대적인 기준으로 삼아서는 안됩니다</b>
            <br />
            <b>참고 자료로만 활용</b>하시기 바라며,
            <br />
            최종 결정은 공식적인 지표로 신중히 검토 후 내려주세요! 😊
          </p>
          <AboutTrustFooter>
            <p>주식투자심리도우미</p>
            <img src={CommonRulePNG} alt="info" loading="lazy" />
            <LogoWhiteSVG />
          </AboutTrustFooter>
        </AboutTrustContents>
      </AboutTrustContainer>
      {isUpScrollButton && (
        <AboutUpScrollButton onClick={handleClickUpScrollButton}>
          <ArrowUpSVG />
        </AboutUpScrollButton>
      )}
    </AboutContainer>
  );
};

export default AboutPage;
