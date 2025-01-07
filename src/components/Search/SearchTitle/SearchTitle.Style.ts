import styled from '@emotion/styled';
import { deltaScoreToColor } from '@utils/ScoreConvert';
import { marquee } from '@styles/keyframes';
import { media, theme } from '@styles/themes';

const SearchTitleContainer = styled.div({
  background: theme.colors.primary100,
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  maxWidth: '1280px',
  boxSizing: 'border-box',
  margin: '0 auto',
  height: '100%',
  gap: '24px',
  fontSize: '19px',
  color: theme.colors.grayscale30,
  [media[0]]: {
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
  ({ delta, bold }: { delta?: number; bold?: boolean }) => ({
    fontWeight: bold ? '700' : '400',
    span: {
      color: deltaScoreToColor(delta ?? 0),
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

const SearchInfo = styled.div({
  display: 'flex',
  height: '50px',
  padding: '10px 8px',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '4px',
  borderRadius: '10px',
  backgroundColor: theme.colors.grayscale100,

  margin: '0px 18px',
  color: theme.colors.grayscale20,
  fontSize: '20px',
  fontWeight: '500',
  lineHeight: '1.5',

  [media[0]]: {
    height: '25px',
    fontSize: '12px',
    margin: '0 0px',
  },
});
export {
  SearchTitleContainer,
  SearchTitleCountryButton,
  SearchTitleContent,
  SearchTitleText,
  SearchTitleAnimatedText,
  SearchTitleSVG,
  SearchTitleButton,
  SearchTitleLabelContainer,
  SearchTitleLabelItem,
  SearchInfo,
};
