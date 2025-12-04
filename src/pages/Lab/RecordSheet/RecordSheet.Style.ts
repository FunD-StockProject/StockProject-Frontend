import styled from '@emotion/styled';
import { theme } from '@styles/themes';

const RecordSheetContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
  padding: '32px 20px 72px',
  flexGrow: '1',
});

const RecordSheetHeaderContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',

  ['>span.divider']: {
    width: '100%',
    height: '1px',
    background: theme.colors.sub_gray10,
  },
});

const RecordSheetHeaderTitleContainer = styled.div({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',

  ['>p']: {
    margin: '0',
    ...theme.font.title20Semibold,
    color: theme.colors.sub_gray1,
  },
});

const RecordSheetOrderContainer = styled.div({
  position: 'relative',

  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  flexDirection: 'column',

  ['>label']: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',

    ...theme.font.body14Regular,
    color: theme.colors.sub_gray4,

    ['>svg']: {
      width: '18px',
      height: '18px',
      fill: theme.colors.sub_gray5,
    },
  },

  ['>ul']: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    right: '0',
    listStyle: 'none',
    background: 'rgba(52, 58, 64, 0.8)',
    backdropFilter: 'blur(10px)',
    borderRadius: '5px',
    padding: '16px 18px',
    top: '100%',
    marginTop: '12px',

    ['&.hidden']: {
      display: 'none',
    },

    ['>li']: {
      ...theme.font.body16Regular,
      color: theme.colors.sub_gray4,
      cursor: 'pointer',
      whiteSpace: 'nowrap',
      textAlign: 'center',
    },

    ['>span.divider']: {
      width: '100%',
      height: '0.5px',
      background: theme.colors.sub_gray7,
    },
  },
});

const RecordSheetStatusContainer = styled.div({
  display: 'flex',
  gap: '8px',

  ['>p']: {
    margin: '0',
    ...theme.font.body14Semibold,
    color: theme.colors.sub_gray4,
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    textAlign: 'center',
    padding: '8px 16px',
    background: theme.colors.sub_gray11,
    borderRadius: '999px',

    ['&.selected']: {
      background: theme.colors.sub_blue6,
    },
  },
});

const RecordSheetExperimentListContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
});

export {
  RecordSheetContainer,
  RecordSheetHeaderContainer,
  RecordSheetHeaderTitleContainer,
  RecordSheetOrderContainer,
  RecordSheetStatusContainer,
  RecordSheetExperimentListContainer,
};
