import styled from '@emotion/styled';
import { theme } from '@styles/themes';

const LabCountryContainer = styled.div({
  paddingTop: '36px',
  display: 'flex',
  flexDirection: 'column',
  gap: 'auto',
  flexGrow: '1',
});

const LabTutorialCountryListContainer = styled.div({
  display: 'flex',
  gap: '20px',
  padding: '0 20px',
});

const LabTutorialCountryItemContainer = styled.div(
  ({ canNext, isSelected }: { canNext: boolean; isSelected: boolean }) => ({
    opacity: canNext && !isSelected ? 0.5 : 1,
    background: canNext && isSelected ? theme.colors.sub_blue6 : theme.colors.sub_gray11,
    ['>p']: {
      color: canNext && isSelected ? theme.colors.sub_white : theme.colors.sub_gray6,
    },
  }),
  {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    padding: '20px',
    borderRadius: '10px',
    alignItems: 'center',
    width: '100%',

    ['>img']: {
      width: '80px',
    },

    ['>p']: {
      margin: '0',
      ...theme.font.body16Medium,
    },
  },
);

export { LabCountryContainer, LabTutorialCountryListContainer, LabTutorialCountryItemContainer };
