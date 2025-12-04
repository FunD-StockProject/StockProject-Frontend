import { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export interface ModalLayoutProps {
  children?: React.ReactNode;
  isShowModal: boolean;
  modalRef: React.RefObject<HTMLDivElement>;
  handleClickOutSide: (e: React.MouseEvent<HTMLDivElement>) => void;
  closeModal: () => void;
  showDelay: number;
}

const useModal = <T,>({
  Layout,
  Component,
  modalKey,
  showDelay = 0,
}: {
  Layout: ({
    children,
    isShowModal,
    modalRef,
    handleClickOutSide,
    closeModal,
    showDelay,
  }: ModalLayoutProps) => JSX.Element;
  Component: ({ modalData }: { modalData: T }) => JSX.Element | null;
  modalKey: string;
  showDelay?: number;
}): {
  openModal: (modalData: T) => void;
  closeModal: () => void;
  Modal: JSX.Element | null;
} => {
  const location = useLocation();
  const navigate = useNavigate();

  const { state = {} } = location;

  const modalRef = useRef<HTMLDivElement>(null);
  const [isShowModal, setIsShowModal] = useState(false);
  const showModalTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const openModal = (modalData: T) => {
    localStorage.setItem('scrollPosition', window.scrollY.toString());
    navigate('', {
      state: {
        ...state,
        [modalKey]: {
          isOpen: true,
          modalData: modalData,
        },
      },
    });
  };

  const closeModal = () => {
    setIsShowModal(false);
    showModalTimeoutRef.current = setTimeout(() => {
      localStorage.setItem('scrollPosition', window.scrollY.toString());
      navigate(-1);
    }, showDelay);
  };

  useEffect(() => {
    const scrollPosition = localStorage.getItem('scrollPosition');
    if (scrollPosition) {
      window.scrollTo(0, parseInt(scrollPosition));
      localStorage.removeItem('scrollPosition');
    }

    const { isOpen } = location?.state?.[modalKey] ?? {};
    showModalTimeoutRef.current = setTimeout(() => {
      setIsShowModal(isOpen);
    }, 0);
  }, [location]);

  const handleClickOutSide = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && e.target == modalRef.current) {
      closeModal();
    }
  };

  const Modal = useMemo(() => {
    const { isOpen, modalData } = location?.state?.[modalKey] ?? {};
    if (!isOpen) return null;
    return (
      <Layout
        isShowModal={isShowModal}
        closeModal={closeModal}
        modalRef={modalRef}
        handleClickOutSide={handleClickOutSide}
        showDelay={showDelay}
      >
        <Component modalData={modalData} />
      </Layout>
    );
  }, [location, isShowModal]);

  return {
    Modal,
    openModal,
    closeModal,
  };
};

export default useModal;
