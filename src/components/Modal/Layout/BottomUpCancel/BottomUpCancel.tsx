import { ModalLayoutProps } from '@components/Modal/useModal';
import { ModalCancelButton, ModalLayout } from './BottomUpCancel.Style';

const BottomUpCancel = ({
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
        <ModalCancelButton onClick={closeModal}>닫기</ModalCancelButton>
      </div>
    </ModalLayout>
  );
};

export default BottomUpCancel;
