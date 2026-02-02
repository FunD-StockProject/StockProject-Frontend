import styled from '@emotion/styled';
import { media, theme } from '../../styles/themes';

const StockContainer = styled.div({ background: theme.colors.primary100, width: '100%' });

const StockContent = styled.div({
  boxSizing: 'border-box',
  width: '100%',
  margin: '0 auto',
  padding: '120px 60px',
  height: '100%',
  gap: '60px',
  display: 'flex',
  flexDirection: 'column',
  maxWidth: '1280px',

  [media[0]]: { padding: '24px 0px', gap: '45px', boxSizing: 'border-box' },

  ['>span.divider']: { backgroundColor: theme.colors.sub_gray11, height: '4px', width: '100vw' },
});

export { StockContainer, StockContent };
