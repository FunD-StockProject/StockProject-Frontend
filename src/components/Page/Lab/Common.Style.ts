import styled from '@emotion/styled';
import { theme } from '@styles/themes';

const ResultItemContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  margin: '0 20px',
});

const ResultItemTitle = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',

  ['>p']: {
    margin: '0',
    color: theme.colors.sub_white,
    whiteSpace: 'pre',

    ['&.title']: {
      ...theme.font.title20Semibold,
    },

    ['&.description']: {
      ...theme.font.body18Medium,
      wordBreak: 'keep-all',

      ['&.small']: {
        ...theme.font.body14Medium,
      },
    },
  },
});

const ResultItemTitleHighlight = styled.span(
  ({ type, color, background }: { type: 'RECOMMEND' | 'ZIPYO' | 'PATTERN'; color?: string; background?: string }) => ({
    color: type === 'ZIPYO' ? color : theme.colors.sub_white,
    background:
      type === 'RECOMMEND' ? `${theme.colors.sub_white}1A` : type == 'PATTERN' ? theme.colors.sub_blue6 : background,

    ...(type === 'RECOMMEND' ? theme.font.body14Semibold : theme.font.body16Semibold),
  }),
  {
    display: 'inline-block',
    padding: '4px 12px',
    borderRadius: '999px',
    marginRight: '6px',
  },
);

const ResultItemHelpContainer = styled.div({
  ...theme.font.body16Medium,
  color: theme.colors.sub_white,
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  marginLeft: 'auto',

  ['>svg']: {
    width: '14px',
    height: 'auto',
    aspectRatio: '1 / 1',
    fill: theme.colors.sub_gray9,
  },
  ['>p']: {
    margin: '0',
    ...theme.font.detail10Medium,
    color: theme.colors.sub_gray8,
    textDecoration: 'underline',
  },
});

export { ResultItemContainer, ResultItemTitle, ResultItemTitleHighlight, ResultItemHelpContainer };
