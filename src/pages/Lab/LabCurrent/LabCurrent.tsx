import { useNavigate } from 'react-router-dom';
import { webPath } from '@router/index';
import ExperimentItemComponent from '@components/Lab/ExperimentItem/ExperimentItem';
import { ExperimentDetailModalData } from '@components/Modal/ExperimentDetail/useExperimentDetail';
import { useExperimentStatusQuery } from '@controllers/experiment/query';
import AddStockSVG from '@assets/icons/addStock.svg?react';
import LeftChevronSVG from '@assets/icons/chevronLeftNarrow.svg?react';
import {
  LabCurrentAddStockButton,
  LabCurrentContainer,
  LabCurrentExperimentContainer,
  LabCurrentExperimentEmptyContainer,
  LabCurrentExperimentListContainer,
  LabCurrentFirstTimeContainer,
  LabCurrentStatusContainer,
  LabCurrentStatusItemContainer,
} from './LabCurrent.Style';

const LabCurrent = ({
  openExperimentDetailModal,
}: {
  openExperimentDetailModal: ({ experimentId }: ExperimentDetailModalData) => void;
}) => {
  const navigate = useNavigate();

  const handleClickTutorial = () => {
    navigate(webPath.labStep(), { state: { step: 0 } });
  };

  const { data: experimentStatus, isLoading: isExperimentStatusLoading } = useExperimentStatusQuery();

  const {
    totalTradeCount = 0,
    progressTradeCount = 0,
    successRate = 0,
    avgRoi = 0,
    progressExperiments = [],
  } = experimentStatus ?? {};

  const statusList = [
    {
      title: '총 실험 수',
      value: `${totalTradeCount}회`,
    },
    {
      title: '성공률',
      value: `${successRate.toFixed(2)}%`,
    },
    {
      title: '평균 수익률',
      value: `${avgRoi.toFixed(2)}%`,
    },
  ];

  const handleClickAddExperiment = () => {
    navigate(webPath.labStep(), { state: { step: 1 } });
  };

  const handleClickRecordSheet = () => {
    navigate(webPath.labRecordSheet());
  };

  const handleClickExperimentDetail = (experimentId: number) => {
    openExperimentDetailModal({ experimentId });
  };

  return (
    <LabCurrentContainer>
      {totalTradeCount === 0 && (
        <LabCurrentFirstTimeContainer>
          <div>
            <p className="title">실험실이 처음이신가요?</p>
            <p className="desc">평소 눈여겨 본 종목이 있다면, 모의매수를 통해 시장 타이밍을 잡아보세요!</p>
          </div>
          <button onClick={handleClickTutorial}>
            모의매수 시작
            <LeftChevronSVG />
          </button>
        </LabCurrentFirstTimeContainer>
      )}
      <LabCurrentStatusContainer>
        <p>모의 매수 현황</p>
        <div>
          {statusList.map(({ title, value }, idx) => (
            <LabCurrentStatusItemContainer
              isImportant={idx == 0}
              key={`STATUS_${idx}`}
              onClick={idx == 0 ? handleClickRecordSheet : undefined}
            >
              <p className="title">{title}</p>
              <p className="value">{value}</p>
            </LabCurrentStatusItemContainer>
          ))}
        </div>
      </LabCurrentStatusContainer>
      <LabCurrentExperimentContainer>
        <p>진행중인 실험 {!isExperimentStatusLoading && progressExperiments.length && `${progressTradeCount}회`}</p>
        {experimentStatus &&
          (!progressTradeCount ? (
            <LabCurrentExperimentEmptyContainer>
              <p className="title">아직 진행중인 실험이 없어요 😭</p>
              <p className="desc" onClick={handleClickAddExperiment}>
                궁금한 종목 모의매수 하러가기 &gt;
              </p>
            </LabCurrentExperimentEmptyContainer>
          ) : (
            <LabCurrentExperimentListContainer>
              {progressExperiments.map((experiment, idx) => (
                <ExperimentItemComponent
                  key={`EXPERIMENT_ITEM_${idx}`}
                  experiment={experiment}
                  idx={idx}
                  handleClickExperimentDetail={handleClickExperimentDetail}
                />
              ))}
            </LabCurrentExperimentListContainer>
          ))}
      </LabCurrentExperimentContainer>
      <LabCurrentAddStockButton onClick={handleClickAddExperiment}>
        <p>종목추가</p>
        <AddStockSVG />
      </LabCurrentAddStockButton>
    </LabCurrentContainer>
  );
};

export default LabCurrent;
