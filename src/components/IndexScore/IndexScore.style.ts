import styled from '@emotion/styled';
import { media, theme } from '@styles/themes';

const IndicesContainer = styled.div({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '7px',
});

const IndexInfoContainer = styled.div({
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  fontSize: '24px',

  ['svg']: {
    height: '1.2em',
    width: 'auto',
  },
  [media[0]]: {
    fontSize: '12px',
  },
});

const IndexItem = styled.div({
  boxSizing: 'border-box',
  flex: 1,
  display: 'flex',
  background: theme.colors.grayscale100,
  height: '72px',
  borderRadius: '8px',
  padding: '5px 16px',
  gap: '4px',
  justifyContent: 'space-between',

  color: theme.colors.primary0,
  fontFamily: 'Pretendard',
  fontStyle: 'normal',
  fontWeight: '900',
  lineHeight: '1.5',

  [media[0]]: {
    alignItems: 'flex-start',
    flexDirection: 'column',
    justifyContent: 'center',
  },
});

const IndexDeltaScore = styled.div(({ delta }: { delta: number }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  color: delta > 0 ? theme.colors.red : theme.colors.blue,
  fontSize: '24px',

  ['svg']: {
    height: '0.5em',
    width: 'auto',
    fill: delta > 0 ? theme.colors.red : theme.colors.blue,
  },
}));

export { IndicesContainer, IndexInfoContainer, IndexItem, IndexDeltaScore };
