import styled from '@emotion/styled';
import useRouter from '@router/useRouter';
import { theme } from '@styles/themes';
import BlueCheckSVG from '@assets/checkCircle.svg?react';

const DoneContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  alignItems: 'center',
  flexGrow: '1',
  padding: '32px 20px',
  boxSizing: 'border-box',
});

const DoneContents = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '10px',
  flexGrow: '1',
  justifyContent: 'center',

  ['>svg']: {
    width: '72px',
    height: 'auto',
    aspectRatio: '1 / 1',
    fill: theme.colors.sub_blue6,
  },

  ['>p']: {
    textAlign: 'center',
    margin: '0',

    ['&.title']: {
      ...theme.font.title20Semibold,
      color: theme.colors.sub_gray2,
    },

    ['&.description']: {
      ...theme.font.body14Medium,
      color: theme.colors.sub_gray4,
    },
  },
});

const DoneButton = styled.button({
  ...theme.font.body18Semibold,
  width: '100%',
  borderRadius: '8px',
  padding: '10px 0px',
  border: 'none',
  background: theme.colors.sub_blue6,
  color: theme.colors.sub_white,
});

const Done = ({ title, description }: { title: string; description: string | React.ReactNode }) => {
  const { navToHome } = useRouter();

  return (
    <DoneContainer>
      <DoneContents>
        <BlueCheckSVG />
        <p className="title">{title}</p>
        <p className="description">{description}</p>
      </DoneContents>
      <DoneButton onClick={navToHome}>홈으로 이동</DoneButton>
    </DoneContainer>
  );
};

export default Done;
