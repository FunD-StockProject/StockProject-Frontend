import { ModalLayoutProps } from '@components/Modal/useModal';
import { ModalCloseButton, ModalLayout } from './CenterTutotial.Style';

const CenterTutorialLayout = ({
  children,
  isShowModal,
  modalRef,
  handleClickOutSide,
  closeModal,
  showDelay,
}: ModalLayoutProps) => {
  return (
    <ModalLayout isShowModal={isShowModal} ref={modalRef} onClick={handleClickOutSide} showDelay={showDelay}>
      <div>
        {children}
        <ModalCloseButton onClick={closeModal}>이해했어요</ModalCloseButton>
      </div>
    </ModalLayout>
  );
};

export default CenterTutorialLayout;
