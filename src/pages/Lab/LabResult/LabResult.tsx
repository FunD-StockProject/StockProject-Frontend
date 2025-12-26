import { Fragment, useMemo } from 'react';
import useAuthInfo from '@hooks/useAuthInfo';
import ScrollTopButton from '@components/Common/ScrollTopButton/ScrollTopButton';
import ReportClassChart from '@components/Lab/ReportClassChart/ReportClassChart';
import { ReportClassType, reportClassList } from '@components/Lab/ReportClassChart/ReportClassChart.Type';
import ReportPatternChart from '@components/Lab/ReportPatternChart/ReportPatternChart';
import { patternQuadrantList } from '@components/Lab/ReportPatternChart/ReportPatternChart.Type';
import useAboutReportClass from '@components/Modal/AboutReportClass/useAboutReportClass';
import useAboutReportPattern from '@components/Modal/AboutReportPattern/useAboutReportPattern';
import NoLoginWrapper from '@components/NoLoginWrapper/NoLoginWrapper';
import {
  PortfolioResultHumanIndicator,
  PortfolioResultPattern,
  PortfolioResultRecommend,
} from '@controllers/experiment/api';
import { useExperimentStatusQuery, usePortfolioResultQuery } from '@controllers/experiment/query';
import QuestionMarkSVG from '@assets/icons/questionMark.svg?react';
import {
  LabResultContainer,
  LabResultContent,
  LabResultDescription,
  LabResultEmptyContainer,
  ReportClassChartContainer,
  ReportClassContainer,
  ReportClassSummary,
  ReportHelpTextContainer,
  ReportPatternChartContainer,
  ReportPatternContainer,
  ReportPatternSummary,
  ReportRecommendContainer,
  ReportRecommendSummary,
  ReportRecommendTable,
} from './LabResult.Style';

