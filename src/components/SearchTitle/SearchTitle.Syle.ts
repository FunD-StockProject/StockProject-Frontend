import styled from '@emotion/styled';
import { marquee } from '@styles/keyframes';
import { media, theme } from '@styles/themes';

const SearchTitleLayout = styled.div({
  background: theme.colors.grayscale100,
  width: '100%',
});

const SearchTitleContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  maxWidth: '1280px',
  boxSizing: 'border-box',
  margin: '0 auto',
  padding: '60px 60px',
  height: '100%',
  gap: '24px',
  fontSize: '19px',
  color: theme.colors.grayscale30,
  [media[0]]: {
    padding: '30px 24px',
    gap: '12px',
    fontSize: '13px',
  },
});

const SearchTitleCountryButton = styled.div({
  background: theme.colors.grayscale70,
  padding: '12px 24px',
  width: 'fit-content',
  borderRadius: '64px',
  fontSize: '15px',
  color: theme.colors.primary0,
  [media[0]]: {
    fontSize: '11px',
    padding: '6px 16px',
  },
});

const SearchTitleContent = styled.div({
  display: 'flex',
  gap: '12px',
  alignItems: 'center',
});

const SearchTitleAnimatedText = styled.div({
  position: 'relative',
  height: '40px',
  overflow: 'hidden',
  flexGrow: 1,
  width: '100%',
  ['span']: {
    top: '0%',
    position: 'absolute',
    animation: marquee + ' ' + 5 + 's linear infinite',
  },
  [media[0]]: {
    height: '21px',
  },
});

const SearchTitleText = styled.div({
  flexGrow: '1',
  display: 'flex',
  gap: '12px',
  color: theme.colors.grayscale10,
  fontSize: '40px',
  fontWeight: '700',
  height: '100%',
  textWrap: 'nowrap',
  lineHeight: '1',
  alignItems: 'center',
  ['svg']: {
    fill: theme.colors.primary40,
  },
  [media[0]]: {
    fontSize: '21px',
    gap: '8px',
    ['svg']: {
      height: '21px',
      width: 'auto',
    },
  },
});

const SearchTitleButton = styled.div({
  padding: '12px 42px',
  borderRadius: '30px',
  background: theme.colors.primary50,
  fontSize: '19px',
  color: theme.colors.grayscale5,
  fontWeight: '700',
  textWrap: 'nowrap',
  [media[0]]: {
    padding: '6px 24px',
    fontSize: '13px',
  },
});

const SearchTitleLabelContainer = styled.div({
  display: 'flex',
  alignItems: 'center',
  fontSize: '19px',
  gap: '14px',
  color: theme.colors.primary0,
  lineHeight: 1,
  [media[0]]: {
    fontSize: '13px',
    gap: '8px',
  },
});

const SearchTitleLabelItem = styled.div(
  ({ delta, bold }: { delta?: boolean; bold?: boolean }) => ({
    fontWeight: bold ? '700' : '400',
    span: {
      color: delta ? theme.colors.red : theme.colors.blue,
    },
  }),
  {
    background: theme.colors.grayscale90,
    borderRadius: '6px',
    padding: '12px 18px',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    span: {
      fontSize: '15px',
    },
    [media[0]]: {
      padding: '8px 12px',
      gap: '4px',
      span: {
        fontSize: '11px',
      },
    },
  },
);

export {
  SearchTitleLayout,
  SearchTitleContainer,
  SearchTitleCountryButton,
  SearchTitleContent,
  SearchTitleAnimatedText,
  SearchTitleText,
  SearchTitleButton,
  SearchTitleLabelContainer,
  SearchTitleLabelItem,
};
