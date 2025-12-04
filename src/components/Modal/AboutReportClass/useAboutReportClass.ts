import BottomUpCancel from '../Layout/BottomUpCancel/BottomUpCancel';
import useModal from '../useModal';
import AboutReportClass from './AboutReportClass';

const useAboutReportClass = (): {
  openModal: () => void;
  closeModal: () => void;
  Modal: JSX.Element | null;
} => {
  const { Modal, openModal, closeModal } = useModal<void>({
    Layout: BottomUpCancel,
    Component: AboutReportClass,
    modalKey: 'aboutReportClass',
    showDelay: 200,
  });

  return { Modal, openModal, closeModal };
};

export default useAboutReportClass;
