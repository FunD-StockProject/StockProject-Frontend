import styled from '@emotion/styled';
import Header from '@layout/Header/Header';
import { theme } from '@styles/themes';
import { ModalLayoutProps } from '../useModal';

const ModalLayout = styled.div(
  ({ isShowModal, showDelay }: { isShowModal: boolean; showDelay: number }) => ({
    background: isShowModal ? 'rgba(0, 0, 0, 1)' : 'rgba(0, 0, 0, 0)',
    backdropFilter: isShowModal ? 'blur(2px)' : '',
    transition: `all ${showDelay}ms ease-in-out`,

    ['>div']: {
      transform: `translateY(${isShowModal ? '0' : '100dvh'})`,
      transition: `all ${showDelay}ms ease-in-out`,
    },
  }),
  {
    position: 'fixed',
    top: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    width: '100%',
    height: '100%',
    zIndex: 1000,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden auto ',
    maxWidth: '1280px',

    ['>div']: {
      background: theme.colors.sub_black,
      width: '100%',
      height: '100%',
      borderRadius: '16px 16px 0 0',
      boxSizing: 'border-box',
      padding: '0px 0px 60px',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'auto',
      overscrollBehavior: 'contain',
    },
  },
);

const SearchBarLayout = ({
  children,
  isShowModal,
  modalRef,
  handleClickOutSide,
  showDelay,
  closeModal,
}: ModalLayoutProps) => {
  return (
    <ModalLayout isShowModal={isShowModal} ref={modalRef} onClick={handleClickOutSide} showDelay={showDelay}>
      <div>
        <Header location="searchBar" onBefore={closeModal} />
        {children}
      </div>
    </ModalLayout>
  );
};

export default SearchBarLayout;
