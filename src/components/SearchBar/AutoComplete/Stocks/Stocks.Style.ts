import styled from '@emotion/styled';
import { theme } from '@styles/themes';

const AutoCompleteStocksItem = styled.div({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  overflow: 'hidden',
  width: '100%',

  ['>p']: {
    margin: '0',

    ['&.country']: {
      ...theme.font.body14Medium,
      color: theme.colors.sub_gray6,
      flexShrink: '0',
    },

    ['&.name']: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      ...theme.font.body16Semibold,
      color: theme.colors.sub_gray1,

      ['>b']: {
        ...theme.font.body16Semibold,
        color: theme.colors.sub_blue5,
      },

      ['>span']: {
        padding: '0 4px',
        ...theme.font.detail12Semibold,
        color: theme.colors.sub_gray6,

        ['>b']: {
          ...theme.font.detail12Semibold,
          color: theme.colors.sub_blue5,
        },
      },
    },
  },
});

export { AutoCompleteStocksItem };
