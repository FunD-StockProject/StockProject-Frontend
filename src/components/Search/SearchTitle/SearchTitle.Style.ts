import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { media, theme, themeColor } from '@styles/themes';

export const SearchTitleContainer = styled.div({
  background: theme.colors.primary100,
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  maxWidth: '1280px',
  boxSizing: 'border-box',
  margin: '0 auto',
  gap: '32px',
  color: theme.colors.grayscale30,
  [media[0]]: {
    gap: '24px',
  },
});

export const SearchTitleHeaderContainer = styled.div({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'end',
});

export const SearchTitleHeaderSymbol = styled.p({
  margin: '0',
  fontSize: '15px',
  padding: '8px 16px',
  borderRadius: '24px',
  background: theme.colors.grayscale100,
  [media[0]]: {
    fontSize: '13px',
    padding: '4px 12px',
  },
});

export const SearchTitleHeaderButton = styled.div({
  lineHeight: '1',
  fontSize: '17px',
  padding: '12px 20px',
  borderRadius: '8px',
  background: theme.colors.primary50,
  cursor: 'pointer',
  display: 'flex',
  gap: '12px',
  alignItems: 'center',
  fontWeight: '700',
  ['svg']: {
    stroke: theme.colors.primary0,
    strokeWidth: '1.5',
  },
  [media[0]]: {
    fontSize: '15px',
    padding: '12px 16px',
    gap: '8px',
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
  fontSize: '42px',
  lineHeight: '1',
  fontWeight: '700',
  display: 'flex',
  alignItems: 'center',
  color: theme.colors.transparent,

  [media[0]]: {
    fontSize: '32px',
  },
});

export const SearchTitleBodyTitleText = styled.div({
  boxSizing: 'content-box',
  position: 'relative',
  textWrap: 'nowrap',
  overflow: 'hidden',
});

export const SearchTitleBodyTitleAnimatedText = styled(motion.div)({
  top: '0',
  position: 'absolute',
  color: theme.colors.primary0,
});

export const SearchTitleBodyTitleSVG = styled.div({
  display: 'flex',
  paddingLeft: '12px',
  ['svg']: {
    fill: theme.colors.primary50,
    width: '85px',
    marginRight: 'auto',
    textWrap: 'nowrap',
    overflowWrap: 'anywhere',
  },
  [media[0]]: {
    paddingLeft: '8 px',
    ['svg']: {
      width: '56px',
    },
  },
});

export const SearchTitleBodySubtitle = styled.div({
  display: 'flex',
  flexDirection: 'column',
  fontSize: '15px',

  [media[0]]: {
    fontSize: '11px',
  },
});

export const SearchTitleFooterContainer = styled.div({
  display: 'flex',
  gap: '12px',
});

export const SearchTitleFooterItems = styled.div(
  {
    lineHeight: '1',
    fontSize: '17px',
    padding: '12px 18px',
    display: 'flex',
    gap: '8px',
    background: theme.colors.grayscale100,
    borderRadius: '8px',
    alignItems: 'center',
    fontWeight: '700',
    ['span']: {
      fontSize: '15px',
      fontWeight: '500',
    },
    [media[0]]: {
      fontSize: '15px',
      padding: '8px 12px',
      ['span']: {
        fontSize: '13px',
      },
    },
  },
  ({ delta }: { delta?: themeColor }) => ({
    ['span']: {
      color: theme.colors[delta ?? 'primary0'],
    },
  }),
);
