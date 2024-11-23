import styled from '@emotion/styled';
import theme from '../../styles/themes';

const RelatedStockContainer = styled.div({
  display: 'flex',
  margin: '0 48px',
  gap: '28px',
});

const RelatedStockItemContainer = styled.div({
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '18px',
  width: '100%',
  background: theme.colors.grayscale100,
  cursor: 'pointer',
});

const RelatedStockItemTitle = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '0 0 18px 18px',
  padding: '24px 0',
  width: '100%',
  background: theme.colors.grayscale10,
  gap: '12px',
});

export { RelatedStockContainer, RelatedStockItemContainer, RelatedStockItemTitle };
