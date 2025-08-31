import styled from '@emotion/styled';
import GuageChart from '@components/Search/GuageChart/GuageChart';
import { theme } from '@styles/themes';
import LogoWhiteSVG from '@assets/logo/logo_white.svg?react';
import AboutHowTo from './HowTo/HowTo';

const AboutContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '45px',
  padding: '24px 0px',
});

const ScoreTextBackgroundColors = ['#11193E', '#121C46', '#141F53', '#1F359B', '#304CD1'];

const AboutTitleContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  padding: '0px 20px',

  ['>span']: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',

    ...theme.font.heading24Semibold,
    color: theme.colors.sub_white,
    whiteSpace: 'nowrap',

    ['>svg']: {
      flexShrink: 0,
      height: '20px',
      width: 'auto',
    },
  },

  ['>p']: {
    margin: '0',
    ...theme.font.body14Medium,
    color: theme.colors.sub_gray4,
  },
});

const AboutGuageChartContainer = styled.div({
  gap: '16px',
  display: 'flex',
  flexDirection: 'column',
  boxSizing: 'border-box',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '0px 20px',
});

const AboutGuageChartInner = styled.div({
  width: '110%',
  left: '50%',
  marginTop: '-5%',
});

const AboutGuageChartTextContainer = styled.div({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  alignItems: 'center',
});

const AboutGuageChartLevelContainer = styled.div({
  display: 'flex',
  width: '100%',
  padding: '0px 12px',
  boxSizing: 'border-box',
});

const AboutGuageChartLevelItem = styled.span(
  ({ index }: { index: number }) => ({
    background: ScoreTextBackgroundColors[index],
  }),
  {
    ...theme.font.detail10Medium,
    color: theme.colors.sub_gray2,
    textAlign: 'center',
    margin: '0px',
    whiteSpace: 'nowrap',
    minWidth: '0',
    width: '100%',
    padding: '2px 0px',
  },
);

const AboutGuageChartRangeContainer = styled.div({
  display: 'flex',
  gap: '4px',
  padding: '0px 4px',
  width: '100%',
  boxSizing: 'border-box',
});

const AboutGuageChartRangeItem = styled.span({
  ...theme.font.detail12Medium,
  color: theme.colors.sub_gray6,
  textAlign: 'center',
  width: '100%',
  margin: '0px',
  background: theme.colors.sub_gray10,
  borderRadius: '2px',
  position: 'relative',
  padding: '2px 0px',
  whiteSpace: 'nowrap',

  ['::before']: {
    content: '""',
    position: 'absolute',
    width: 0,
    height: 0,
    bottom: '100%',
    left: '50%',
    transform: 'translateX(-50%)',

    borderStyle: 'solid',
    borderWidth: '0px 4px 6px 4px',
    borderColor: `transparent transparent ${theme.colors.sub_gray10} transparent `,
  },
});

const AboutPage = () => {
  const scoreText = ['대곰탕', '곰탕', '어?', '호황', '대호황'];
  const scoreRange = [
    [0, 30],
    [30, 40],
    [40, 50],
    [50, 70],
    [70, 100],
  ];

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
    </AboutContainer>
  );
};

export default AboutPage;
