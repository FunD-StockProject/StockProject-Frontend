import styled from '@emotion/styled';
import ReportPatternChart from '@components/Lab/ReportPatternChart/ReportPatternChart';
import { theme } from '@styles/themes';
import QuestionMarkSVG from '@assets/icons/questionMark.svg?react';

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
});

const Header = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  padding: '14px 10px',
  margin: '0 20px',

  ['>p']: {
    margin: '0',
    wordBreak: 'keep-all',

    ['&.title']: {
      ...theme.font.body18Semibold,
      color: theme.colors.sub_gray1,

      ['>svg']: {
        width: '24px',
        height: 'auto',
        aspectRatio: '1 / 1',
        fill: theme.colors.sub_white,
        flexShrink: '0',
        verticalAlign: 'middle',
      },
    },
  },

  ['>span.divider']: {
    width: '100%',
    height: '1px',
    background: theme.colors.sub_gray10,
  },
});

const HeaderContents = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
});

const HeaderContentsItem = styled.div({
  display: 'flex',
  alignItems: 'center',
  gap: '16px',

  ['>span']: {
    width: '72px',
    padding: '4px',
    borderRadius: '999px',
    background: theme.colors.sub_gray11,
    ...theme.font.body14Semibold,
    textAlign: 'center',

    ['&.roi']: {
      color: theme.colors.sub_blue6,
    },
    ['&.score']: {
      color: theme.colors.sub_red,
    },
  },

  ['>div']: {
    display: 'flex',
    flexDirection: 'column',

    ['>div']: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',

      ['>span']: {
        ...theme.font.body14Medium,
        color: theme.colors.sub_gray5,
        whiteSpace: 'nowrap',
        ['&.condition']: {
          width: '72px',
        },
      },
    },
  },
});

const Content = styled.div({
  display: 'flex',
  flexDirection: 'column',
  padding: '8px 10px 12px',
  margin: '0 20px',
  background: theme.colors.sub_gray11,
  borderRadius: '4px',
  gap: '20px',

  ['>span.divider']: {
    width: '100%',
    height: '1px',
    background: theme.colors.sub_gray10,
  },
});

const patternReads = [
  {
    key: 'roi',
    text: '수익률',
    items: [
      { key: 'success', condition: '0점 위쪽', text: '성공 🤗' },
      { key: 'failure', condition: '0점 아래쪽', text: '실패 😭' },
    ],
  },
  {
    key: 'score',
    text: '인간지표',
    items: [
      { key: 'success', condition: '50점 왼쪽', text: '성공 🤗' },
      { key: 'failure', condition: '50점 오른쪽', text: '실패 😭' },
    ],
  },
];

const AboutReportPattern = () => {
  return (
    <Container>
      <Header>
        <p className="title">
          <QuestionMarkSVG /> 각 사분면은 무슨 패턴이에요?
        </p>
        <span className="divider" />
        <HeaderContents>
          {patternReads.map((e1) => (
            <HeaderContentsItem key={`PATTERN_READ_ITEM_${e1.key}`}>
              <span className={e1.key}>{e1.text}</span>
              <div>
                {e1.items.map((e2) => (
                  <div key={`PATTERN_READ_ITEM_${e1.key}_${e2.key}`}>
                    <span className="condition">{e2.condition}</span>
                    <span className="text">→ 실험 {e2.text}</span>
                  </div>
                ))}
              </div>
            </HeaderContentsItem>
          ))}
        </HeaderContents>
      </Header>
      <Content>
        <ReportPatternChart isTutorial={true} />
      </Content>
    </Container>
  );
};

export default AboutReportPattern;
