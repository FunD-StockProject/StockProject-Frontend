import { useMemo } from 'react';
import ScrollTopButton from '@components/Common/ScrollTopButton/ScrollTopButton';
import useAboutReportClass from '@components/Modal/AboutReportClass/useAboutReportClass';
import useAboutReportPattern from '@components/Modal/AboutReportPattern/useAboutReportPattern';
import NoLoginWrapper from '@components/NoLoginWrapper/NoLoginWrapper';
import LabResultPattern from '@components/Page/Lab/ResultPattern/ResultPattern';
import LabResultRecommend from '@components/Page/Lab/ResultRecommend/ResultRecommend';
import LabResultZipyo from '@components/Page/Lab/ResultZipyo/ResultZipyo';
import { useExperimentStatusQuery, usePortfolioResultQuery } from '@controllers/experiment/query';
import { LabResultContainer, LabResultEmptyContainer } from './LabResult.Style';

const LabResult = () => {
  const { data: portfolioResult, isLoading: isPortfolioResultLoading } = usePortfolioResultQuery();
  const { data: experimentStatus, isLoading: isExperimentStatusLoading } = useExperimentStatusQuery();

  const { Modal: AboutReportClassModal, openModal: openAboutReportClassModal } = useAboutReportClass();
  const { Modal: AboutReportPatternModal, openModal: openAboutReportPatternModal } = useAboutReportPattern();

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
      <LabResultRecommend recommend={portfolioResult?.recommend} />
      <span className="divider" />
      <LabResultZipyo humanIndicator={portfolioResult?.humanIndicator} openHelpModal={openAboutReportClassModal} />
      <span className="divider" />
      <LabResultPattern pattern={portfolioResult?.pattern} openHelpModal={openAboutReportPatternModal} />
      {/* {resultReportItems.map((e, idx) => {
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
      })} */}
    </LabResultContainer>
  );
};

export default LabResult;
