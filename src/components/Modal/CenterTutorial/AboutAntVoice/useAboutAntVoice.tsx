import useModal from '@components/Modal/useModal';
import CenterTutorialLayout from '../Layout';
import AboutAntVoice from './AboutAntVoice';

const useAboutAntVoice = (): {
  openModal: () => void;
  closeModal: () => void;
  Modal: JSX.Element | null;
} => {
  const { Modal, openModal, closeModal } = useModal<void>({
    Layout: CenterTutorialLayout,
    Component: AboutAntVoice,
    modalKey: 'aboutAntVoice',
    showDelay: 100,
  });

  return { Modal, openModal, closeModal };
};

export default useAboutAntVoice;
