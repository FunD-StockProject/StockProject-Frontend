import styled from '@emotion/styled';
import { useEffect, useRef, useState } from 'react';

const ConfirmModalLayout = styled.div({
  display: 'flex',
  position: 'fixed',
  background: 'rgba(0, 0, 0, 0.7)',
  width: '100%',
  height: '100%',
  zIndex: '100',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '32px',
  boxSizing: 'border-box',
  backdropFilter: 'blur(5px)',
});

const ConfirmModalContainer = styled.div({
  background: 'white',
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  borderRadius: '20px',
  padding: '24px 20px 16px',
  gap: '28px',

  ['>p']: {
    margin: '0',
    color: '#343A40',
    fontSize: '20px',
    fontWeight: '600',
  },

  ['>div']: {
    display: 'flex',
    gap: '12px',

    ['>button']: {
      width: '100%',
      padding: '8px 0',
      fontSize: '18px',
      fontWeight: '700',
      border: 'none',
      borderRadius: '999px',

      [':first-of-type']: {
        background: '#E9ECEF',
        color: '#495057',
      },
      [':last-of-type']: {
        background: '#1B1C1E',
        color: '#E9ECEF',
      },
    },
  },
});

const ConfirmModal = (title: string, onConfirm: () => void): [() => React.ReactElement, () => void] => {
  const [isOpen, setIsOpen] = useState(false);

  const modalRef = useRef<HTMLDivElement>(null);

  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        closeModal();
      }
    };

    window.addEventListener('mousedown', handleClick);

    return () => {
      window.removeEventListener('mousedown', handleClick);
    };
  }, []);

  const modal = () => {
    if (!isOpen) return <></>;

    return (
      <ConfirmModalLayout>
        <ConfirmModalContainer ref={modalRef}>
          <p>{title}</p>
          <div>
            <button onClick={onConfirm}>네</button>
            <button onClick={closeModal}>아니오</button>
          </div>
        </ConfirmModalContainer>
      </ConfirmModalLayout>
    );
  };

  return [modal, openModal];
};

export default ConfirmModal;
