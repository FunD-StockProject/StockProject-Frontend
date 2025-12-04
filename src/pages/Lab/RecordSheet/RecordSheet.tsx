import { Fragment, useEffect, useMemo, useRef, useState } from 'react';
import ScrollTopButton from '@components/Common/ScrollTopButton/ScrollTopButton';
import ExperimentItemComponent from '@components/Lab/ExperimentItem/ExperimentItem';
import useExperimentDetailModal from '@components/Modal/ExperimentDetail/useExperimentDetail';
import { ExperimentItem, ExperimentStatusResponse } from '@controllers/experiment/api';
import { useExperimentStatusQuery } from '@controllers/experiment/query';
import ChevronDownSVG from '@assets/icons/chevronDown.svg?react';
import ChevronUpSVG from '@assets/icons/chevronUp.svg?react';
import {
  RecordSheetContainer,
  RecordSheetExperimentListContainer,
  RecordSheetHeaderContainer,
  RecordSheetHeaderTitleContainer,
  RecordSheetOrderContainer,
  RecordSheetStatusContainer,
} from './RecordSheet.Style';

type RecordOrderType = 'latest' | 'oldest' | 'gain';

const RECORD_ORDER_LABELS: Record<RecordOrderType, string> = {
  latest: '최신순',
  oldest: '오래된 순',
  gain: '수익률 순',
};

type RecordOrderOption = {
  key: RecordOrderType;
  text: string;
};

const RECORD_ORDER_OPTIONS: RecordOrderOption[] = [
  { key: 'latest', text: '최신순' },
  { key: 'oldest', text: '오래된 순' },
  { key: 'gain', text: '수익률 순' },
];

type RecordStatusType = 'PROGRESS' | 'COMPLETE';

// const RECORD_STATUS_LABELS: Record<RecordStatusType, string> = {
//   PROGRESS: '실험중',
//   COMPLETE: '실험완료',
// };

type RecordStatusOption = {
  key: RecordStatusType;
  text: string;
};

const RECORD_STATUS_OPTIONS: RecordStatusOption[] = [
  { key: 'PROGRESS', text: '실험중' },
  { key: 'COMPLETE', text: '실험완료' },
];

const RecordSheet = () => {
  const { data: experimentStatus, isLoading: isExperimentStatusLoading } = useExperimentStatusQuery();

  const { totalTradeCount = 0, progressExperiments = [], completeExperiments = [] } = experimentStatus ?? {};

  const orderContainerRef = useRef<HTMLDivElement>(null);

  const [isOpenOrderOption, setIsOpenOrderOption] = useState(false);
  const [selectedOrderOption, setSelectedOrderOption] = useState<RecordOrderType>('latest');
  const [selectedStatusOptions, setSelectedStatusOptions] = useState<RecordStatusType[]>(['PROGRESS']);
  const [totalExperiments, setTotalExperiments] = useState<ExperimentItem[]>([]);
  const filteredExperiments = useMemo(() => {
    return [
      ...(selectedStatusOptions.includes('PROGRESS') ? progressExperiments : []),
      ...(selectedStatusOptions.includes('COMPLETE') ? completeExperiments : []),
    ].sort((a, b) => {
      if (selectedOrderOption === 'latest') return b.experimentId - a.experimentId;
      if (selectedOrderOption === 'oldest') return a.experimentId - b.experimentId;

      return b.roi - a.roi;
    });
  }, [totalExperiments, selectedStatusOptions, selectedOrderOption]);

  const handleClickOrderOption = () => {
    setIsOpenOrderOption(!isOpenOrderOption);
  };

  const handleChangeOrderMethod = (orderMethod: RecordOrderType) => () => {
    setSelectedOrderOption(orderMethod);

    setIsOpenOrderOption(false);
  };

  const handleClickStatusOption = (status: RecordStatusType) => () => {
    setSelectedStatusOptions((prev) => {
      if (prev.includes(status)) {
        return prev.filter((e) => e !== status);
      }
      return [...prev, status];
    });
  };

  const handleClickExperimentDetail = (experimentId: number) => {
    openExperimentDetailModal({ experimentId });
  };

  useEffect(() => {
    if (!experimentStatus) return;
    setTotalExperiments([...progressExperiments, ...completeExperiments]);
  }, [experimentStatus]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (orderContainerRef.current && !orderContainerRef.current.contains(e.target as Node)) {
        setIsOpenOrderOption(false);
      }
    };

    if (isOpenOrderOption) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpenOrderOption]);

  const { Modal: ExperimentDetailModal, openModal: openExperimentDetailModal } = useExperimentDetailModal();

  return (
    <RecordSheetContainer>
      {ExperimentDetailModal}
      <RecordSheetHeaderContainer>
        <RecordSheetHeaderTitleContainer>
          <p>총 실험 수 {isExperimentStatusLoading ? '' : `${totalTradeCount}회`}</p>
          <RecordSheetOrderContainer ref={orderContainerRef}>
            <label onClick={handleClickOrderOption}>
              {RECORD_ORDER_LABELS[selectedOrderOption]} {isOpenOrderOption ? <ChevronUpSVG /> : <ChevronDownSVG />}
            </label>
            <ul className={isOpenOrderOption ? '' : 'hidden'}>
              {RECORD_ORDER_OPTIONS.map((option, idx, arr) => (
                <Fragment key={option.key}>
                  <li onClick={handleChangeOrderMethod(option.key)}>{option.text}</li>
                  {idx !== arr.length - 1 && <span className="divider" />}
                </Fragment>
              ))}
            </ul>
          </RecordSheetOrderContainer>
        </RecordSheetHeaderTitleContainer>
        <span className="divider" />
        <RecordSheetStatusContainer>
          {RECORD_STATUS_OPTIONS.map((e) => (
            <p
              key={e.key}
              className={`${selectedStatusOptions.includes(e.key) ? 'selected' : ''}`}
              onClick={handleClickStatusOption(e.key)}
            >
              {e.text}
            </p>
          ))}
        </RecordSheetStatusContainer>
      </RecordSheetHeaderContainer>
      {isExperimentStatusLoading ? (
        <div>Loading...</div>
      ) : (
        <RecordSheetExperimentListContainer>
          {filteredExperiments.map((experiment, idx) => (
            <ExperimentItemComponent
              key={`EXPERIMENT_ITEM_${idx}`}
              experiment={experiment}
              idx={idx}
              handleClickExperimentDetail={handleClickExperimentDetail}
            />
          ))}
        </RecordSheetExperimentListContainer>
      )}
      <ScrollTopButton />
    </RecordSheetContainer>
  );
};

export default RecordSheet;
