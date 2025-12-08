import useModal from '@components/Modal/useModal';
import CenterTutorialLayout from '../Layout';
import AboutHumanZipyo from './AboutHumanZipyo';

const useAboutHumanZipyo = (): {
  openModal: () => void;
  closeModal: () => void;
  Modal: JSX.Element | null;
} => {
  const { Modal, openModal, closeModal } = useModal<void>({
    Layout: CenterTutorialLayout,
    Component: AboutHumanZipyo,
    modalKey: 'aboutHumanZipyo',
    showDelay: 100,
  });

  return { Modal, openModal, closeModal };
};

export default useAboutHumanZipyo;
