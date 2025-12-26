import { Fragment, useMemo } from 'react';
import useAuthInfo from '@hooks/useAuthInfo';
import ScrollTopButton from '@components/Common/ScrollTopButton/ScrollTopButton';
import ReportClassChart from '@components/Lab/ReportClassChart/ReportClassChart';
import { ReportClassType, reportClassList } from '@components/Lab/ReportClassChart/ReportClassChart.Type';
import ReportPatternChart from '@components/Lab/ReportPatternChart/ReportPatternChart';
import { PatternQuadrant, patternQuadrantList } from '@components/Lab/ReportPatternChart/ReportPatternChart.Type';
import useAboutReportClass from '@components/Modal/AboutReportClass/useAboutReportClass';
import useAboutReportPattern from '@components/Modal/AboutReportPattern/useAboutReportPattern';
import NoLoginWrapper from '@components/NoLoginWrapper/NoLoginWrapper';
import {
  PortfolioResultExperimentSummary,
  PortfolioResultHistory,
  PortfolioResultHumanIndex,
  PortfolioResultInvestmentPattern,
  PortfolioResultScoreTable,
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

const ReportRecommend = (
  //   {
  //   reportStatisticDtos,
  //   weeklyExperimentCount,
  // }: {
  //   reportStatisticDtos: ExperimentReportStatisticDto[];
  //   weeklyExperimentCount: number;
  // }
  {
    scoreTable,
    experimentSummary,
  }: {
    scoreTable: PortfolioResultScoreTable[];
    experimentSummary: PortfolioResultExperimentSummary;
  },
) => {
  const tableHeaders = ['인간지표 점수대', '평균 ROI', '내 평균 ROI'];

  // const highestProfitScoreRange = reportStatisticDtos.reduce(
  //   (acc, curr) => {
  //     return curr.userAvgRoi > acc.userAvgRoi ? curr : acc;
  //   },
  //   { scoreRange: '', userAvgRoi: -Infinity },
  // ).scoreRange;
  // const lowestProfitScoreRange = reportStatisticDtos.reduce(
  //   (acc, curr) => {
  //     return curr.userAvgRoi < acc.userAvgRoi ? curr : acc;
  //   },
  //   { scoreRange: '', userAvgRoi: Infinity },
  // ).scoreRange;

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
            const { range, avg, median } = e;

            const avgSign = !avg ? '' : avg > 0 ? '+' : '-';
            const medianSign = !median ? '' : median > 0 ? '+' : '-';

            return (
              <tr key={`REPORT_RECOMMEND_TABLE_ROW_${idx}`}>
                <td>{range}</td>
                <td>
                  {avgSign}
                  {Math.abs(avg).toFixed(1)}%
                </td>
                <td>
                  {medianSign}
                  {Math.abs(median).toFixed(1)}%
                </td>
              </tr>
            );
          })}
          {/* {reportStatisticDtos.map((statistic, idx) => {
            const { scoreRange, totalAvgRoi, userAvgRoi } = statistic;

            const totalAvgRoiSign = !totalAvgRoi ? '' : totalAvgRoi > 0 ? '+' : '-';
            const userAvgRoiSign = !userAvgRoi ? '' : userAvgRoi > 0 ? '+' : '-';

            return (
              <tr key={`REPORT_RECOMMEND_TABLE_ROW_${idx}`}>
                <td>{scoreRange}</td>
                <td>
                  {totalAvgRoiSign}
                  {Math.abs(totalAvgRoi).toFixed(1)}%
                </td>
                <td>
                  {userAvgRoiSign}
                  {Math.abs(userAvgRoi).toFixed(1)}%
                </td>
              </tr>
            );
          })} */}
        </tbody>
      </ReportRecommendTable>
      <ReportRecommendSummary>
        <p className="primary">이번주에 총 {experimentSummary.totalExperiments}건의 실험을 진행하셨습니다.</p>
        <p className="secondary">
          ☺️ 가장 높은 수익률 | <b>{experimentSummary.highestProfit.range} 구간</b> <br />
          😭 가장 낮은 수익률 | <b>{experimentSummary.lowestProfit.range} 구간</b>
        </p>
        {/* <p className="primary">이번주에 총 {weeklyExperimentCount}건의 실험을 진행하셨습니다.</p>
        <p className="secondary">
          ☺️ 가장 높은 수익률 | <b>{highestProfitScoreRange} 구간</b> <br />
          😭 가장 낮은 수익률 | <b>{lowestProfitScoreRange} 이상 구간</b>
        </p> */}
      </ReportRecommendSummary>
    </ReportRecommendContainer>
  );
};

