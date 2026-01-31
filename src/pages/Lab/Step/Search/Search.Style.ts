import styled from '@emotion/styled';
import { deltaToColor } from '@utils/ScoreConvert';
import { theme } from '@styles/themes';

const LabSearchContainer = styled.div({
  paddingTop: '36px',
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

const LabSearchSelectContainer = styled.div({
  padding: '0 20px',
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',

  ['>p']: {
    margin: '0',
    ...theme.font.body16Medium,
    color: theme.colors.sub_white,
  },
});

const LabSearchSelectStockInputContainer = styled.div({
  background: theme.colors.sub_gray11,
  borderRadius: '8px',
  padding: '10px 16px',
  display: 'flex',
  gap: '4px',
  ['>p']: {
    color: theme.colors.sub_gray7,
    margin: '0',
    ...theme.font.body16Medium,
    width: '100%',
  },

  ['>svg']: {
    flexShrink: '0',
    width: '20px',
    height: 'auto',
    aspectRatio: '1 / 1',
    fill: theme.colors.sub_gray7,
  },
});

const LabSearchSelectStockResultContainer = styled.div({
  display: 'flex',
  gap: '12px',
  flexWrap: 'wrap',
});

const LabSearchSelectStockResultItemContainer = styled.div({
  background: theme.colors.sub_blue6,
  borderRadius: '999px',
  display: 'flex',
  gap: '8px',
  padding: '6px 12px',
  alignItems: 'center',
  overflow: 'hidden',

  ['>img']: {
    borderRadius: '999px',
    width: '24px',
    height: '24px',
  },

  ['>p']: {
    whiteSpace: 'nowrap',
    margin: '0',
    ...theme.font.body14Semibold,
    color: theme.colors.sub_white,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },

  ['>svg']: {
    width: '16px',
    height: 'auto',
    aspectRatio: '1 / 1',
    fill: theme.colors.sub_gray4,
  },
});

const LabSearchSelectIndustryContainer = styled.div({
  background: theme.colors.sub_gray11,
  borderRadius: '8px',
  padding: '20px 12px',
  display: 'flex',
  justifyContent: 'center',
  flexWrap: 'wrap',
  gap: '8px',
});

const LabSearchSelectIndustryItemContainer = styled.p(
  ({ isSelected }: { isSelected: boolean }) => ({
    background: isSelected ? theme.colors.sub_blue6 : theme.colors.sub_gray10,
    color: isSelected ? theme.colors.sub_white : theme.colors.sub_gray6,
  }),
  {
    whiteSpace: 'nowrap',
    borderRadius: '999px',
    padding: '8px 16px',
    margin: '0',
    ...theme.font.body16Medium,
  },
);

const LabSearchToast = styled.div(
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

// Modal

const LabSearchModalBackgroundContainer = styled.div(
  ({ isShowModal }: { isShowModal: boolean }) => ({
    background: isShowModal ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0, 0, 0, 0)',
    backdropFilter: isShowModal ? 'blur(2px)' : '',

    ['>div']: {
      bottom: isShowModal ? '0' : '-100%',
    },
  }),
  {
    position: 'fixed',
    width: '100%',
    height: '100%',
    top: '0',
    zIndex: '100',
    transition: 'all 0.2s ease-in-out',
    overflow: 'scroll',

    ['>div']: {
      background: theme.colors.sub_black,
      position: 'absolute',
      height: 'calc(100vh - 96px)',
      width: '100%',
      border: `1px solid ${theme.colors.sub_gray10}`,
      borderRadius: '16px 16px 0 0',
      boxSizing: 'border-box',
      transition: 'all 0.2s ease-in-out',
      padding: '30px 0px',
      gap: '36px',
      display: 'flex',
      flexDirection: 'column',
    },
  },
);

const LabSearchModalTitleContainer = styled.div({
  display: 'flex',
  gap: '16px',
  alignItems: 'center',
  padding: '0 20px',

  ['>svg']: {
    width: '32px',
    height: 'auto',
    aspectRatio: '1 / 1',
    cursor: 'pointer',
    flexShrink: '0',
    fill: theme.colors.sub_gray4,
  },

  ['>div']: {
    background: theme.colors.sub_gray11,
    borderRadius: '8px',
    display: 'flex',
    gap: '6px',
    padding: '10px 16px',
    minWidth: '0',

    ['>input']: {
      border: 'none',
      background: 'none',
      ...theme.font.body16Medium,
      color: theme.colors.sub_gray2,
      minWidth: '0',
      outline: 'none',

      ['::placeholder']: {
        color: theme.colors.sub_gray7,
      },
    },

    ['>svg']: {
      width: '20px',
      height: 'auto',
      aspectRatio: '1 / 1',
      cursor: 'pointer',
      flexShrink: '0',
      fill: theme.colors.sub_gray8,
    },
  },
});

const LabSearchModalContents = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  background: theme.colors.sub_black,
  padding: '0 20px 96px',
  flexGrow: '1',

  ['>p']: {
    margin: '0',
    ...theme.font.body16Medium,
    color: theme.colors.sub_white,
  },
});

