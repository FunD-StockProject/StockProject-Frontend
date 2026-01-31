import styled from '@emotion/styled';
import useRouter from '@router/useRouter';
import GuageChart from '@components/Search/GuageChart/GuageChart';
import { theme } from '@styles/themes';
import LogoSVG from '@assets/logo_blue.svg?react';
import { ModalContainer, ModalContent, ModalTitleContainer } from '../CenterTutotial.Style';

const HumanZipyoDescription = styled.div({
  ...theme.font.body14Semibold,
  color: theme.colors.sub_gray10,
  margin: '0 16px',
  wordBreak: 'keep-all',
});

const HumanZipyoGuageChart = styled.div({
  gap: '8px',
  display: 'flex',
  flexDirection: 'column',
  boxSizing: 'border-box',
  justifyContent: 'center',
  alignItems: 'center',
  overflow: 'hidden',

  ['>div']: {
    ['&.guage-chart']: {
      width: '100%',
      left: '50%',
      marginTop: '-5%',
    },

    ['&.score-text']: {
      display: 'flex',
      padding: '0px 28px',
      width: '100%',
      boxSizing: 'border-box',
    },

    ['&.score-range']: {
      display: 'flex',
      gap: '4px',
      padding: '0px 24px',
      width: '100%',
      boxSizing: 'border-box',
    },
  },
});

const HumanZipyoScoreText = styled.div(
  ({ index }: { index: number }) => {
    const backgroundColor = ['#11193E', '#121C46', '#141F53', '#1F359B', '#304CD1'][index];

    return {
      background: backgroundColor,
    };
  },
  {
    ...theme.font.detail10Medium,
    color: theme.colors.sub_gray2,
    textAlign: 'center',
    width: '100%',
    margin: '0px',
    whiteSpace: 'nowrap',
    minWidth: '0',

    ['@media (max-width: 360px)']: {
      fontSize: '8px',
    },
  },
);

const HumanZipyoScoreRange = styled.span({
  ...theme.font.detail10Medium,
  color: theme.colors.sub_gray9,
  textAlign: 'center',
  width: '100%',
  margin: '0px',
  background: theme.colors.sub_white,
  borderRadius: '2px',
  position: 'relative',
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
    borderColor: `transparent transparent ${theme.colors.sub_white} transparent `,
  },
});

const HumanZipyoHowToContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  padding: '16px 12px',
  margin: '0px 16px',
  background: theme.colors.sub_white,
  borderRadius: '8px',
  alignItems: 'flex-start',

  ['>div']: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',

    ['>p']: {
      margin: '0px',

      ['&.title']: {
        ...theme.font.detail12Semibold,
        color: theme.colors.sub_gray11,
      },

      ['&.description']: {
        ...theme.font.detail12Medium,
        color: theme.colors.sub_gray10,
      },
    },
  },

  ['>button']: {
    background: theme.colors.sub_blue5,
    padding: '6px 10px',
    borderRadius: '4px',
    border: 'none',

    ...theme.font.detail12Semibold,
    color: theme.colors.sub_gray1,
  },
});

const HumanZipyoSubText = styled.p({
  ...theme.font.detail12Semibold,
  color: theme.colors.sub_blue7,

  margin: '0 16px',
  width: '100%',
  boxSizing: 'border-box',
  whiteSpace: 'nowrap',
});

const scoreText = ['대곰탕', '곰탕', '어?', '호황', '대호황'];
const scoreRange = [
  [0, 30],
  [30, 40],
  [40, 50],
  [50, 70],
  [70, 100],
];

const AboutHumanZipyo = () => {
  const { navToAbout } = useRouter();

  return (
    <ModalContainer>
      <ModalTitleContainer>
        <LogoSVG />
        <p>점수란?</p>
      </ModalTitleContainer>
      <ModalContent>
        <HumanZipyoDescription>
          인간지표는 개미들의 ‘민심 온도계’예요. <wbr />
          점수는 총 5단계로, 높을수록 시장 분위기가 들떠 있거나 <wbr />
          과열된 상태를 뜻해요.
        </HumanZipyoDescription>
        <HumanZipyoGuageChart>
          <div className="guage-chart">
            <GuageChart score={60} />
          </div>
          <div className="score-text">
            {scoreText.map((e, index) => (
              <HumanZipyoScoreText key={`HUMAN_ZIPYO_SCORE_TEXT_${index}`} index={index}>
                LV{index + 1}. {e}
              </HumanZipyoScoreText>
            ))}
          </div>
          <div className="score-range">
            {scoreRange.map((e, index) => {
              return (
                <HumanZipyoScoreRange key={`HUMAN_ZIPYO_SCORE_RANGE_${index}`}>
                  {e[0]}~{e[1]}점
                </HumanZipyoScoreRange>
              );
            })}
          </div>
        </HumanZipyoGuageChart>
        <HumanZipyoHowToContainer>
          <div>
            <p className="title">점수는 어떻게 산출되나요?</p>
            <p className="description">
              대규모 감정분석 모델을 통해 각종 커뮤니티에서 투자자들 반응을 긍/부정으로 파악하여 점수를 산출해요
            </p>
          </div>
          <button onClick={navToAbout}>산출 방식 자세히 보기 → </button>
        </HumanZipyoHowToContainer>
        <HumanZipyoSubText>*공식 지표가 아니므로 참고 용도로 활용해 주세요</HumanZipyoSubText>
      </ModalContent>
    </ModalContainer>
  );
};

export default AboutHumanZipyo;
