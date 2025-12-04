import styled from '@emotion/styled';
import { theme } from '@styles/themes';

const LabContainer = styled.div({
  flexGrow: '1',
  display: 'flex',
  flexDirection: 'column',
  boxSizing: 'border-box',
  overflow: 'hidden',
});

const LabTabContainer = styled.div({
  borderBottom: `1px solid ${theme.colors.sub_gray8}`,
  padding: '24px 20px 0px',
  display: 'flex',
  gap: '4px',
});

const LabTabItemContainer = styled.span(
  ({ selected }: { selected: boolean }) => ({
    color: selected ? theme.colors.sub_gray1 : theme.colors.sub_gray6,
    borderBottom: `2px solid ${selected ? theme.colors.sub_gray4 : 'transparent'}`,
  }),
  {
    paddingBottom: '6px',
    width: '92px',
    textAlign: 'center',
    ...theme.font.body16Semibold,
  },
);

export { LabContainer, LabTabContainer, LabTabItemContainer };
