import useModal from '../useModal';
import MockPurchase from './MockPurchase';
import MockPurchaseLayout from './MockPurchaseLayout';

const useMockPurchase = (): {
  openModal: () => void;
  closeModal: () => void;
  Modal: JSX.Element | null;
} => {
  const { Modal, openModal, closeModal } = useModal<void>({
    Layout: MockPurchaseLayout,
    Component: MockPurchase,
    modalKey: 'mockPurchase',
    showDelay: 200,
  });

  return { Modal, openModal, closeModal };
};

export default useMockPurchase;
