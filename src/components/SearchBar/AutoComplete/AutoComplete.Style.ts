import styled from '@emotion/styled';
import { theme } from '@styles/themes';

const AutoCompleteEmptyContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '6px',
  alignItems: 'center',
  padding: '88px 0px',

  ['>p']: {
    margin: '0',
    whiteSpace: 'nowrap',

    ['&.empty_title']: {
      ...theme.font.body18Medium,
      color: theme.colors.sub_gray7,
    },

    ['&.empty_subtitle']: {
      ...theme.font.body14Medium,
      color: theme.colors.sub_gray6,
    },
  },
});

export { AutoCompleteEmptyContainer };
