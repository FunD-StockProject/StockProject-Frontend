import { SearchCategoryKey } from '@ts/SearchCategory';
import useModal from '../useModal';
import SearchBar from './SearchBar';
import SearchBarLayout from './SearchBarLayout';

export interface SearchBarModalData {
  type?: SearchCategoryKey;
  value?: string;
}

const useSearchBarModal = (): {
  openModal: (modalData: SearchBarModalData) => void;
  closeModal: () => void;
  Modal: JSX.Element | null;
} => {
  const { Modal, openModal, closeModal } = useModal<SearchBarModalData>({
    Layout: SearchBarLayout,
    Component: SearchBar,
    modalKey: 'searchBar',
    showDelay: 150,
  });

  return { Modal, openModal, closeModal };
};

export default useSearchBarModal;
