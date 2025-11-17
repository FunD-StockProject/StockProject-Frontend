import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { webPath } from '@router/index';
import { theme } from '@styles/themes';
import LabTutorial1PNG from '@assets/lab/labTutorial1.png';
import LabTutorial2PNG from '@assets/lab/labTutorial2.png';
import LabTutorial3PNG from '@assets/lab/labTutorial3.png';

const labTutorialList = [
  {
    title: '매수하고 싶은 종목 담기',
    img: LabTutorial1PNG,
    description: (
      <>
        현재 주가와 인간지표를 확인하고,
        <br />
        매수하고 싶은 종목을 포트폴리오에 담아보세요
      </>
    ),
  },
  {
    title: '5영업일 후 결과 확인',
    img: LabTutorial2PNG,
    description: (
      <>
        5영업일 후 수익률을 통해
        <br />내 진입타이밍을 점검해보세요
      </>
    ),
  },
  {
    title: '결과지에 적힌 심리패턴 확인하기',
    img: LabTutorial3PNG,
    description: (
      <>
        나는 과연 어떤 인간 지표인지, 다른 사용자와 비교를 통해
        <br />
        잠재된 투자 심리패턴을 분석해드려요
      </>
    ),
  },
];

const LabTutorial = () => {
  const navigate = useNavigate();

  const handlePrevStep = () => {
    navigate(-1);
  };

  const handleNextStep = () => {
    navigate(webPath.labPurchase(), { state: { step: 1 } });
  };

  return (
    <LabTutorialContainer>
      <LabTutorialTitleContainer>
        <p className="title">
          지금부터 나의 시장 진입
          <br />
          타이밍을 평가하기 위한
          <br />
          포트폴리오를 생성해보아요!
        </p>
        <p className="desc">
          * 포트폴리오에 종목을 담으면,
          <br />
          5영업일 후 수익률을 통해 나의 시장 진입 타이밍과
          <br />
          잠재된 투자 심리를 분석해드릴게요
        </p>
      </LabTutorialTitleContainer>
      <span className="divider" />
      <LabTutorialListContainer>
        {labTutorialList.map((e, i) => (
          <LabTutorialItemContaienr>
            <div>
              <p className="index">STEP {i + 1}</p>
              <span className="divider" />
              <p className="text">{e.title}</p>
            </div>
            <img src={e.img} />
            <p>{e.description}</p>
          </LabTutorialItemContaienr>
        ))}
        <p>(주의) 본 기능은 실제 투자가 아닌 "가상"으로 진행되는 모의매수 기능입니다.</p>
      </LabTutorialListContainer>
      <LabTutorialButtonContainer isEnableNext>
        <button onClick={handlePrevStep}>이전</button>
        <button onClick={handleNextStep}>다음</button>
      </LabTutorialButtonContainer>
    </LabTutorialContainer>
  );
};

const LabTutorialButtonContainer = styled.div(
  ({ isEnableNext }: { isEnableNext?: boolean }) => ({
    ['>button']: {
      [':last-of-type']: {
        background: isEnableNext ? theme.colors.sub_blue6 : theme.colors.sub_gray8,
        color: isEnableNext ? theme.colors.sub_white : theme.colors.sub_black,
      },
    },
  }),
  {
    display: 'flex',
    gap: '12px',

    ['>button']: {
      width: '100%',
      padding: '10px 0px',
      ...theme.font.body18Semibold,
      margin: '0',
      border: 'none',
      borderRadius: '8px',

      [':first-of-type']: {
        background: theme.colors.sub_gray11,
        color: theme.colors.sub_gray5,
      },
    },
  },
);

const LabTutorialItemContaienr = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  padding: '14px 16px',
  background: theme.colors.sub_gray11,
  borderRadius: '8px',
  alignItems: 'center',

  ['>div']: {
    padding: '8px 20px',
    background: theme.colors.sub_black,
    border: `1px solid ${theme.colors.sub_gray9}`,
    display: 'flex',
    gap: '10px',
    alignItems: 'center',
    borderRadius: '999px',

    ['>p']: {
      margin: '0',
      ...theme.font.body16Medium,

      ['&.index']: {
        color: theme.colors.sub_white,
        whiteSpace: 'nowrap',
      },

      ['&.text']: {
        color: theme.colors.sub_gray2,
        wordBreak: 'keep-all',
        textAlign: 'center',
      },
    },

    ['>span.divider']: {
      height: '12px',
      width: '1px',
      background: theme.colors.sub_gray8,
    },
  },

  ['>img']: {
    height: '258px',
  },

  ['>p']: {
    margin: '0',
    ...theme.font.body14Medium,
    color: theme.colors.sub_gray3,
    textAlign: 'center',
    wordBreak: 'keep-all',
  },
});

const LabTutorialListContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '36px',

  ['>p']: {
    ...theme.font.body14Medium,
    color: theme.colors.sub_gray8,
    wordBreak: 'keep-all',
    margin: '0',
  },
});

const LabTutorialTitleContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',

  ['>p']: {
    margin: '0',

    ['&.title']: {
      ...theme.font.title20Semibold,
      color: theme.colors.sub_white,
    },

    ['&.desc']: {
      ...theme.font.body14Medium,
      color: theme.colors.sub_gray6,
    },
  },
});

const LabTutorialContainer = styled.div({
  padding: '32px 20px',
  display: 'flex',
  flexDirection: 'column',
  gap: '28px',

  ['>span.divider']: {
    height: '4px',
    width: '100%',
    background: theme.colors.sub_gray11,
  },
});

export default LabTutorial;
