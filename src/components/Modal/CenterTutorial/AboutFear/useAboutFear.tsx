import useModal from '@components/Modal/useModal';
import CenterTutorialLayout from '../Layout';
import AboutFear from './AboutFear';

const useAboutFear = (): {
  openModal: () => void;
  closeModal: () => void;
  Modal: JSX.Element | null;
} => {
  const { Modal, openModal, closeModal } = useModal<void>({
    Layout: CenterTutorialLayout,
    Component: AboutFear,
    modalKey: 'aboutFear',
    showDelay: 100,
  });

  return { Modal, openModal, closeModal };
};

export default useAboutFear;