const ReportRecommend = ({ recommend }: { recommend: PortfolioResultRecommend }) => {
  const { weeklyExperimentCount, scoreTable } = recommend;
  const tableHeaders = ['인간지표 점수대', '전체 평균 수익률', '내 평균 수익률'];

  const [lowestProfit, highestProfit] = ['min', 'max'].map((initial) =>
    scoreTable.reduce(
      (acc, curr) => {
        if (initial === 'min' ? curr.avgYieldUser > acc.value : curr.avgYieldUser < acc.value) {
          return acc;
        }
        return {
          range: curr.min === 90 ? '90점 이상' : `${curr.min}~${curr.max}점`,
          value: curr.avgYieldUser,
        };
      },
      {
        range: '',
        value: initial === 'min' ? Infinity : -Infinity,
      },
    ),
  );

  return (
    <ReportRecommendContainer>
      <ReportRecommendTable>
        <thead>
          <tr>
            {tableHeaders.map((header, idx) => (
              <th key={`REPORT_RECOMMEND_TABLE_HEADER_${idx}`}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {scoreTable.map((e, idx) => {
            const { min, max, avgYieldTotal, avgYieldUser } = e;

            const avgYieldTotalSign = !avgYieldTotal ? '' : avgYieldTotal > 0 ? '+' : '-';
            const avgYieldUserSign = !avgYieldUser ? '' : avgYieldUser > 0 ? '+' : '-';

            const range = min === 90 ? '90점 이상' : `${min}~${max}점`;

            return (
              <tr key={`REPORT_RECOMMEND_TABLE_ROW_${idx}`}>
                <td>{range}</td>
                <td>
                  {avgYieldTotalSign}
                  {Math.abs(avgYieldTotal).toFixed(1)}%
                </td>
                <td>
                  {avgYieldUserSign}
                  {Math.abs(avgYieldUser).toFixed(1)}%
                </td>
              </tr>
            );
          })}
        </tbody>
      </ReportRecommendTable>
      <ReportRecommendSummary>
        <p className="primary">이번주에 총 {weeklyExperimentCount}건의 실험을 진행하셨습니다.</p>
        <p className="secondary">
          ☺️ 가장 높은 수익률 | <b>{highestProfit.range} 구간</b> <br />
          😭 가장 낮은 수익률 | <b>{lowestProfit.range} 구간</b>
        </p>
      </ReportRecommendSummary>
    </ReportRecommendContainer>
  );
};

const ReportClass = ({
  humanIndicator,
  openHelpModal,
}: {
  humanIndicator: PortfolioResultHumanIndicator;
  openHelpModal: () => void;
}) => {
  const { type, percentile, successRate, totalBuyCount, successCount } = humanIndicator;

  const handleClickHelpModal = () => {
    openHelpModal();
  };

  const reportClass = reportClassList.find((e) => e.key === type) as ReportClassType;

  return (
    <ReportClassContainer>
      <ReportHelpTextContainer onClick={handleClickHelpModal}>
        <QuestionMarkSVG /> <span>다른 유형은 뭐가 있어요?</span>
      </ReportHelpTextContainer>
      <ReportClassChartContainer>
        <ReportClassChart reportClass={reportClass} successRate={successRate} sameGradeUserRate={percentile} />
      </ReportClassChartContainer>
      <ReportClassSummary>
        <span>{totalBuyCount}개</span> 종목을 사서, <span>{successCount}개</span> 오르는 당신의 유형!
      </ReportClassSummary>
    </ReportClassContainer>
  );
};

const ReportPattern = ({ pattern, openHelpModal }: { pattern: PortfolioResultPattern; openHelpModal: () => void }) => {
  const { type, percentile, history } = pattern;

  const handleClickHelpModal = () => {
    openHelpModal();
  };

  const reportPattern = patternQuadrantList.find((e) => e.key === type) ?? patternQuadrantList[0];

  return (
    <ReportPatternContainer>
      <ReportHelpTextContainer onClick={handleClickHelpModal}>
        <QuestionMarkSVG /> <span>각 사분면은 무슨 패턴이에요?</span>
      </ReportHelpTextContainer>
      <ReportPatternChartContainer>
        <ReportPatternChart
          reportPatternsQuadrant={patternQuadrantList.find((e) => type === e.key)?.key}
          reportPatternHistory={history}
        />
      </ReportPatternChartContainer>
      <ReportPatternSummary>
        <p className="title">
          {reportPattern.emoji} {reportPattern.title} 이란? ({percentile}% 유저가 이에 속해요)
        </p>
        <p className="description">{reportPattern.description}</p>
      </ReportPatternSummary>
    </ReportPatternContainer>
  );
};

const LabResult = () => {
  const { data: portfolioResult, isLoading: isPortfolioResultLoading } = usePortfolioResultQuery();
  const { data: experimentStatus, isLoading: isExperimentStatusLoading } = useExperimentStatusQuery();

  const { Modal: AboutReportClassModal, openModal: openAboutReportClassModal } = useAboutReportClass();
  const { Modal: AboutReportPatternModal, openModal: openAboutReportPatternModal } = useAboutReportPattern();

  const { userInfo } = useAuthInfo();

  const resultReportItems = useMemo(() => {
    if (!portfolioResult || isPortfolioResultLoading) return [];

    const { recommend, humanIndicator, pattern } = portfolioResult;

    const recommendedScoreRange = (() => {
      const range = recommend.scoreTable.reduce(
        (acc, curr) => {
          const currRoiDiff = curr.avgYieldUser - curr.avgYieldTotal;
          const minRoiDiff = acc.avgYieldUser - acc.avgYieldTotal;

          return currRoiDiff < minRoiDiff ? curr : acc;
        },
        { min: 0, max: 0, avgYieldUser: Infinity, avgYieldTotal: -Infinity },
      );

      return range.min === 90 ? '90점 이상' : `${range.min}~${range.max + 1}점`;
    })();

    const reportClass = reportClassList.find((e) => humanIndicator.type === e.key) ?? reportClassList[0];

    const reportPattern = patternQuadrantList.find((e) => pattern.type === e.key) ?? patternQuadrantList[0];

    return [
      {
        title: (
          <>
            인간지표로 보는 <wbr />내 매수 타이밍 잡는 법!
          </>
        ),
        description: (
          <LabResultDescription color="sub_gray10" isSmall>
            다음 매수 때는, <span>✨{recommendedScoreRange} 구간</span> 에 주목해보세요!
          </LabResultDescription>
        ),
        report: <ReportRecommend recommend={recommend} />,
      },
      {
        title: '나의 인간지표는?',
        description: (
          <LabResultDescription color={reportClass.color}>
            <b>{userInfo?.nickname}님</b>은{' '}
            <span>
              {reportClass.emoji} {reportClass.title}
            </span>{' '}
            지표!
          </LabResultDescription>
        ),
        report: <ReportClass humanIndicator={humanIndicator} openHelpModal={openAboutReportClassModal} />,
      },
      {
        title: '그동안 지켜본 당신의 투자패턴은',
        description: (
          <LabResultDescription color="sub_blue6">
            <span>
              {reportPattern.emoji} {reportPattern.title}
            </span>{' '}
            에 속하는 경우가 많아요
          </LabResultDescription>
        ),
        report: <ReportPattern pattern={pattern} openHelpModal={openAboutReportPatternModal} />,
      },
    ];
  }, [portfolioResult]);

  const EmptyWrapper = useMemo(() => {
    if (isPortfolioResultLoading || isExperimentStatusLoading) {
      return null;
    }

    if (!experimentStatus?.totalTradeCount) {
      return (
        <LabResultEmptyContainer>
          <p className="title">진행중인 실험이 없어요😢</p>
          <p className="subtitle">지금 바로 나만의 포트폴리오를 만들어볼까요?</p>
          <button>모의매수 시작하기</button>
        </LabResultEmptyContainer>
      );
    }

    if (!portfolioResult) {
      return (
        <LabResultEmptyContainer>
          <p className="title">아직 완성된 실험이 없어요</p>
          <p className="subtitle">
            실험 완료까지 D-1남았어요! <br />
            조금만 기다려주세요
          </p>
        </LabResultEmptyContainer>
      );
    }

    return (
      <NoLoginWrapper
        title={
          <>
            지금 로그인을 하고 <br />
            나의 매수 타이밍을 실험해보세요
          </>
        }
        description={
          <>
            👋 로그인을 하면 포트폴리오를 생성하여 진입 타이밍과 <br />
            숨겨진 투자 심리를 분석한 보고서를 받아볼 수 있어요
          </>
        }
        buttonText="회원가입/로그인 하기"
        SecondaryButtonText="홈으로 가기"
        hasHeader
        hasNavbar
      />
    );
  }, [experimentStatus, portfolioResult]);

  return (
    <LabResultContainer>
      {AboutReportClassModal}
      {AboutReportPatternModal}
      {EmptyWrapper}
      <ScrollTopButton />
      {resultReportItems.map((e, idx) => {
        return (
          <Fragment key={`REPORT_RESULT_ITEM_${idx}`}>
            {idx > 0 && <span className="divider" />}
            <LabResultContent>
              <p className="title">{e.title}</p>
              {e.description}
              {e.report}
            </LabResultContent>
          </Fragment>
        );
      })}
    </LabResultContainer>
  );
};

export default LabResult;
