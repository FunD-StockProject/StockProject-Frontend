// SearchBar
import styled from '@emotion/styled';
import { media, theme } from '@styles/themes';

export const SearchBarLayout = styled.div({
  padding: '0 60px 80px',
  [media[0]]: {
    position: 'relative',
    padding: '0 20px 40px',
  },
});

export const SearchBarContainer = styled.div(
  {
    display: 'flex',
    padding: '12px',
    gap: '12px',
    fontWeight: '700',
    color: theme.colors.primary5,
    lineHeight: '1',
    background: theme.colors.primary100,
    outline: 'none',
    position: 'relative',

    [media[0]]: {
      position: 'static',
      gap: '12px',
      padding: '12px 12px',
    },
  },
  (props: { active: boolean }) => ({
    borderRadius: !props.active ? '12px' : '12px 12px 0 0',
    [media[0]]: {
      borderRadius: '8px',
    },
  }),
);

export const SearchBarInput = styled.div({
  display: 'flex',
  alignItems: 'center',
  background: theme.colors.grayscale100,
  padding: '18px',
  borderRadius: '8px',
  width: '100%',
  fontSize: '24px',
  ['input']: {
    boxSizing: 'border-box',
    width: '100%',
    border: 'none',
    background: theme.colors.transparent,
    color: theme.colors.primary0,
    outline: 'none',
    fontFamily: 'Pretendard',

    '::placeholder': {
      color: theme.colors.grayscale50,
    },
  },
  ['svg']: {
    height: '1em',
    width: 'auto',
    stroke: theme.colors.grayscale30,
    cursor: 'pointer',
  },
  [media[0]]: {
    padding: '0 12px',
    borderRadius: '4px',
    fontSize: '18px',
    ['input']: {
      padding: '12px 0',
    },
  },
});

export const SearchBarSelectBox = styled.div(
  {
    position: 'relative',
    display: 'flex',
    width: '50%',

    ['label']: {
      cursor: 'pointer',
      fontSize: '17px',
      borderRadius: '8px',
      padding: '18px',
      alignContent: 'center',
      width: '100%',
      background: theme.colors.grayscale100,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      ['span']: {
        transition: 'all 0.25s ease-in-out',
      },
      ['svg']: {
        fill: theme.colors.grayscale10,
        height: '1em',
        width: '1em',
      },
    },
    [media[0]]: {
      width: 'auto',
      ['label']: {
        ['span']: {
          width: '75px',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
        },
        fontSize: '15px',
        padding: '12px',
        borderRadius: '4px',
      },
    },
  },
  (props: { focus: boolean; minimize?: boolean }) => ({
    ...(props.focus && {
      ['label']: {
        background: theme.colors.grayscale90,
        borderRadius: '8px 8px 0 0',
        [media[0]]: {
          borderRadius: '4px 4px 0 0',
        },
      },
      ul: {
        maxHeight: '150px',
      },
    }),
    ...(props.minimize && {
      [media[0]]: {
        ['label']: {
          ['span']: {
            width: '0px',
          },
        },
      },
    }),
  }),
);

export const SearchBarSelectBoxItems = styled.ul(
  {
    cursor: 'pointer',
    position: 'absolute',
    zIndex: '20',
    top: '100%',
    listStyle: 'none',
    padding: '0',
    margin: '0',
    width: '100%',
    display: 'flex',
    maxHeight: '0',
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: '0 0 8px 8px',
    overflow: 'hidden',
    transition: 'max-height .25s ease-in-out',

    li: {
      width: '100%',
      background: theme.colors.grayscale100,
      textAlign: 'center',
      fontSize: '15px',
      padding: '18px 0',
      borderTop: `2px solid ${theme.colors.grayscale100}`,
    },

    [media[0]]: {
      borderRadius: '0 0 4px 4px',
      li: {
        fontSize: '13px',
        padding: '12px 0',
      },
    },
  },
  (props: { select: number }) => ({
    [`li:nth-of-type(${props.select + 1})`]: {
      background: theme.colors.grayscale90,
    },
  }),
);

// SearchBarResult

export const SearchBarResultLayoutContainer = styled.div(
  {
    position: 'absolute',
    zIndex: '10',
    left: '0',
    right: '0',
    top: '100%',
    overflow: 'hidden',
    height: 'auto',

    transition: 'max-height .25s ease-in-out',
    background: theme.colors.primary100,

    [media[0]]: {
      overflow: 'scroll',
      height: '100vh',
    },
  },
  (props: { height: number }) => ({
    maxHeight: props.height,
  }),
);

export const SearchBarResultLayout = styled.div({
  boxSizing: 'border-box',
  width: '100%',
  padding: '32px',

  [media[0]]: {
    padding: '32px 20px',
  },
});

