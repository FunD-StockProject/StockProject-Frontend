import { DisquietViewContainer, DisquietViewStyled, DisquietViewTitleContainer } from './Disquiet.Style';
import DisquietSVG from './Disquiet.svg?react';
import UpCircleSVG from './UpCircle.svg?react';

const DisquietVote = () => {
  return (
    <DisquietViewContainer
      onClick={() => {
        window.open('https://disquiet.io/product/%EC%9D%B8%EA%B0%84%EC%A7%80%ED%91%9C');
      }}
    >
      <DisquietViewTitleContainer>
        <DisquietSVG />
        디스콰이엇 투표 중
      </DisquietViewTitleContainer>
      <UpCircleSVG />
      <DisquietViewStyled />
    </DisquietViewContainer>
  );
};

export default DisquietVote;
