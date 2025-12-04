import BottomUpCancel from '../Layout/BottomUpCancel/BottomUpCancel';
import useModal from '../useModal';
import ExperimentDetail from './ExperimentDetail';

export interface ExperimentDetailModalData {
  experimentId: number;
}

const useExperimentDetailModal = (): {
  openModal: (modalData: ExperimentDetailModalData) => void;
  closeModal: () => void;
  Modal: JSX.Element | null;
} => {
  const { Modal, openModal, closeModal } = useModal<ExperimentDetailModalData>({
    Layout: BottomUpCancel,
    Component: ExperimentDetail,
    modalKey: 'experimentDetail',
    showDelay: 200,
  });

  return { Modal, openModal, closeModal };
};

export default useExperimentDetailModal;
