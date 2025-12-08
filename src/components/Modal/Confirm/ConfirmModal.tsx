import styled from '@emotion/styled';
import { useEffect, useRef, useState } from 'react';
import { theme } from '@styles/themes';

const ConfirmModalLayout = styled.div({
  display: 'flex',
  position: 'fixed',
  background: 'rgba(0, 0, 0, 0.7)',
  width: '100%',
  height: '100%',
  zIndex: '100',
  top: '0',
  left: '50%',
  transform: 'translateX(-50%)',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '32px',
  boxSizing: 'border-box',
  backdropFilter: 'blur(5px)',
  maxWidth: '1280px',
});

const ConfirmModalContainer = styled.div({
  background: 'white',
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  borderRadius: '20px',
  padding: '24px 20px 16px',
  gap: '28px',

  ['>div']: {
    display: 'flex',
    gap: '12px',

    ['>button']: {
      ...theme.font.body18Semibold,
      width: '100%',
      height: '48px',
      padding: '8px 0',
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

const ConfirmModalTextContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',

  ['>p']: {
    margin: '0',
    wordBreak: 'keep-all',

    ['&.title']: {
      ...theme.font.title20Semibold,
      color: theme.colors.sub_gray8,
    },

    ['&.desc']: {
      ...theme.font.body16Medium,
      color: theme.colors.sub_gray7,
      whiteSpace: 'nowrap',
      wordBreak: 'keep-all',
    },
  },
});

const ConfirmModal = ({
  title,
  description,
  onConfirm,
  isInverse,
  actionText = ['네', '아니오'],
}: {
  title: string;
  description?: string | React.ReactNode;
  onConfirm: () => void;
  isInverse?: boolean;
  actionText?: string[];
}): [() => React.ReactElement, () => void, () => void] => {
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
          <ConfirmModalTextContainer>
            <p className="title">{title}</p>
            {description && <p className="desc">{description}</p>}
          </ConfirmModalTextContainer>
          <div>
            <button onClick={isInverse ? closeModal : onConfirm}>{actionText[isInverse ? 1 : 0]}</button>
            <button onClick={isInverse ? onConfirm : closeModal}>{actionText[isInverse ? 0 : 1]}</button>
          </div>
        </ConfirmModalContainer>
      </ConfirmModalLayout>
    );
  };

  return [modal, openModal, closeModal];
};

export default ConfirmModal;