const ReportClass = (
  {
    reportClass,
    humanIndex,
    openHelpModal,
  }: {
    reportClass: ReportClassType;
    humanIndex: PortfolioResultHumanIndex;
    openHelpModal: () => void;
  },
  //   {
  //   reportClass,
  //   successRate,
  //   totalUserExperiments,
  //   successUserExperiments,
  //   sameGradeUserRate,
  //   openHelpModal,
  // }: {
  //   reportClass: ReportClassType;
  //   successRate: number;
  //   totalUserExperiments: number;
  //   successUserExperiments: number;
  //   sameGradeUserRate: number;
  //   openHelpModal: () => void;
  // }
) => {
  const handleClickHelpModal = () => {
    openHelpModal();
  };

  return (
    <ReportClassContainer>
      <ReportHelpTextContainer onClick={handleClickHelpModal}>
        <QuestionMarkSVG /> <span>다른 유형은 뭐가 있어요?</span>
      </ReportHelpTextContainer>
      <ReportClassChartContainer>
        <ReportClassChart
          reportClass={reportClass}
          successRate={humanIndex.userScore}
          sameGradeUserRate={humanIndex.sameGradeUserRate}
          // reportClass={reportClass} successRate={successRate} sameGradeUserRate={sameGradeUserRate}
        />
      </ReportClassChartContainer>
      <ReportClassSummary>
        <span>{humanIndex.purchasedCount}개</span> 종목을 사서, <span>{humanIndex.profitCount}개</span> 오르는 당신의
        유형!
      </ReportClassSummary>
    </ReportClassContainer>
  );
};

const ReportPattern = (
  {
    reportPattern,
    investmentPattern,
    history,
    openHelpModal,
  }: {
    reportPattern: PatternQuadrant;
    investmentPattern: PortfolioResultInvestmentPattern;
    history: PortfolioResultHistory[];
    openHelpModal: () => void;
  },
  //   {
  //   reportPatternsQuadrant,
  //   reportPatternsCoordinates,
  //   openHelpModal,
  // }: {
  //   reportPatternsQuadrant: PatternQuadrantKey;
  //   reportPatternsCoordinates: { dateLabel: string; x: number; y: number }[];
  //   openHelpModal: () => void;
  // }
) => {
  const handleClickHelpModal = () => {
    openHelpModal();
  };

  return (
    <ReportPatternContainer>
      <ReportHelpTextContainer onClick={handleClickHelpModal}>
        <QuestionMarkSVG /> <span>각 사분면은 무슨 패턴이에요?</span>
      </ReportHelpTextContainer>
      <ReportPatternChartContainer>
        <ReportPatternChart
          reportPatternsQuadrant={patternQuadrantList.find((e) => investmentPattern.patternType === e.title)?.key}
          reportPatternsCoordinates={history.map((e) => ({
            dateLabel: e.label,
            x: e.x,
            y: e.y + 50,
          }))}
          // reportPatternsQuadrant={reportPatternsQuadrant}
          // reportPatternsCoordinates={reportPatternsCoordinates}
        />
      </ReportPatternChartContainer>
      <ReportPatternSummary>
        <p className="title">
          {reportPattern.emoji} {reportPattern.title} 이란?
        </p>
        <p className="description">
          {/* 여기 문구 추가해야함 */}
          {investmentPattern.patternDescription} <br />= 남들이 관심 없을 때 진입을 해두는 경우가 많아요!
        </p>
      </ReportPatternSummary>
    </ReportPatternContainer>
  );
};

