import styled from '@emotion/styled';

const LabDoneContainer = styled.div({
  paddingTop: '32px',
  display: 'flex',
  flexDirection: 'column',
  gap: '36px',
  flexGrow: '1',

  ['>img']: {
    borderRadius: '8px',
    margin: '0 20px',
  },
});

export { LabDoneContainer };
