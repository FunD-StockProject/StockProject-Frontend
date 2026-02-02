import { useState } from 'react';
import ReportClassChart from '@components/Lab/ReportClassChart/ReportClassChart';
import {
  ReportClassKey,
  reportClassList,
  reportClassMap,
} from '@components/Lab/ReportClassChart/ReportClassChart.Type';
import { usePortfolioResultQuery } from '@controllers/experiment/query';
import QuestionMarkSVG from '@assets/icons/questionMark.svg?react';
import { Container, Content, ContentHeader, Header, TabContainer, TabItem } from './AboutReportClass.Style';

const AboutReportClass = () => {
  const { data: portfolioResult } = usePortfolioResultQuery();
  const [isSelected, setIsSelected] = useState<ReportClassKey>('worst');

  if (!portfolioResult) return null;
  const { humanIndicator } = portfolioResult;
  const { distribution } = humanIndicator;

  const selectedDistribution = distribution[isSelected];

  const { min, max } = reportClassMap[isSelected];

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
            {e.icon} {e.title}
          </TabItem>
        ))}
      </TabContainer>
      <Content>
        <ContentHeader>
          <p className="title">{reportClassMap[isSelected].title} 지표란?</p>
          <p className="description">
            성공률이 {min}
            {max === 100 ? '% 이상' : `~${max}%`}인 유형을 말해요
            <br />
            유저 중 {selectedDistribution}%가 이에 속한답니다
          </p>
        </ContentHeader>
        <span className="divider" />
        <ReportClassChart reportClass={reportClassMap[isSelected]} successRate={min + 10} />
      </Content>
    </Container>
  );
};

export default AboutReportClass;
