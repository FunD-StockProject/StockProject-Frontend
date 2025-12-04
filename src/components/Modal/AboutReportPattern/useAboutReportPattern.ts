import BottomUpCancel from '../Layout/BottomUpCancel/BottomUpCancel';
import useModal from '../useModal';
import AboutReportPattern from './AboutReportPattern';

const useAboutReportPattern = (): {
  openModal: () => void;
  closeModal: () => void;
  Modal: JSX.Element | null;
} => {
  const { Modal, openModal, closeModal } = useModal<void>({
    Layout: BottomUpCancel,
    Component: AboutReportPattern,
    modalKey: 'aboutReportPattern',
    showDelay: 200,
  });

  return { Modal, openModal, closeModal };
};

export default useAboutReportPattern;