// const getResultReportItems = ({
//   recommendedScoreRange,
//   reportStatisticDtos,
//   weeklyExperimentCount,
//   reportClass,
//   successRate,
//   totalUserExperiments,
//   successUserExperiments,
//   sameGradeUserRate,
//   reportPatternsQuadrant,
//   reportPatternsCoordinates,
//   openAboutReportClassModal,
//   openAboutReportPatternModal,
//   reportPatternText,
// }: {
//   recommendedScoreRange: string;
//   reportStatisticDtos: ExperimentReportStatisticDto[];
//   weeklyExperimentCount: number;
//   reportClass: ReportClassType;
//   successRate: number;
//   totalUserExperiments: number;
//   successUserExperiments: number;
//   sameGradeUserRate: number;
//   reportPatternsQuadrant: PatternQuadrantKey;
//   reportPatternsCoordinates: { dateLabel: string; x: number; y: number }[];
//   openAboutReportClassModal: () => void;
//   openAboutReportPatternModal: () => void;
//   reportPatternText: string;
// }) => {
//   return [
//     {
//       title: (
//         <>
//           인간지표로 보는 <wbr />내 매수 타이밍 잡는 법!
//         </>
//       ),
//       description: (
//         <LabResultDescription color="sub_gray10" isSmall>
//           다음 매수 때는, <span>✨{recommendedScoreRange} 구간</span> 에 주목해보세요!
//         </LabResultDescription>
//       ),
//       report: (
//         <ReportRecommend reportStatisticDtos={reportStatisticDtos} weeklyExperimentCount={weeklyExperimentCount} />
//       ),
//     },
//     {
//       title: '나의 인간지표는?',
//       description: (
//         <LabResultDescription color={reportClass.color}>
//           <b>{localStorage.getItem('username')}님</b>은{' '}
//           <span>
//             {reportClass.emoji} {reportClass.title}
//           </span>{' '}
//           지표!
//         </LabResultDescription>
//       ),
//       report: (
//         <ReportClass
//           reportClass={reportClass}
//           successRate={successRate}
//           totalUserExperiments={totalUserExperiments}
//           successUserExperiments={successUserExperiments}
//           sameGradeUserRate={sameGradeUserRate}
//           openHelpModal={openAboutReportClassModal}
//         />
//       ),
//     },
//     {
//       title: '그동안 지켜본 당신의 투자패턴은',
//       description: (
//         <LabResultDescription color="sub_blue6">
//           <span>{reportPatternText}</span> 에 속하는 경우가 많아요
//         </LabResultDescription>
//       ),
//       report: (
//         <ReportPattern
//           reportPatternsQuadrant={reportPatternsQuadrant}
//           reportPatternsCoordinates={reportPatternsCoordinates}
//           openHelpModal={openAboutReportPatternModal}
//         />
//       ),
//     },
//   ];
// };

