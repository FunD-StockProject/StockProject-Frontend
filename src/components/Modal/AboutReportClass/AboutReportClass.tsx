import { useState } from 'react';
import ReportClassChart from '@components/Lab/ReportClassChart/ReportClassChart';
import {
  ReportClassKey,
  reportClassList,
  reportClassMap,
} from '@components/Lab/ReportClassChart/ReportClassChart.Type';
import QuestionMarkSVG from '@assets/icons/questionMark.svg?react';
import { Container, Content, ContentHeader, Header, TabContainer, TabItem } from './AboutReportClass.Style';

const AboutReportClass = () => {
  const [isSelected, setIsSelected] = useState<ReportClassKey>('worst');

  return (
    <Container>
      <Header>
        <p className="title">
          <QuestionMarkSVG /> 다른 &apos;인간지표&apos; 유형은 뭐가 있어요?
        </p>
        <p className="description">
          실험이 끝났을 때 수익률이 0이상인 실험을, <br />
          성공한 실험으로 보고 있어요
        </p>
      </Header>
      <TabContainer>
        {reportClassList.map((e) => (
          <TabItem key={e.key} onClick={() => setIsSelected(e.key)} isSelected={isSelected === e.key}>
            {e.emoji} {e.title}
          </TabItem>
        ))}
      </TabContainer>
      <Content>
        <ContentHeader>
          <p className="title">{reportClassMap[isSelected].title} 지표란?</p>
          <p className="description">
            {/* 여기 문구 추가해야 함 */}
            {reportClassMap[isSelected].description}
          </p>
        </ContentHeader>
        <span className="divider" />
        <ReportClassChart
          reportClass={reportClassMap[isSelected]}
          successRate={reportClassMap[isSelected].min + 10}
          sameGradeUserRate={10}
        />
      </Content>
    </Container>
  );
};

export default AboutReportClass;
