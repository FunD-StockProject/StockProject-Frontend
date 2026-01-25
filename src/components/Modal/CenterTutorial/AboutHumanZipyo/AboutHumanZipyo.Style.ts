import styled from '@emotion/styled';
import { theme } from '@styles/themes';

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

export {
  HumanZipyoDescription,
  HumanZipyoGuageChart,
  HumanZipyoScoreText,
  HumanZipyoScoreRange,
  HumanZipyoHowToContainer,
  HumanZipyoSubText,
};
