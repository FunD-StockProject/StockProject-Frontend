import styled from '@emotion/styled';
import { theme } from '@styles/themes';

const ShortViewContainer = styled.div({
  flexGrow: '1',
  display: 'flex',
  flexDirection: 'column',
  padding: '20px 20px 40px',
  gap: '28px',
  boxSizing: 'border-box',
  overflow: 'hidden',
});

const ShortViewButtonContainer = styled.div({
  position: 'relative',
  display: 'flex',
  gap: '20px',
  alignItems: 'center',
  justifyContent: 'center',
});

const ShortViewButton = styled.div({
  display: 'flex',
  borderRadius: '999px',

  ['>svg']: {
    height: 'auto',
    aspectRatio: '1 / 1',
  },

  ['&.cross']: {
    padding: '18px',
    background: theme.colors.sub_gray10,

    ['>svg']: {
      width: '28px',
      fill: theme.colors.sub_gray5,
    },
  },

  ['&.heart, &.heart-active']: {
    padding: '8px',
    background: theme.colors.sub_gray11,

    ['>svg']: {
      width: '36px',
    },
  },

  ['&.heart']: {
    ['>svg']: {
      fill: theme.colors.sub_gray8,
    },
  },

  ['&.heart-active']: {
    ['>svg']: {
      fill: theme.colors.sub_red,
    },
  },

  ['&.money']: {
    padding: '18px',
    background: theme.colors.sub_blue6,

    ['>svg']: {
      width: '28px',
      fill: theme.colors.sub_white,
    },
  },
});

const ShortViewContent = styled.div({
  position: 'relative',
  flexGrow: '1',
  display: 'flex',
  flexDirection: 'column-reverse',
  minHeight: '420px',
  alignItems: 'center',
  justifyContent: 'center',

  ['>svg']: {
    position: 'absolute',
  },
});

const ShortViewToast = styled.div(
  ({ closing }: { closing: boolean }) => ({
    opacity: closing ? 0 : 1,
    transition: 'opacity 0.3s ease-in-out',
  }),
  {
    position: 'absolute',
    bottom: '-16px',
    background: 'rgba(0, 0, 0, 0.75)',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    borderRadius: '5px',
    border: '1px solid rgba(73, 80, 87, 0.5)',
    padding: '12px 16px',
    boxSizing: 'border-box',
    backdropFilter: 'blur(5px)',
    boxShadow: '0px 4px 20px 0px rgba(0, 0, 0, 0.5)',
    gap: '10px',

    ['>svg']: {
      width: '24px',
      height: 'auto',
      aspectRatio: '1 / 1',

      ['&.check']: {
        fill: theme.colors.sub_gray2,
      },

      ['&.heart']: {
        fill: theme.colors.sub_red,
      },
    },

    ['>p']: {
      margin: '0',
      ...theme.font.detail12Semibold,
      color: theme.colors.sub_gray2,

      ['&.cancel']: {
        color: theme.colors.sub_gray5,
        textDecoration: 'underline',
        marginLeft: 'auto',
        cursor: 'pointer',
      },
    },
  },
);

export { ShortViewContainer, ShortViewButtonContainer, ShortViewButton, ShortViewContent, ShortViewToast };
