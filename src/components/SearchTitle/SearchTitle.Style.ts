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
  boxSizing: 'content-box',
  gap: '12px',
  alignItems: 'center',
  width: '100%',
  fontSize: '40px',
  fontWeight: '700',
  [media[0]]: {
    gap: '8px',
    fontSize: '21px',
  },
});

const SearchTitleText = styled.div({
  textWrap: 'nowrap',
  overflow: 'hidden',
  position: 'relative',
  color: theme.colors.transparent,
});

const SearchTitleAnimatedText = styled.div(
  ({ animated }: { animated: boolean }) => animated && { animation: marquee + ' ' + 5 + 's linear infinite' },
  {
    top: '0',
    position: 'absolute',
    color: theme.colors.primary0,
  },
);

const SearchTitleSVG = styled.div({
  display: 'flex',
  ['svg']: {
    fill: theme.colors.primary40,
    height: '40px',
    width: '85px',
    marginRight: 'auto',
    textWrap: 'nowrap',
    overflowWrap: 'anywhere',
    [media[0]]: {
      height: 'auto',
      width: '45px',
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
  marginLeft: 'auto',
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
    gap: '6px',
    span: {
      fontSize: '15px',
    },
    [media[0]]: {
      padding: '8px 12px',
      gap: '4px',
      span: {
        fontSize: '10px',
      },
    },
  },
);

export {
  SearchTitleLayout,
  SearchTitleContainer,
  SearchTitleCountryButton,
  SearchTitleContent,
  SearchTitleText,
  SearchTitleAnimatedText,
  SearchTitleSVG,
  SearchTitleButton,
  SearchTitleLabelContainer,
  SearchTitleLabelItem,
};
