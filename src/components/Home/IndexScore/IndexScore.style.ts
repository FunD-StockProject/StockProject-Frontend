import styled from '@emotion/styled';
import { deltaScoreToColor } from '@utils/ScoreConvert';
import { theme } from '@styles/themes';

const IndexScoreContainer = styled.div({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '10px',
  padding: '0 20px',
});

const IndexScoreItem = styled.div({
  minWidth: '0',
  display: 'flex',
  alignItems: 'flex-start',
  flexDirection: 'column',
  backgroundColor: theme.colors.sub_gray11,
  borderRadius: '4px',
  padding: '10px 12px',
  boxSizing: 'border-box',
});

const IndexScoreItemHeader = styled.div({
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  overflow: 'hidden',
  width: '100%',

  ['>p']: {
    ...theme.font.body18Semibold,
    color: theme.colors.sub_gray1,
    margin: '0px',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },

  ['>svg']: {
    flexShrink: '0',
    width: '16px',
    height: 'auto',
    aspectRatio: '1 / 1',
    fill: theme.colors.sub_gray6,
  },
});

const IndexScoreItemScore = styled.div(
  ({ delta }: { delta: number }) => ({
    ['>p']: {
      color: deltaScoreToColor(delta) ?? theme.colors.sub_white,
      whiteSpace: 'nowrap',
    },

    ['>svg']: {
      fill: deltaScoreToColor(delta) ?? theme.colors.sub_gray10,
      flexShrink: 0,
    },
  }),
  {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',

    ['>p']: {
      ...theme.font.heading24Semibold,
      margin: '0px',
    },
  },
);

export { IndexScoreContainer, IndexScoreItem, IndexScoreItemHeader, IndexScoreItemScore };
