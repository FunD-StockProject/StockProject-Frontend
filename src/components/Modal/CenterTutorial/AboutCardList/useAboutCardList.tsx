import useModal from '@components/Modal/useModal';
import CenterTutorialLayout from '../Layout';
import AboutCardList from './AboutCardList';

export type CardListType = 'HOT' | 'RISING' | 'DESCENT';

export interface AboutCardListModalData {
  type: CardListType;
}

const useAboutCardList = (
  type: CardListType,
): {
  openModal: (modalData: AboutCardListModalData) => void;
  closeModal: () => void;
  Modal: JSX.Element | null;
} => {
  const { Modal, openModal, closeModal } = useModal<AboutCardListModalData>({
    Layout: CenterTutorialLayout,
    Component: AboutCardList,
    modalKey: `aboutCardList_${type}`,
    showDelay: 100,
  });

  return { Modal, openModal, closeModal };
};

export default useAboutCardList;
