import ReportPatternChart from '@components/Lab/ReportPatternChart/ReportPatternChart';
import QuestionMarkSVG from '@assets/icons/questionMark.svg?react';
import { Container, Content, Header, HeaderContents, HeaderContentsItem } from './AboutReportPattern.Style';

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
