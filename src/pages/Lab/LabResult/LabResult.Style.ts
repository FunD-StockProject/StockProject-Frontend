import styled from '@emotion/styled';
import { theme } from '@styles/themes';

const LabResultContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
  padding: '32px 0 96px',
  flexGrow: '1',

  ['>span.divider']: {
    width: '100%',
    height: '4px',
    background: theme.colors.sub_gray10,
    flexShrink: '0',
  },
});

const LabResultEmptyContainer = styled.div({
  position: 'fixed',
  top: '60px',
  bottom: '96px',
  width: '100%',
  background: 'linear-gradient(180deg, rgba(16, 16, 16, 0.4) 0%, #101010 81.02%)',
  backdropFilter: 'blur(2.5px)',
  zIndex: '10',
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  alignItems: 'center',
  justifyContent: 'center',

  ['>p']: {
    margin: '0',
    textAlign: 'center',

    ['&.title']: {
      ...theme.font.title20Semibold,
      color: theme.colors.sub_gray2,
    },

    ['&.subtitle']: {
      ...theme.font.body14Medium,
      color: theme.colors.sub_gray4,
    },
  },

  ['>button']: {
    ...theme.font.body18Semibold,
    color: theme.colors.sub_gray11,
    background: theme.colors.sub_white,
    borderRadius: '999px',
    padding: '10px 0px',
    width: '170px',
    border: 'none',
    cursor: 'pointer',
  },
});

const LabResultContent = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  padding: '0 20px',

  ['>p.title']: {
    ...theme.font.title20Semibold,
    color: theme.colors.sub_white,
    margin: '0',
    whiteSpace: 'pre',
  },
});

const LabResultDescription = styled.p(
  ({ color, isSmall }: { color: keyof typeof theme.colors; isSmall?: boolean }) => ({
    ...(isSmall ? theme.font.body14Medium : theme.font.body18Semibold),
    ['>span']: {
      ...(isSmall ? theme.font.body14Semibold : theme.font.body16Semibold),
      background: theme.colors[color],
    },
  }),
  {
    color: theme.colors.sub_white,
    margin: '0',
    wordBreak: 'keep-all',
    lineHeight: '175%',

    ['>span']: {
      padding: '6px 12px',
      borderRadius: '999px',
    },
  },
);

// ReportRecommend

const ReportRecommendContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
});

const ReportRecommendTable = styled.table({
  width: '100%',
  overflow: 'hidden',
  padding: '12px 10px',
  background: theme.colors.sub_gray11,
  borderRadius: '4px',
  boxSizing: 'border-box',

  ['>thead >tr, >tbody >tr']: {
    display: 'flex',
    alignItems: 'center',
  },

  ['>thead >tr >th, >tbody >tr >td']: {
    width: '100%',
    overflow: 'hidden',
    wordBreak: 'keep-all',
    textAlign: 'center',
  },

  ['>thead >tr >th']: {
    ...theme.font.detail12Medium,
    color: theme.colors.sub_gray6,
  },

  '>tbody >tr': {
    marginTop: '8px',
    padding: '8px 0',
    boxSizing: 'border-box',

    ['&:not(:last-of-type)']: {
      borderBottom: `1px solid ${theme.colors.sub_gray9}`,
    },
  },

  ['>tbody >tr >td']: {
    ...theme.font.detail12Medium,
    color: theme.colors.sub_white,
  },
});

const ReportRecommendSummary = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',

  ['>p']: {
    margin: '0',

    ['&.primary']: {
      ...theme.font.body14Medium,
      color: theme.colors.sub_gray4,
    },

    ['&.secondary']: {
      ...theme.font.body14Medium,
      color: theme.colors.sub_gray5,

      ['>b']: {
        ...theme.font.body14Semibold,
        color: theme.colors.sub_white,
      },
    },
  },
});

const ReportHelpTextContainer = styled.div({
  display: 'flex',
  justifyContent: 'end',
  gap: '4px',

  ['>svg']: {
    width: '14px',
    height: 'auto',
    aspectRatio: '1/1',
    fill: theme.colors.sub_gray7,
  },

  ['>span']: {
    textDecoration: 'underline',
    ...theme.font.detail10Medium,
    color: theme.colors.sub_gray5,
  },
});

// ReportClass

const ReportClassContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
});

const ReportClassChartContainer = styled.div({
  width: '100%',
  background: theme.colors.sub_gray11,
  borderRadius: '4px',
  padding: '8px 10px 12px',
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
});

const ReportClassSummary = styled.p({
  margin: '0',
  ...theme.font.body14Medium,
  color: theme.colors.sub_gray1,
  wordBreak: 'keep-all',
  lineHeight: '175%',

  ['>span']: {
    color: theme.colors.sub_white,
    padding: '4px 12px',
    background: theme.colors.sub_gray10,
    borderRadius: '999px',
  },
});

// ReportPattern

const ReportPatternContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
});

const ReportPatternChartContainer = styled.div({
  width: '100%',
  background: theme.colors.sub_gray11,
  borderRadius: '4px',
  padding: '8px 10px 12px',
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
});

const ReportPatternSummary = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',

  background: theme.colors.sub_gray11,
  padding: '16px 10px',
  borderRadius: '4px',

  ['>p']: {
    margin: '0',

    ['&.title']: {
      ...theme.font.body14Semibold,
      color: theme.colors.sub_gray2,
    },

    ['&.description']: {
      ...theme.font.detail12Medium,
      color: theme.colors.sub_gray2,
      lineHeight: '175%',
    },
  },
});

export {
  LabResultContainer,
  LabResultContent,
  LabResultDescription,
  ReportRecommendContainer,
  ReportRecommendTable,
  ReportRecommendSummary,
  ReportClassContainer,
  ReportClassChartContainer,
  ReportClassSummary,
  ReportPatternContainer,
  ReportPatternChartContainer,
  ReportPatternSummary,
  LabResultEmptyContainer,
  ReportHelpTextContainer,
};
