import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { media, theme, themeColor } from '@styles/themes';

export const SearchTitleContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '32px',
  boxSizing: 'border-box',
  width: '100%',
  maxWidth: '1280px',
  margin: '0 auto',

  color: theme.colors.grayscale30,

  background: theme.colors.primary100,

  [media[0]]: {
    gap: '24px',
  },
});

export const SearchTitlePriceText = styled.div({
  color: theme.colors.sub_white,
}
)
export const SearchTitleHeaderContainer = styled.div({
  display: 'flex',
  alignItems: 'end',
  justifyContent: 'space-between',
});

export const SearchTitleHeaderSymbol = styled.p({
  margin: '0',
  padding: '8px 16px',

  fontSize: '15px',

  background: theme.colors.grayscale100,
  borderRadius: '24px',

  [media[0]]: {
    padding: '4px 12px',

    fontSize: '13px',
  },
});

export const SearchTitleHeaderButton = styled.div({
  display: 'flex',
  gap: '12px',
  alignItems: 'center',
  padding: '12px 20px',

  fontWeight: '700',
  fontSize: '17px',
  lineHeight: '1',

  background: theme.colors.primary50,
  borderRadius: '8px',
  cursor: 'pointer',

  ['svg']: {
    stroke: theme.colors.primary0,

    strokeWidth: '1.5',
  },

  [media[0]]: {
    gap: '8px',
    padding: '12px 16px',

    fontSize: '15px',

    ['svg']: {
      width: '16px',
      height: '16px',
    },
  },
});

export const SearchTitleBody = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',

  [media[0]]: {
    gap: '12px',
  },
});

export const SearchTitleBodyTitle = styled.div({
  display: 'flex',
  alignItems: 'center',

  fontWeight: '700',
  fontSize: '42px',
  lineHeight: '1',
  color: theme.colors.transparent,

  [media[0]]: {
    fontSize: '32px',
  },
});

export const SearchTitleBodyTitleText = styled.div({
  ...theme.font.heading24Semibold,
  position: 'relative',

  overflow: 'hidden',
  boxSizing: 'content-box',

  textWrap: 'nowrap',
  textOverflow: 'ellipsis',
});

export const SearchTitleBodyTitleAnimatedText = styled(motion.div)({
  willChange: 'transform',
  position: 'absolute',
  top: '0',

  color: theme.colors.primary0,
});

export const SearchTitleBodyTitleSVG = styled.div({
  display: 'flex',
  paddingLeft: '12px',

  ['svg']: {
    width: '85px',
    marginRight: 'auto',

    textWrap: 'nowrap',
    overflowWrap: 'anywhere',

    fill: theme.colors.primary50,
  },

  [media[0]]: {
    paddingLeft: '8 px',

    ['svg']: {
      width: '56px',
    },
  },
});

export const SearchTitleBodySubtitle = styled.div({
  ...theme.font.body14Medium,
  color: theme.colors.sub_gray4,
  display: 'flex',
  flexDirection: 'column',
});

export const SearchTitleFooterContainer = styled.div({
  display: 'flex',
  gap: '4px',
});

export const SearchTitleFooterItems = styled.div({
  ...theme.font.body14Medium,
  color: theme.colors.sub_gray4,
  display: 'flex',
  alignItems: 'center',
},
  ({ delta }: { delta?: themeColor }) => ({
    ['span']: {
      color: theme.colors[delta ?? 'primary0'],
    },
  }),
);
