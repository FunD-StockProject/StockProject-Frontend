import { useState } from 'react';
import useExperimentDetailModal from '@components/Modal/ExperimentDetail/useExperimentDetail';
import { LabContainer, LabTabContainer, LabTabItemContainer } from './Lab.Style';
import LabCurrent from './LabCurrent/LabCurrent';
import LabResult from './LabResult/LabResult';

type EXPERIMENT_TAB = 'STATUS' | 'RESULT';
const experimentTabText: Record<EXPERIMENT_TAB, string> = {
  STATUS: '매수현황',
  RESULT: '매수결과',
};

const experimentTabList: { key: EXPERIMENT_TAB; text: string }[] = [
  { key: 'STATUS', text: experimentTabText.STATUS },
  { key: 'RESULT', text: experimentTabText.RESULT },
];

const Lab = () => {
  const [selectedTab, setSelectedTab] = useState<EXPERIMENT_TAB>('STATUS');

  const { Modal: ExperimentDetailModal, openModal: openExperimentDetailModal } = useExperimentDetailModal();
  return (
    <LabContainer>
      {ExperimentDetailModal}
      <LabTabContainer>
        {experimentTabList.map(({ key, text }) => (
          <LabTabItemContainer
            key={`LAB_TAB_ITEM_${key}`}
            selected={selectedTab === key}
            onClick={() => setSelectedTab(key)}
          >
            {text}
          </LabTabItemContainer>
        ))}
      </LabTabContainer>
      {selectedTab === 'STATUS' ? <LabCurrent openExperimentDetailModal={openExperimentDetailModal} /> : <LabResult />}
    </LabContainer>
  );
};

export default Lab;