const LabResult = () => {
  // const { data: experimentReport, isLoading } = useExperimentReportQuery();
  // const resultReportItems = useMemo(() => {
  //   if (isLoading) return [];
  //   if (!experimentReport)
  //     return getResultReportItems({
  //       recommendedScoreRange: '',
  //       reportStatisticDtos: [],
  //       weeklyExperimentCount: 0,
  //       reportClass: reportClassList[0],
  //       successRate: 0,
  //       totalUserExperiments: 0,
  //       successUserExperiments: 0,
  //       sameGradeUserRate: 0,
  //       reportPatternsQuadrant: 'top-right',
  //       reportPatternsCoordinates: [],
  //       openAboutReportClassModal: () => {},
  //       openAboutReportPatternModal: () => {},
  //       reportPatternText: '',
  //     });

  //   const {
  //     reportStatisticDtos,
  //     reportPatternDtos,
  //     weeklyExperimentCount,
  //     totalUserExperiments,
  //     successUserExperiments,
  //     sameGradeUserRate,
  //   } = experimentReport ?? {};

  //   //

  //   const recommendedScoreRange = reportStatisticDtos.reduce(
  //     (acc, curr) => {
  //       const currRoiDiff = curr.userAvgRoi - curr.totalAvgRoi;
  //       const minRoiDiff = acc.userAvgRoi - acc.totalAvgRoi;

  //       return currRoiDiff < minRoiDiff ? curr : acc;
  //     },
  //     { scoreRange: '', userAvgRoi: Infinity, totalAvgRoi: -Infinity },
  //   ).scoreRange;

  //   //

  //   const successRate = (successUserExperiments / totalUserExperiments) * 100;

  //   const reportClass = reportClassList.find((e) => successRate < e.max) ?? reportClassList[0];

  //   //

  //   const positiveRoiMax = reportPatternDtos.reduce((acc, curr) => {
  //     if (curr.roi < 0) return acc;
  //     return Math.max(acc, curr.roi);
  //   }, 0);

  //   const negativeRoiMin = reportPatternDtos.reduce((acc, curr) => {
  //     if (curr.roi > 0) return acc;
  //     return Math.min(acc, curr.roi);
  //   }, 0);

  //   const reportPatternsCoordinates = reportPatternDtos.map((e) => {
  //     const date = new Date(e.buyAt);
  //     const [month, day] = [date.getMonth() + 1, date.getDate()].map((e) => e.toString().padStart(2, '0'));
  //     const dateLabel = `${month}${day}`;

  //     const x = e.score * 0.8 + 10;
  //     const y = (e.roi >= 0 ? e.roi / positiveRoiMax : -e.roi / negativeRoiMin) * 40 + 50;

  //     return { dateLabel, x, y };
  //   });

  //   const reportPatternsQuadrant = reportPatternsCoordinates
  //     .reduce(
  //       (acc, curr) => {
  //         const x = curr.x - 50;
  //         const y = curr.y - 50;

  //         const quadrant = x >= 0 ? (y >= 0 ? 0 : 1) : y >= 0 ? 3 : 2;

  //         acc[quadrant][0] += x;
  //         acc[quadrant][1] += y;

  //         return acc;
  //       },
  //       [
  //         [0, 0],
  //         [0, 0],
  //         [0, 0],
  //         [0, 0],
  //       ],
  //     )
  //     .reduce<{ quadrant: PatternQuadrantKey; vectorLength: number }>(
  //       (acc, curr, index) => {
  //         const vectorLength = Math.sqrt(curr[0] ** 2 + curr[1] ** 2);
  //         if (vectorLength > acc.vectorLength) {
  //           acc.quadrant = patternQuadrantKeys[index];
  //           acc.vectorLength = vectorLength;
  //         }
  //         return acc;
  //       },
  //       { quadrant: 'top-right', vectorLength: 0 },
  //     ).quadrant;

  //   const reportPatternText = patternQuadrantMap[reportPatternsQuadrant].title;

  //   return getResultReportItems({
  //     recommendedScoreRange,
  //     reportStatisticDtos,
  //     weeklyExperimentCount,
  //     reportClass,
  //     successRate,
  //     totalUserExperiments,
  //     successUserExperiments,
  //     sameGradeUserRate,
  //     reportPatternsQuadrant,
  //     reportPatternsCoordinates,
  //     openAboutReportClassModal,
  //     openAboutReportPatternModal,
  //     reportPatternText,
  //   });
  // }, [experimentReport]);

  const { data: portfolioResult, isLoading: isPortfolioResultLoading } = usePortfolioResultQuery();
  const { data: experimentStatus, isLoading: isExperimentStatusLoading } = useExperimentStatusQuery();

  const { Modal: AboutReportClassModal, openModal: openAboutReportClassModal } = useAboutReportClass();
  const { Modal: AboutReportPatternModal, openModal: openAboutReportPatternModal } = useAboutReportPattern();

  const { userInfo } = useAuthInfo();

  const resultReportItems = useMemo(() => {
    if (!portfolioResult || isPortfolioResultLoading) return [];

    const { scoreTable, experimentSummary, humanIndex, investmentPattern, history } = portfolioResult;

    const recommendedScoreRange = scoreTable.reduce(
      (acc, curr) => {
        const currRoiDiff = curr.avg - curr.median;
        const minRoiDiff = acc.avg - acc.median;

        return currRoiDiff < minRoiDiff ? curr : acc;
      },
      { range: '', avg: Infinity, median: -Infinity },
    ).range;

    const reportClass = reportClassList.find((e) => humanIndex.userType === e.title) ?? reportClassList[0];

    const reportPattern =
      patternQuadrantList.find((e) => investmentPattern.patternType === e.title) ?? patternQuadrantList[0];

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
        report: (
          <ReportRecommend
            // reportStatisticDtos={reportStatisticDtos}
            // weeklyExperimentCount={weeklyExperimentCount}
            scoreTable={scoreTable}
            experimentSummary={experimentSummary}
          />
        ),
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
        report: (
          <ReportClass
            reportClass={reportClass}
            humanIndex={humanIndex}
            openHelpModal={openAboutReportClassModal}
            // reportClass={reportClass}
            // successRate={successRate}
            // totalUserExperiments={totalUserExperiments}
            // successUserExperiments={successUserExperiments}
            // sameGradeUserRate={sameGradeUserRate}
            // openHelpModal={openAboutReportClassModal}
          />
        ),
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
        report: (
          <ReportPattern
            reportPattern={reportPattern}
            investmentPattern={investmentPattern}
            history={history}
            // reportPatternsQuadrant={reportPatternsQuadrant}
            // reportPatternsCoordinates={reportPatternsCoordinates}
            openHelpModal={openAboutReportPatternModal}
          />
        ),
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
    <LabResultContainer
    // style={{
    //   height: 'calc(100dvh - 156px)',
    //   boxSizing: 'border-box',
    //   overflow: 'hidden',
    // }}
    >
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
