import styled from '@emotion/styled';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '@layout/Header/Header';
import { theme } from '@styles/themes';
import ArrowLeftSVG from '@assets/arrowLeft.svg?react';
import LabCountry from './Country/Country';
import LabDone from './Done/Done';
import LabPurchase from './Purchase/Purchase';
import LabSearch from './Search/Search';
import LabTutorial from './Tutorial/Tutorial';

const LabPurchaseHeaderContainer = styled.div(
  ({ stepPercent }: { stepPercent: number }) => ({
    ['>span.divider']: {
      ['::after']: {
        width: `${stepPercent}%`,
      },
    },
  }),
  {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',

    ['>span.divider']: {
      background: theme.colors.sub_gray11,
      height: '4px',
      position: 'relative',

      ['::after']: {
        content: '""',
        background: theme.colors.sub_gray9,
        height: '4px',
        position: 'absolute',
      },
    },
  },
);

const LabPurchaseHeaderContents = styled.div({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  padding: '8px 20px',
  gap: '12px',

  ['>svg']: {
    width: '32px',
    height: 'auto',
    aspectRatio: '1 / 1',
    cursor: 'pointer',
    fill: theme.colors.sub_gray5,
  },

  ['>p']: {
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
    ...theme.font.body18Semibold,
    color: theme.colors.sub_white,
    margin: '0',
  },
});

const MAX_STEP = 4;

const LabStepHeader = ({ title, step }: { title: string; step: number }) => {
  const navigate = useNavigate();

  const handleBefore = () => {
    navigate(-1);
  };

  return (
    <LabPurchaseHeaderContainer stepPercent={(step / MAX_STEP) * 100}>
      <LabPurchaseHeaderContents>
        <ArrowLeftSVG onClick={handleBefore} />
        <p>{title}</p>
      </LabPurchaseHeaderContents>
      <span className="divider" />
    </LabPurchaseHeaderContainer>
  );
};

const LabStep = () => {
  const location = useLocation();
  const { step } = location.state ?? {};

  return (
    <>
      <LabStepHeader title={step == 0 ? '실험실 소개' : '포트폴리오 생성하기'} step={step} />
      {step == 0 ? (
        <LabTutorial />
      ) : step == 1 ? (
        <LabCountry />
      ) : step == 2 ? (
        <LabSearch />
      ) : step == 3 ? (
        <LabPurchase />
      ) : (
        <LabDone />
      )}
    </>
  );
};

export default LabStep;