const LabSearchModalPopularItemContainer = styled.div({
  display: 'flex',
  gap: '16px',
  alignItems: 'center',

  ['>p']: {
    margin: '0',
    ...theme.font.body16Medium,
    color: theme.colors.sub_blue6,
  },

  ['>div']: {
    display: 'flex',
    gap: '10px',
    alignItems: 'center',
    overflow: 'hidden',
    width: '100%',

    ['>img']: {
      width: '32px',
      height: '32px',
      aspectRatio: '1 / 1',
      borderRadius: '100%',
    },

    ['>p']: {
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      margin: '0',
      ...theme.font.body16Medium,
      color: theme.colors.sub_gray1,
    },

    ['>svg']: {
      flexShrink: '0',
      height: '24px',
      fill: theme.colors.sub_gray7,
      marginLeft: 'auto',
    },
  },
});

const LabSearchModalResultEmptyContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  flexGrow: '1',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '6px',

  ['>p']: {
    margin: '0',

    ['&.title']: {
      ...theme.font.body16Medium,
      color: theme.colors.sub_gray7,
    },

    ['&.subtitle']: {
      ...theme.font.body14Medium,
      color: theme.colors.sub_gray6,
    },
  },
});

const LabSearchModalResultItemContainer = styled.div({
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
  boxSizing: 'border-box',

  ['>img']: {
    width: '60px',
    height: '60px',
    aspectRatio: '1 / 1',
    borderRadius: '100%',
  },

  ['>svg']: {
    flexShrink: '0',
    marginLeft: 'auto',
  },
});

const LabSearchModalResultItemInfoContainer = styled.div(
  ({ delta }: { delta: number }) => ({
    ['>p>span']: {
      color: deltaToColor(delta) ?? theme.colors.sub_gray7,
      ['>svg']: {
        fill: deltaToColor(delta) ?? theme.colors.sub_gray7,
      },
    },
  }),
  {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    overflow: 'hidden',

    ['>p']: {
      margin: '0',

      ['&.title']: {
        ...theme.font.body18Semibold,
        color: theme.colors.sub_gray1,
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
      },

      ['&.score']: {
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        ...theme.font.detail12Semibold,
        color: theme.colors.sub_white,
        ['>span']: {
          ['>svg']: {
            width: '8px',
            height: 'auto',
            aspectRatio: '1 / 1',
            flexShrink: '0',
          },
        },
      },
    },
  },
);

const LabSearchModalResultButtonContainer = styled.div({
  position: 'fixed',
  bottom: '0',
  left: '0',
  right: '0',
  padding: '28px 20px',
  boxSizing: 'border-box',
  zIndex: '100',

  ['>button']: {
    background: theme.colors.sub_blue6,
    color: theme.colors.sub_white,
    width: '100%',
    border: 'none',
    borderRadius: '8px',
    padding: '10px',
    ...theme.font.body18Semibold,

    [':disabled']: {
      background: theme.colors.sub_gray8,
      color: theme.colors.sub_black,
    },
  },
});

export {
  LabSearchContainer,
  LabSearchSelectContainer,
  LabSearchSelectStockInputContainer,
  LabSearchSelectStockResultContainer,
  LabSearchSelectStockResultItemContainer,
  LabSearchSelectIndustryContainer,
  LabSearchSelectIndustryItemContainer,
  LabSearchToast,
  LabSearchModalBackgroundContainer,
  LabSearchModalTitleContainer,
  LabSearchModalContents,
  LabSearchModalPopularItemContainer,
  LabSearchModalResultEmptyContainer,
  LabSearchModalResultItemContainer,
  LabSearchModalResultItemInfoContainer,
  LabSearchModalResultButtonContainer,
};
