import { useRef, useState } from 'react';
import { ModalOverlay } from './useModal.Style';

const useModal = ({ Component }: { Component: ({ onClose }: { onClose: () => void }) => React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && e.target == modalRef.current) {
      closeModal();
    }
  };

  const Modal = () => {
    if (!isOpen) return null;

    return (
      <ModalOverlay ref={modalRef} onClick={handleClickOutside}>
        <Component onClose={closeModal} />
      </ModalOverlay>
    );
  };

  return { Modal, openModal };
};

export default useModal;
