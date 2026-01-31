import { ModalContainer, ModalContent, ModalDescriptionContainer, ModalTitleContainer } from '../CenterTutotial.Style';

const AboutFear = () => {
  return (
    <ModalContainer>
      <ModalTitleContainer>
        <p>공포탐욕지수란?</p>
      </ModalTitleContainer>
      <ModalContent>
        <ModalDescriptionContainer>
          <p>
            공포탐욕지수는 시장의 7가지 요인을 분석하여
            <b> 현재 투자자들의 심리를 극단적인 공포(0)부터 극단적인 탐욕(100)</b>에 이르기까지를 가늠하는
            심리지표입니다.
          </p>
        </ModalDescriptionContainer>
      </ModalContent>
    </ModalContainer>
  );
};

export default AboutFear;
