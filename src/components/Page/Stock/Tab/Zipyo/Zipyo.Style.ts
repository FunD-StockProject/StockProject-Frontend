import styled from '@emotion/styled';
import { deltaToColor } from '@utils/ScoreConvert';
import { theme } from '@styles/themes';

const ZipyoContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
});

const ZipyoDescContainer = styled.div({
  padding: '0 20px',

  ['>p']: {
    ...theme.font.body14Medium,
    color: theme.colors.sub_gray4,
    margin: '0',

    ['>b']: {
      ...theme.font.body14Semibold,
      color: theme.colors.sub_gray1,
    },
  },
});

const ZipyoGuageChartContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  marginTop: '-12px',

  ['>p']: {
    ...theme.font.detail12Semibold,
    color: theme.colors.sub_gray8,
    padding: '0 20px',
    margin: '0',
    textAlign: 'center',
  },
});

const ZipyoSentimentContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  margin: '0 20px',
  padding: '12px 16px',
  background: theme.colors.sub_gray11,
  border: `1px solid ${theme.colors.sub_gray10}`,
  borderRadius: '5px',
  backdropFilter: 'blur(2.5px)',

  ['>p.title']: {
    ...theme.font.body16Medium,
    color: theme.colors.sub_gray6,
    margin: '0',
  },
});

const ZipyoSentimentDesc = styled.span(
  ({ delta }: { delta: number }) => ({
    ['>svg']: {
      fill: deltaToColor(delta) ?? theme.colors.sub_gray4,
    },
  }),
  {
    ...theme.font.body14Medium,
    color: theme.colors.sub_gray6,
    margin: '0',

    ['>svg']: {
      width: '10px',
      height: 'auto',
      aspectRatio: '1 / 1',
      marginRight: '4px',
    },
  },
);

export { ZipyoContainer, ZipyoDescContainer, ZipyoGuageChartContainer, ZipyoSentimentContainer, ZipyoSentimentDesc };
