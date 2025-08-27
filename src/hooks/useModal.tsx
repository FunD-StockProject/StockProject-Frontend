import styled from '@emotion/styled';
import { useRef, useState } from 'react';

const ModalOverlay = styled.div({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background: 'rgba(0, 0, 0, 0.5)',
  zIndex: 1000,
  padding: '20px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxSizing: 'border-box',
});

const useModal = ({ Component }: { Component: ({ onClose }: { onClose: () => void }) => React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const openModal = () => {
    console.log('openModal');
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