export const SearchBarResultContainer = styled.div({
  display: 'flex',
  gap: '24px',
  width: '100%',
  height: '100%',

  [media[0]]: {
    flexDirection: 'column',
  },
});

export const SearchBarResultContent = styled.div(
  {
    display: 'flex',
    flexDirection: 'column',
    gap: '18px',
    boxSizing: 'content-box',
    height: '100%',
    textTransform: 'uppercase',

    [media[0]]: {
      gap: '12px',
      width: '100%',
    },
  },
  (props: { width: string }) => ({
    width: props.width,
  }),
);

export const SearchBarResultSVG = styled.div({
  width: '100%',
  height: '100%',
  boxSizing: 'border-box',
  padding: '72px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  ['svg']: {
    boxSizing: 'content-box',
    minHeight: '260px',
    width: 'auto',
    height: '100%',
  },

  [media[0]]: {
    padding: '32px',
  },
});

// SearchBarResultTitle

export const SearchBarResultTitle = styled.div({
  fontSize: '24px',
  display: 'flex',
  alignItems: 'center',
  gap: '12px',

  [media[0]]: {
    fontSize: '21px',
    gap: '8px',
  },
});

export const SearchBarResultSubtitle = styled.span({
  color: theme.colors.grayscale30,
  fontSize: '15px',
  whiteSpace: 'nowrap',
  fontWeight: '500',

  ['b']: {
    fontWeight: '900',
  },
  [media[0]]: {
    fontSize: '13px',
  },
});

// SearchBarResultItem

export const SearchBarResultGridContainer = styled.div(
  {
    display: 'grid',
    gridAutoFlow: 'column',
    columnGap: '32px',

    ['> div']: {
      padding: '8px 0',
      borderBottom: `1px solid ${theme.colors.grayscale80}`,
      overflow: 'hidden',

      ':last-child, :nth-of-type(5n)': {
        border: 'none',
      },
    },

    [media[0]]: {
      display: 'flex',
      flexDirection: 'column',
      ['> div:nth-of-type(5n):not(:last-child)']: {
        borderBottom: `1px solid ${theme.colors.grayscale80}`,
      },
    },
  },
  (props: { column: number }) => ({
    gridTemplateColumns: `repeat(${props.column}, 1fr)`,
    gridTemplateRows: `repeat(5, ${props.column}fr)`,
  }),
);

export const SearchBarResultItemContainer = styled.div({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  padding: '9px 12px 9px 18px',
  borderRadius: '0 32px 32px 0',
  cursor: 'pointer',
  fontSize: '18px',

  [':hover']: {
    background: theme.colors.grayscale100,
    ['svg']: {
      stroke: theme.colors.primary5,
    },
  },

  [media[0]]: {
    fontSize: '15px',
    padding: '6px 9px 6px 12px',
    // height: '18px',
    gap: '8px',
  },
});

export const SearchBarResultItemSVG = styled.div({
  lineHeight: 1,
  height: 'auto',
  display: 'flex',
  alignItems: 'center',
  ['> svg']: {
    width: '.9em',
    height: '.9em',
    cursor: 'pointer',
    borderRadius: '24px',
    [':hover']: {
      background: theme.colors.grayscale70,
    },
  },
  [media[0]]: {
    ['> svg']: {
      stroke: theme.colors.primary5,
    },
  },
});

export const SearchBarResultItemKeyword = styled.span(
  {
    padding: '8px 16px',
    fontSize: '15px',
    textWrap: 'nowrap',
    borderRadius: '24px',
    [media[0]]: {
      padding: '6px 12px',
      fontSize: '13px',
    },
  },
  (props: { matched: boolean }) => ({
    background: props.matched ? theme.colors.primary50 : theme.colors.grayscale80,
  }),
);

export const SearchBarResultItemSubtitle = styled.span({
  color: theme.colors.grayscale40,
  fontSize: '15px',
  whiteSpace: 'nowrap',
  [media[0]]: {
    fontSize: '11px',
  },
});

export const SearchBarResultItemTitle = styled.span({
  color: theme.colors.primary0,
  textOverflow: 'ellipsis',
  overflow: 'hidden',

  fontSize: '19px',
  marginRight: 'auto',
  whiteSpace: 'nowrap',
  ['span']: {
    color: theme.colors.primary40,
  },

  ['> div']: {
    display: 'flex',
    gap: '8px',
    fontSize: '15px',
    paddingTop: '8px',
    ['> div']: {
      color: theme.colors.grayscale60,
    },
  },

  [media[0]]: {
    fontSize: '15px',
    ['> div']: {
      paddingTop: '6px',
      gap: '6px',
      fontSize: '13px',
    },
  },
});
