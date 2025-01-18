import styled from '@emotion/styled';
import { deltaScoreToColor } from '@utils/ScoreConvert';
import { media, theme } from '@styles/themes';

const IndicesContainer = styled.div({
  display: 'flex',
  flexDirection: 'row',
  gap: '8px',
  alignItems: 'center',
  justifyContent: 'center',

  whiteSpace: 'nowrap',
});

const IndexItem = styled.div({
  display: 'flex',
  flex: 1,
  gap: '4px',
  justifyContent: 'space-between',
  boxSizing: 'border-box',
  padding: '18px 24px',

  color: theme.colors.primary0,
  fontFamily: 'Pretendard',
  fontStyle: 'normal',
  lineHeight: '1.5',

  background: theme.colors.grayscale100,
  borderRadius: '8px',

  [media[0]]: {
    flexDirection: 'column',
    gap: '8px',
    alignItems: 'flex-start',
    justifyContent: 'center',
    padding: '12px',
  },
});

const IndexInfoContainer = styled.div({
  display: 'flex',
  gap: '4px',
  alignItems: 'center',

  fontWeight: '500',
  fontSize: '18px',

  [media[0]]: {
    fontWeight: '700',
    fontSize: '11px',
  },

  ['svg']: {
    width: 'auto',
    height: '1.25em',
  },
});

const IndexDeltaScore = styled.div(({ delta }: { delta: number }) => ({
  display: 'flex',
  gap: '4px',
  alignItems: 'center',

  color: deltaScoreToColor(delta),
  fontWeight: '700',
  fontSize: '32px',
  lineHeight: '1',

  [media[0]]: {
    margin: '0 4px',

    fontSize: '24px',
  },

  ['svg']: {
    width: 'auto',
    height: '0.5em',

    fill: deltaScoreToColor(delta),
  },
}));

export { IndicesContainer, IndexInfoContainer, IndexItem, IndexDeltaScore };
