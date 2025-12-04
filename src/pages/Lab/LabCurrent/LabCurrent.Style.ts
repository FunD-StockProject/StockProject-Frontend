import styled from '@emotion/styled';
import { theme } from '@styles/themes';

const LabCurrentContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '36px',
  padding: '32px 20px 100px',
  flexGrow: '1',
});

const LabCurrentFirstTimeContainer = styled.div({
  background: theme.colors.sub_blue6,
  borderRadius: '8px',
  padding: '30px 24px',
  display: 'flex',
  flexDirection: 'column',
  gap: '34px',
  alignItems: 'flex-start',

  ['>div']: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',

    ['>p']: {
      margin: '0',

      ['&.title']: {
        ...theme.font.title20Semibold,
        color: theme.colors.sub_white,
      },

      ['&.desc']: {
        ...theme.font.body14Medium,
        color: theme.colors.sub_white,
      },
    },
  },

  ['>button']: {
    ...theme.font.detail12Semibold,
    color: theme.colors.sub_blue6,
    background: theme.colors.sub_white,
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    padding: '6px 10px',
    margin: '0',
    border: 'none',
    gap: '4px',

    ['>svg']: {
      width: 'auto',
      height: '18px',
    },
  },
});

const LabCurrentStatusContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',

  ['>p']: {
    margin: '0',
    ...theme.font.title20Medium,
    color: theme.colors.sub_white,
  },

  ['>div']: {
    display: 'flex',
    gap: '12px',
  },
});

const LabCurrentStatusItemContainer = styled.div(
  ({ isImportant }: { isImportant: boolean }) => ({
    background: isImportant ? theme.colors.sub_blue6 : theme.colors.sub_gray11,
    ['>p.value']: {
      color: isImportant ? theme.colors.sub_gray2 : theme.colors.sub_gray5,
    },
  }),
  {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    flexGrow: '1',
    alignItems: 'center',
    padding: '12px 0px',
    borderRadius: '8px',

    ['>p']: {
      margin: '0',
      whiteSpace: 'nowrap',

      ['&.title']: {
        color: theme.colors.sub_white,
        ...theme.font.body14Semibold,
      },
      ['&.value']: {
        ...theme.font.body14Medium,
      },
    },
  },
);

const LabCurrentExperimentContainer = styled.div({
  display: 'flex',
  flexGrow: '1',
  flexDirection: 'column',
  gap: '8px',

  ['>p']: {
    margin: '0',
    ...theme.font.title20Medium,
    color: theme.colors.sub_white,
  },
});

const LabCurrentExperimentEmptyContainer = styled.div({
  display: 'flex',
  flexGrow: '1',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',

  ['>p']: {
    margin: '0',

    ['&.title']: {
      ...theme.font.body18Medium,
      color: theme.colors.sub_gray7,
    },
    ['&.desc']: {
      ...theme.font.body14Medium,
      colot: theme.colors.sub_gray6,
      textDecoration: 'underline',
    },
  },
});

const LabCurrentExperimentListContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',

  ['::before']: {
    content: '""',
    display: 'block',
    width: '100%',
    height: '1px',
    background: theme.colors.sub_gray10,
    marginBottom: '2px',
  },
});

const LabCurrentAddStockButton = styled.div({
  position: 'fixed',
  bottom: '96px',
  right: '0',
  width: '58px',
  height: '58px',
  margin: '20px',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: theme.colors.sub_blue6,
  boxShadow: '5px 5px 10px rgba(0, 0, 0, 0.7)',
  backdropFilter: 'blur(10px)',

  ['>p']: {
    position: 'absolute',
    margin: '0',
    ...theme.font.detail10Medium,
    color: theme.colors.sub_white,
    padding: '4px 10px',
    bottom: 'calc(100% + 10px)',
    background: theme.colors.sub_blue6,
    filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))',
    backdropFilter: 'blur(10px)',
    borderRadius: '4px',

    ['::after']: {
      content: '""',
      position: 'absolute',
      bottom: '-5px',
      width: '0px',
      height: '0px',
      left: '50%',
      transform: 'translateX(-50%)',
      borderStyle: 'solid',
      borderWidth: '9px 6px 0px 6px',
      borderColor: `${theme.colors.sub_blue6} transparent transparent transparent`,
    },
  },

  ['>svg']: {
    width: '28px',
    height: 'auto',
    aspectRatio: '1 / 1',
    fill: theme.colors.sub_white,
  },
});

export {
  LabCurrentContainer,
  LabCurrentFirstTimeContainer,
  LabCurrentStatusContainer,
  LabCurrentStatusItemContainer,
  LabCurrentExperimentContainer,
  LabCurrentExperimentEmptyContainer,
  LabCurrentExperimentListContainer,
  LabCurrentAddStockButton,
};
