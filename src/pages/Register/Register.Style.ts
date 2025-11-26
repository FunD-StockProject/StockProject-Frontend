import styled from '@emotion/styled';
import { theme } from '@styles/themes';

const RegisterContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  alignItems: 'center',
  flexGrow: '1',
  padding: '32px 0px',
  gap: '24px',
});

const RegisterContent = styled.div({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '24px',
  boxSizing: 'border-box',
  flexGrow: '1',
});

const RegisterImageContainer = styled.label({
  display: 'flex',
  position: 'relative',
  ['>img']: {
    width: '78px',
    height: 'auto',
    aspectRatio: '1 / 1',
    objectFit: 'cover',
    borderRadius: '999px',
  },
  ['>svg']: {
    position: 'absolute',
    bottom: '0',
    right: '0',
    width: '24px',
    height: 'auto',
    aspectRatio: '1 / 1',
    fill: '#ADB5BD',
    background: '#495057',
    borderRadius: '999px',
  },

  ['>input']: {
    display: 'none',
  },
});

const RegisterValueContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  width: '100%',

  ['>hr']: {
    background: '#1D1E1F',
    width: '100%',
    height: '4px',
    border: 'none',
    margin: '0',
  },
});

const RegisterInputItemContainer = styled.div(
  ({ isError }: { isError: boolean }) => ({
    ['>p']: {
      color: isError ? theme.colors.sub_red : theme.colors.sub_gray3,
    },

    ['>input']: {
      outline: isError ? `1px solid ${theme.colors.sub_red}` : 'none',
    },
  }),
  {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    padding: '0 20px',

    ['>p']: {
      margin: '0',
      ...theme.font.body16Medium,
    },

    ['>input']: {
      border: 'none',
      padding: '20px 16px',
      height: '48px',
      boxSizing: 'border-box',
      borderRadius: '5px',
      background: theme.colors.sub_gray11,
      color: theme.colors.sub_gray3,
      ...theme.font.body16Medium,

      ['&::placeholder']: {
        color: theme.colors.sub_gray8,
      },
    },
  },
);

const RegisterInputItemSubContainer = styled.div({
  display: 'flex',
  justifyContent: 'space-between',
  height: '20px',

  ['>p']: {
    margin: '0',

    ['&.error']: {
      padding: '0 4px',
      ...theme.font.body14Medium,
      color: theme.colors.sub_red,
    },

    ['&.sub']: {
      ...theme.font.body14Regular,
      color: theme.colors.sub_gray3,

      ['>span']: {
        ...theme.font.body14Semibold,
      },
    },
  },
});

const RegisterTermContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  padding: '0 20px',

  ['>p']: {
    margin: '0',
    ...theme.font.body16Medium,
    color: theme.colors.sub_gray3,
  },
});

const RegisterTermListContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',

  ['>hr']: {
    margin: '0',
    backgroundColor: theme.colors.sub_gray10,
    height: '1px',
    border: 'none',
  },
});

const RegisterTermItemContainer = styled.div({
  display: 'flex',
  gap: '8px',
  alignItems: 'center',

  ['>svg']: {
    flexShrink: '0',
    width: '28px',
    height: 'auto',
    aspectRatio: '1 / 1',
    stroke: theme.colors.sub_gray7,
    marginLeft: 'auto',
  },
});

const RegisterTermCheckBox = styled.label({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',

  ['>input[type="checkbox"]']: {
    display: 'none',
  },

  ['>svg']: {
    stroke: 'transparent',
    width: '18px',
    height: 'auto',
    aspectRatio: '1 / 1',
    borderRadius: '2px',
    border: '2px solid #525658',
    boxSizing: 'border-box',
    flexShrink: '0',
  },

  ['> input[type="checkbox"]:checked + svg']: {
    border: 'none',
    background: '#F6F6F6',
    stroke: '#101010',

    ['>svg']: {
      display: 'block',
    },
  },

  ['>p']: {
    ...theme.font.body16Regular,
    color: theme.colors.sub_white,
  },
});

const RegisterTermErrorContainer = styled.span({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  padding: '12px 16px',
  background: 'rgba(0, 0, 0, 0.8)',
  border: '1px solid rgba(73, 80, 87, 0.5)',
  borderRadius: '5px',
  marginBottom: '16px',

  ['>svg']: {
    fill: theme.colors.sub_blue6,
  },

  ['>p']: {
    ...theme.font.detail12Medium,
    color: theme.colors.sub_gray2,
    margin: '0',
  },
});

const RegisterButtonContainer = styled.div({
  position: 'relative',
  padding: '0px 20px',
  width: '100%',
  boxSizing: 'border-box',
  ['>button']: {
    width: '100%',
  },
});

export {
  RegisterContainer,
  RegisterContent,
  RegisterImageContainer,
  RegisterValueContainer,
  RegisterInputItemContainer,
  RegisterInputItemSubContainer,
  RegisterTermContainer,
  RegisterTermListContainer,
  RegisterTermItemContainer,
  RegisterTermCheckBox,
  RegisterTermErrorContainer,
  RegisterButtonContainer,
};
