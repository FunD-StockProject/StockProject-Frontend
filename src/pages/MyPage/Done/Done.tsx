import useRouter from '@router/useRouter';
import BlueCheckSVG from '@assets/checkCircle.svg?react';
import { DoneButton, DoneContainer, DoneContents } from './Done.Style';

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
