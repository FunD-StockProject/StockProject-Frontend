import styled from '@emotion/styled';

const RegisterContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  alignItems: 'center',
  flexGrow: '1',
});

const RegisterDoneContents = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '10px',
  flexGrow: '1',
  justifyContent: 'center',

  ['>svg']: {
    width: '72px',
    height: 'auto',
    aspectRatio: '1 / 1',
    fill: '#3457FD',
  },

  ['>p']: {
    margin: '0',
    textAlign: 'center',

    ['&.title']: {
      fontSize: '20px',
      fontWeight: '600',
    },

    ['&.desc']: {
      fontSize: '14px',
      fontWeight: '500',
      color: '#CED4DA',
    },
  },
});

const RegisterButtonContainer = styled.div({
  padding: '0px 24px 24px',
  width: '100%',
  boxSizing: 'border-box',
});

const RegisterButton = styled.button({
  width: '100%',
  fontSize: '18px',
  fontWeight: '600',
  height: '48px',
  borderRadius: '8px',
  padding: '10px 0px',
  border: 'none',
  background: '#3457FD',
  color: 'white',
  [':disabled']: {
    color: '#101010',
  },
});

export { RegisterContainer, RegisterDoneContents, RegisterButtonContainer, RegisterButton };
