import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { theme } from '@styles/themes';
import ArrowLeftSVG from '@assets/arrowLeft.svg?react';
import CloseSVG from '@assets/close.svg?react';

const HeaderContainer = styled.div({
  paddingBottom: '8px',
  borderBottom: `4px solid ${theme.colors.sub_gray11}`,
});

const HeaderContents = styled.div({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  padding: '8px 20px',
  gap: '12px',

  ['>p']: {
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
    ...theme.font.body18Semibold,
    color: theme.colors.sub_white,
    margin: '0',
  },

  ['>svg']: {
    width: '32px',
    height: 'auto',
    aspectRatio: '1 / 1',
    cursor: 'pointer',
    fill: theme.colors.sub_gray5,
  },

  ['>span']: {
    flexGrow: 1,
  },
});

const Header = ({
  title,
  onBefore,
  beforeIconType = 'back',
}: {
  title: string;
  onBefore?: () => void;
  beforeIconType?: 'back' | 'close';
}) => {
  const navigate = useNavigate();

  const handleBefore = () => {
    if (onBefore) {
      onBefore();
    } else {
      navigate(-1);
    }
  };

  return (
    <HeaderContainer>
      <HeaderContents>
        <p>{title}</p>
        {beforeIconType === 'back' && <ArrowLeftSVG onClick={handleBefore} />}
        <span />
        {beforeIconType === 'close' && <CloseSVG onClick={handleBefore} />}
      </HeaderContents>
    </HeaderContainer>
  );
};

export default Header;
