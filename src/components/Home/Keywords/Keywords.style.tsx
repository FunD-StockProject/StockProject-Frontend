import styled from '@emotion/styled';
import { media, theme } from '@styles/themes';

const KeywordsContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
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
  display: 'flex',
  flexWrap: 'wrap',
  gap: '8px',
  alignItems: 'center',
  alignSelf: 'stretch',
  justifyContent: 'center',
});

const KeywordItem = styled.div({
  padding: '12px 20px',

  color: theme.colors.primary0,
  fontWeight: 700,
  fontSize: '19px',
  fontFamily: 'Pretendard',
  fontStyle: 'normal',
  textAlign: 'right',

  backgroundColor: theme.colors.grayscale100,
  border: `1px solid ${theme.colors.grayscale100}`,
  borderRadius: '30px',

  [media[0]]: {
    fontSize: '16px',
  },
});

export { KeywordsContainer, TitleWrapper, Title, KeywordList, KeywordItem };
