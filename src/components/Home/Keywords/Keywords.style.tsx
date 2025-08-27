import styled from '@emotion/styled';
import { media, theme } from '@styles/themes';

const KeywordsContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
});

const TitleWrapper = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',

  fontFamily: 'Pretendard',
  whiteSpace: 'nowrap',

  ['> span']: {
    color: theme.colors.grayscale60,
    fontWeight: '500',
    fontSize: '15px',
  },

  [media[0]]: {
    padding: '0 20px',

    ['> span']: {
      fontSize: '11px',
    },
  },
});

const Title = styled.div({
  display: 'flex',
  alignItems: 'center',

  color: theme.colors.grayscale10,
  fontWeight: 700,
  fontSize: '32px',
  fontStyle: 'normal',
  lineHeight: '150%',

  ['svg']: {
    width: '24px',
    height: '24px',
    marginLeft: '8px',
  },

  [media[0]]: {
    fontSize: '16px',

    ['svg']: {
      width: '20px',
    },
  },
});

const KeywordList = styled.div({
  overflow: 'auto',

  whiteSpace: 'nowrap',

  msOverflowStyle: 'none',

  ['::-webkit-scrollbar']: {
    display: 'none',
  },

  [media[0]]: {
    padding: '0 20px',
  },
});

const KeywordItemConainer = styled.div({
  display: 'flex',
  gap: '12px',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',

  [media[0]]: {
    gap: '8px',
    justifyContent: 'start',
  },
});

const KeywordItem = styled.div({
  padding: '8px 24px',

  color: theme.colors.primary0,
  fontWeight: 700,
  fontSize: '19px',
  fontFamily: 'Pretendard',
  textAlign: 'right',

  backgroundColor: theme.colors.grayscale100,
  borderRadius: '30px',

  [media[0]]: {
    padding: '8px 12px',

    fontSize: '13px',
  },
});

export { KeywordsContainer, TitleWrapper, Title, KeywordList, KeywordItemConainer, KeywordItem };
