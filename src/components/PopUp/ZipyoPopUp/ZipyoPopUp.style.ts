import styled from '@emotion/styled';
import { theme } from '@styles/themes';

const ZipyoPopUpDescription = styled.p({
  ...theme.font.body16Semibold,
  color: theme.colors.sub_gray10,
  margin: '0px',
});

const ZipyoPopUpGuageChart = styled.div({
  gap: '8px',
  display: 'flex',
  flexDirection: 'column',
  boxSizing: 'border-box',
  justifyContent: 'center',
  alignItems: 'center',
});

const ZipyoPopUpGuageChartInner = styled.div({
  width: '110%',
  left: '50%',
  marginTop: '-5%',
});

const ZipyoPopUpScoreTextContainer = styled.div({
  display: 'flex',
  padding: '0px 12px',
  width: '100%',
  boxSizing: 'border-box',
});

const ScoreTextBackgroundColors = ['#11193E', '#121C46', '#141F53', '#1F359B', '#304CD1'];

const ZipyoPopUpScoreText = styled.div(
  ({ index }: { index: number }) => ({
    background: ScoreTextBackgroundColors[index],
  }),
  {
    ...theme.font.detail10Medium,
    color: theme.colors.sub_gray2,
    textAlign: 'center',
    width: '100%',
    margin: '0px',
    whiteSpace: 'nowrap',
    minWidth: '0',
  },
);

const ZipyoPopUpScoreRangeContainer = styled.div({
  display: 'flex',
  gap: '4px',
  padding: '0px 4px',
  width: '100%',
  boxSizing: 'border-box',
});

const ZipyoPopUpScoreRange = styled.span({
  ...theme.font.detail10Medium,
  color: theme.colors.sub_gray9,
  textAlign: 'center',
  width: '100%',
  margin: '0px',
  background: theme.colors.sub_white,
  borderRadius: '2px',
  position: 'relative',

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

const ZipyoPopUpHowToContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  padding: '16px 12px',
  background: theme.colors.sub_white,
  borderRadius: '8px',
  alignItems: 'flex-start',

  ['>button']: {
    background: theme.colors.sub_blue5,
    padding: '6px 10px',
    borderRadius: '4px',
    border: 'none',

    ...theme.font.detail12Semibold,
    color: theme.colors.grayscale5,
  },
});

const ZipyoPopUpHowToTextContainer = styled.div({
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
});

const ZipyoPopUpWarningText = styled.p({
  ...theme.font.detail12Semibold,
  color: theme.colors.sub_blue7,
  margin: '0px',
});

export {
  ZipyoPopUpDescription,
  ZipyoPopUpGuageChart,
  ZipyoPopUpGuageChartInner,
  ZipyoPopUpScoreTextContainer,
  ZipyoPopUpScoreText,
  ZipyoPopUpScoreRangeContainer,
  ZipyoPopUpScoreRange,
  ZipyoPopUpHowToContainer,
  ZipyoPopUpHowToTextContainer,
  ZipyoPopUpWarningText,
};
