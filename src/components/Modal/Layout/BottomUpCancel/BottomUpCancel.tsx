import styled from '@emotion/styled';
import { ModalLayoutProps } from '@components/Modal/useModal';
import { theme } from '@styles/themes';

const ModalLayout = styled.div(
  ({ isShowModal, showDelay }: { isShowModal: boolean; showDelay: number }) => ({
    background: isShowModal ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0, 0, 0, 0)',
    backdropFilter: isShowModal ? 'blur(2px)' : '',
    transition: `all ${showDelay}ms ease-in-out`,

    ['>div']: {
      transform: `translateY(${isShowModal ? '0' : '100%'})`,
      transition: `all ${showDelay}ms ease-in-out`,
    },
  }),
  {
    position: 'fixed',
    width: '100%',
    height: '100%',
    top: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    right: 0,
    bottom: 0,
    zIndex: '100',
    overflow: 'auto',
    maxWidth: '1280px',

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',

    ['>div']: {
      background: theme.colors.sub_black,
      width: '100%',
      border: `1px solid ${theme.colors.sub_gray10}`,
      borderRadius: '16px 16px 0 0',
      boxSizing: 'border-box',
      padding: '30px 0px 60px',
      gap: '72px',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'auto',
      overscrollBehavior: 'contain',
    },
  },
);

const ModalCancelButton = styled.button({
  ...theme.font.body18Semibold,
  color: theme.colors.sub_white,
  background: theme.colors.sub_blue6,
  borderRadius: '8px',
  border: 'none',
  padding: '10px 0px',
  margin: '0px 20px',
});

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
