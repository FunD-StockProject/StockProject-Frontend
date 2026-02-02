import useRouter from '@router/useRouter';
import GuageChart from '@components/Search/GuageChart/GuageChart';
import LogoSVG from '@assets/logo_blue.svg?react';
import { ModalContainer, ModalContent, ModalTitleContainer } from '../CenterTutotial.Style';
import {
  HumanZipyoDescription,
  HumanZipyoGuageChart,
  HumanZipyoHowToContainer,
  HumanZipyoScoreRange,
  HumanZipyoScoreText,
  HumanZipyoSubText,
} from './AboutHumanZipyo.Style';

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
