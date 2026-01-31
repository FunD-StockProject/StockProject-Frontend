import styled from '@emotion/styled';
import { theme } from '@styles/themes';

const HeaderContainer = styled.div({
  paddingBottom: '8px',
  borderBottom: `4px solid ${theme.colors.sub_gray11}`,
});

const HeaderContents = styled.div({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  padding: '8px 20px',
  gap: '12px',

  ['>p']: {
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
    ...theme.font.body18Semibold,
    color: theme.colors.sub_white,
    margin: '0',
  },

  ['>svg']: {
    width: '32px',
    height: 'auto',
    aspectRatio: '1 / 1',
    cursor: 'pointer',
    fill: theme.colors.sub_gray5,
  },

  ['>span']: {
    flexGrow: 1,
  },
});

export { HeaderContainer, HeaderContents };
