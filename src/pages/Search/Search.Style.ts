import styled from '@emotion/styled';
import { media, theme } from '../../styles/themes';

const SearchResultContainer = styled.div({
  background: theme.colors.primary100,
  width: '100%',
  overflowX: 'hidden',
});

const SearchResultContents = styled.div({
  boxSizing: 'border-box',
  width: '100%',
  margin: '0 auto',
  padding: '120px 60px',
  height: '100%',
  gap: '60px',
  display: 'flex',
  flexDirection: 'column',
  maxWidth: '1280px',

  [media[0]]: {
    padding: '24px 0px',
    gap: '36px',
    boxSizing: 'border-box',
  },
});

const SearchResultItemTtile = styled.div({
  padding: '0px 20px',
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',

  ['>div.title-container']: {
    display: 'flex',
    gap: '6px',
    alignItems: 'center',

    ['>p']: {
      margin: '0px',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',

      ['&.title']: {
        ...theme.font.title20Semibold,
        color: theme.colors.sub_gray2,
        flexShrink: '0',
      },

      ['&.update-time']: {
        ...theme.font.body14Regular,
        color: theme.colors.sub_gray8,
        marginLeft: 'auto',
      },
    },
  },

  ['>div.info-container']: {
    display: 'flex',
    gap: '4px',
    alignItems: 'center',

    ['>p']: {
      ...theme.font.detail12Medium,
      color: theme.colors.sub_gray6,
      margin: '0px',
    },

    ['>svg']: {
      width: '14px',
      height: 'auto',
      aspectRatio: '1 / 1',
      fill: theme.colors.sub_gray6,
      flexShrink: '0',
    },
  },
});

const SearchResultChartContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
});

const SearchResultChartContents = styled.div({
  padding: '0px 20px',
});

const SearchResultWordCloudContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
});

const SearchResultWordCloudContents = styled.div({
  padding: '0px 20px',
});

const SearchResultRelevantContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
});

const SearchResultGaugeChartContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',

  ['.gauge-description']: {
    padding: '0 20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',

    ['p']: {
      ...theme.font.body14Regular,
      color: theme.colors.sub_gray4,
      margin: 0,
    },
  },

  ['.gauge-chart-wrapper']: {
    padding: '0 20px',
  },
});

const SentimentSection = styled.div({
  background: theme.colors.sub_gray11,
  border: `1px solid ${theme.colors.sub_gray10}`,
  borderRadius: '5px',
  margin: '16px',
  padding: '16px 12px',
  color: theme.colors.sub_gray6,
});

const SentimentTitle = styled.div({
  ...theme.font.body16Semibold,
  marginBottom: '12px',
});

const SentimentContent = styled.div({
  ...theme.font.body14Medium,
  display: 'flex',
  flexDirection: 'column',
  gap: '2px',
});

const SentimentDesc = styled.p({
  margin: 0,
});

const Divider = styled.div({
  backgroundColor: theme.colors.sub_gray11,
  height: '4px',
  width: '100vw',
});

const SearchResultAlertContainer = styled.div({
  padding: '0 20px',
  color: theme.colors.sub_gray8,
  ...theme.font.detail12Semibold,
  textAlign: 'center',
});

const SearchResultTabContainer = styled.div({
  display: 'flex',
  padding: '0 20px',
  borderBottom: `1px solid ${theme.colors.sub_gray10}`,
});

const SearchResultTabLabel = styled.label<{ isSelected: boolean }>(({ isSelected }) => ({
  cursor: 'pointer',
  padding: '12px 0',
  position: 'relative',
  flex: 1,
  textAlign: 'center',

  ['input']: {
    display: 'none',
  },

  ['span']: {
    ...theme.font.body16Semibold,
    color: isSelected ? theme.colors.sub_gray2 : theme.colors.sub_gray7,
    transition: 'color 0.2s',
  },

  ['&::after']: {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '2px',
    backgroundColor: isSelected ? theme.colors.sub_gray4 : 'transparent',
    transition: 'background-color 0.2s',
  },

  ['&:hover span']: {
    color: theme.colors.sub_gray2,
  },
}));

const SearchResultCompanyInfoContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',

  ['.company-info-content']: {
    padding: '0 20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',

    ['p']: {
      ...theme.font.body14Regular,
      color: theme.colors.sub_gray4,
      margin: 0,
      lineHeight: '1.6',
    },
  },
});

export {
  SearchResultContainer,
  SearchResultContents,
  SearchResultItemTtile,
  SearchResultChartContainer,
  SearchResultChartContents,
  SearchResultWordCloudContainer,
  SearchResultWordCloudContents,
  SearchResultRelevantContainer,
  SearchResultGaugeChartContainer,
  Divider,
  SearchResultAlertContainer,
  SearchResultTabContainer,
  SearchResultTabLabel,
  SearchResultCompanyInfoContainer,
  SentimentSection,
  SentimentTitle,
  SentimentContent,
  SentimentDesc,
};
