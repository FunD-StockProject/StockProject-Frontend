import styled from '@emotion/styled';
import { deltaScoreToColor } from '@utils/ScoreConvert';
import { media, theme } from '@styles/themes';

const IndicesContainer = styled.div({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',
  whiteSpace: 'nowrap',
});

const IndexItem = styled.div({
  boxSizing: 'border-box',
  flex: 1,
  display: 'flex',
  background: theme.colors.grayscale100,
  borderRadius: '8px',
  padding: '18px 24px',
  gap: '4px',
  justifyContent: 'space-between',

  color: theme.colors.primary0,
  fontFamily: 'Pretendard',
  fontStyle: 'normal',
  lineHeight: '1.5',

  [media[0]]: {
    padding: '12px',
    alignItems: 'flex-start',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: '8px',
  },
});

const IndexInfoContainer = styled.div({
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  fontSize: '18px',
  fontWeight: '500',

  ['svg']: {
    height: '1.25em',
    width: 'auto',
  },
  [media[0]]: {
    fontWeight: '700',
    fontSize: '11px',
  },
});

const IndexDeltaScore = styled.div(({ delta }: { delta: number }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  color: deltaScoreToColor(delta),
  fontSize: '32px',
  fontWeight: '700',
  lineHeight: '1',

  ['svg']: {
    height: '0.5em',
    width: 'auto',
    fill: deltaScoreToColor(delta),
  },
  [media[0]]: {
    fontSize: '24px',
    margin: '0 4px',
  },
}));

export { IndicesContainer, IndexInfoContainer, IndexItem, IndexDeltaScore };
