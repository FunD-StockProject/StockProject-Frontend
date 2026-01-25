import { useEffect, useRef, useState } from 'react';
import { ConfirmModalContainer, ConfirmModalLayout, ConfirmModalTextContainer } from './ConfirmModal.Style';

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
