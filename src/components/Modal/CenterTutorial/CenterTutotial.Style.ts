import styled from '@emotion/styled';
import { theme } from '@styles/themes';

const ModalLayout = styled.div(
  ({ isShowModal, showDelay }: { isShowModal: boolean; showDelay: number }) => ({
    background: isShowModal ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0, 0, 0, 0)',
    backdropFilter: isShowModal ? 'blur(2px)' : '',
    transition: `all ${showDelay}ms ease-in-out`,

    ['>div']: { opacity: isShowModal ? 1 : 0, transition: `all ${showDelay}ms ease-in-out` },
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
    maxWidth: '1280px',

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '30px',
    boxSizing: 'border-box',

    ['>div']: {
      background: theme.colors.sub_gray4,
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      borderRadius: '8px',
      overflow: 'hidden',
    },
  },
);

const ModalContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  overflow: 'hidden auto',
  maxHeight: '100%',
  height: '100%',
  padding: '20px 0',
  overscrollBehavior: 'contain',
});

const ModalTitleContainer = styled.div({
  display: 'flex',
  padding: '0 16px',
  gap: '4px',

  ['>svg']: { width: '72px', height: 'auto' },

  ['>p']: { margin: '0', ...theme.font.body18Semibold, color: theme.colors.sub_black },
});

const ModalContent = styled.div({ display: 'flex', flexDirection: 'column', gap: '10px' });

const ModalDescriptionContainer = styled.div({
  margin: '0 16px',
  display: 'flex',
  flexDirection: 'column',

  ['>p']: {
    ...theme.font.body14Semibold,
    color: theme.colors.sub_gray10,
    margin: '0',
    wordBreak: 'keep-all',
    ['>b']: { ...theme.font.body14Bold, color: theme.colors.sub_blue6 },
  },
});

const ModalCloseButton = styled.button({
  ...theme.font.body18Semibold,
  color: theme.colors.sub_gray3,
  background: theme.colors.sub_blue6,
  border: 'none',
  padding: '10px 0px',
  width: '100%',
});

export { ModalLayout, ModalContainer, ModalTitleContainer, ModalContent, ModalDescriptionContainer, ModalCloseButton };
