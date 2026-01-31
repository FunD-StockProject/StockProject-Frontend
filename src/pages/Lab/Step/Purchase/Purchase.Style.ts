import styled from '@emotion/styled';
import { deltaToColor } from '@utils/ScoreConvert';
import { theme } from '@styles/themes';

const LabPurchaseContainer = styled.div({
  paddingTop: '32px',
  display: 'flex',
  flexDirection: 'column',
  gap: '36px',
  flexGrow: '1',

  ['>span.divider']: {
    height: '4px',
    width: '100%',
    background: theme.colors.sub_gray11,
  },
});

const LabPurchaseContents = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  padding: '0 20px',

  ['>p']: {
    margin: '0',
    ...theme.font.body16Medium,
    color: theme.colors.sub_white,
  },

  ['>div.category']: {
    display: 'flex',
    gap: '8px',
    padding: '0 4px',

    ['>p']: {
      background: theme.colors.sub_gray11,
      color: theme.colors.sub_gray6,
      margin: '0',
      ...theme.font.body14Semibold,
      borderRadius: '999px',
      padding: '8px 15px',

      ['&.selected']: {
        background: theme.colors.sub_blue6,
        color: theme.colors.sub_white,
      },
    },
  },
});

const LabPurchaseGridContainer = styled.div({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: '16px',
});

const LabPurchaseGridItemContainer = styled.div({
  background: theme.colors.sub_gray11,
  borderRadius: '10px',
  padding: '18px 12px',
  justifyContent: 'center',
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',

  ['>div']: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '10px',

    ['>img']: {
      width: '72px',
      height: 'auto',
      aspectRatio: '1 / 1',
      borderRadius: '999px',
      objectFit: 'contain',
    },

    ['>p']: {
      margin: '0',
      ...theme.font.body18Semibold,
      color: theme.colors.sub_gray1,
      textAlign: 'center',

      WebkitBoxOrient: 'vertical',
      display: '-webkit-box',
      WebkitLineClamp: 3,
      overflow: 'hidden',
    },

    ['>div']: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '2px',

      ['>p']: {
        display: 'flex',
        alignItems: 'center',
        gap: '4px',

        ['&.price']: {
          ...theme.font.body14Medium,
          color: theme.colors.sub_white,
        },

        ['&.score']: {
          ...theme.font.detail12Semibold,
          color: theme.colors.sub_white,
        },
      },
    },
  },

  ['>button']: {
    width: '100%',
    background: theme.colors.sub_blue6,
    color: theme.colors.sub_white,
    border: 'none',
    borderRadius: '8px',
    padding: '6px 10px',
    marginTop: 'auto',

    [':disabled']: {
      background: theme.colors.sub_black,
      color: theme.colors.sub_gray7,
    },
  },
});

const LabPurchaseGridItemText = styled.p(
  ({ delta }: { delta: number }) => ({
    ['>span']: {
      color: deltaToColor(delta) ?? theme.colors.sub_gray7,
      display: 'flex',
      alignItems: 'center',
      gap: '2px',

      ['>svg']: {
        fill: deltaToColor(delta) ?? theme.colors.sub_gray7,
      },
    },
  }),
  {
    margin: '0',

    ['>span']: {
      ['>svg']: {
        width: '8px',
        height: 'auto',
        aspectRatio: '1 / 1',
      },
    },
  },
);

const LabPurchaseToast = styled.div(
  ({ closing }: { closing: boolean }) => ({
    opacity: closing ? 0 : 1,
    transition: 'opacity 0.3s ease-in-out',
  }),
  {
    position: 'fixed',
    bottom: '110px',
    background: 'rgba(0, 0, 0, 0.75)',
    left: '20px',
    right: '20px',
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

      fill: theme.colors.sub_blue6,
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

export {
  LabPurchaseContainer,
  LabPurchaseContents,
  LabPurchaseGridContainer,
  LabPurchaseGridItemContainer,
  LabPurchaseGridItemText,
  LabPurchaseToast,
};
