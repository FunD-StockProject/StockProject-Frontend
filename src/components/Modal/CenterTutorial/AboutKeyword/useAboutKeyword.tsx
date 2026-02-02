import useModal from '@components/Modal/useModal';
import CenterTutorialLayout from '../Layout';
import AboutKeyword from './AboutKeyword';

const useAboutKeyword = (): {
  openModal: () => void;
  closeModal: () => void;
  Modal: JSX.Element | null;
} => {
  const { Modal, openModal, closeModal } = useModal<void>({
    Layout: CenterTutorialLayout,
    Component: AboutKeyword,
    modalKey: 'aboutKeyword',
    showDelay: 100,
  });

  return { Modal, openModal, closeModal };
};

export default useAboutKeyword;
