import styled from '@emotion/styled';
import { theme } from '@styles/themes';

const AboutContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '45px',
  padding: '24px 0px 96px',
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

const AboutTrustContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  padding: '0px 20px',
});

const AboutTrustTitle = styled.span({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',

  ...theme.font.title20Semibold,
  color: theme.colors.sub_white,

  ['>svg']: {
    width: '72px',
    height: 'auto',
  },
});

const AboutTrustContents = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  padding: '20px 10px 0px',
  background: theme.colors.sub_gray11,
  borderRadius: '8px',

  ['>p']: {
    ...theme.font.detail12Medium,
    color: theme.colors.sub_gray4,
    margin: '0px',
    padding: '0px 12px',
    width: '100%',

    ['>b']: {
      ...theme.font.detail12Bold,
    },
  },
});

const AboutTrustFooter = styled.div({
  display: 'flex',
  alignItems: 'flex-end',
  gap: '8px',
  ...theme.font.body14Medium,
  color: theme.colors.sub_gray4,
  justifyContent: 'space-between',

  ['>p']: {
    ...theme.font.detail10Medium,
    color: theme.colors.sub_gray5,
    whiteSpace: 'nowrap',
    margin: '0px',
    paddingBottom: '10px',
  },

  ['>img']: {
    maxWidth: '200px',
    width: '100%',
    minWidth: '0',
  },

  ['>svg']: {
    height: '16px',
    width: 'auto',
    paddingBottom: '10px',
    flexShrink: 0,
    fill: theme.colors.sub_blue6,
  },
});

const AboutUpScrollButton = styled.span({
  position: 'fixed',
  bottom: '96px',
  right: '0%',
  zIndex: 1000,
  background: 'rgba(52, 58, 64, 0.5)',
  boxShadow: '5px 5px 10px rgba(0, 0, 0, 0.7)',
  backdropFilter: 'blur(10px)',
  borderRadius: '50%',
  padding: '12px',
  display: 'flex',
  margin: '24px',

  ['>svg']: {
    width: '32px',
    height: 'auto',
    aspectRatio: '1 / 1',
    fill: theme.colors.sub_gray2,
  },
});

export {
  AboutContainer,
  AboutTitleContainer,
  AboutGuageChartContainer,
  AboutGuageChartInner,
  AboutGuageChartTextContainer,
  AboutGuageChartLevelContainer,
  AboutGuageChartLevelItem,
  AboutGuageChartRangeContainer,
  AboutGuageChartRangeItem,
  AboutTrustContainer,
  AboutTrustTitle,
  AboutTrustContents,
  AboutTrustFooter,
  AboutUpScrollButton,
};
