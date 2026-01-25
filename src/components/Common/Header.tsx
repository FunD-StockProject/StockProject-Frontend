import { useNavigate } from 'react-router-dom';
import ArrowLeftSVG from '@assets/arrowLeft.svg?react';
import CloseSVG from '@assets/close.svg?react';
import { HeaderContainer, HeaderContents } from './Header.Style';

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
