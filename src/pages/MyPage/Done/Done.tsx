import { useNavigate } from 'react-router-dom';
import { webPath } from '@router/index';
import BlueCheckSVG from '@assets/checkCircle.svg?react';
import { DoneButton, DoneContainer, DoneContents } from './Done.Style';

const Done = ({ title, description }: { title: string; description: string | React.ReactNode }) => {
  const navigate = useNavigate();

  const handleClickDone = () => {
    navigate(webPath.home());
  };

  return (
    <DoneContainer>
      <DoneContents>
        <BlueCheckSVG />
        <p className="title">{title}</p>
        <p className="description">{description}</p>
      </DoneContents>
      <DoneButton onClick={handleClickDone}>홈으로 이동</DoneButton>
    </DoneContainer>
  );
};

export default Done;
