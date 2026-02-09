import { ModalContainer, ModalContent, ModalDescriptionContainer, ModalTitleContainer } from '../CenterTutotial.Style';
import { AboutCardListModalData } from './useAboutCardList';

const CardListText = {
  HOT: {
    title: '👑 현재 시장 반응 TOP 3',
    description: '한국투자증권’ 순위를 기반으로 집계됩니다.',
  },
  RISING: {
    title: '🔥 현재 민심 급상승 중',
    description: '현재 각종 주식 커뮤니티에서 투자자들의 민심이 긍정적으로 급상승 중인 종목입니다.',
  },
  DESCENT: {
    title: '💧 현재 민심 급하락 중',
    description: '현재 각종 주식 커뮤니티에서 투자자들의 민심이 부정적으로 급하락 중인 종목입니다.',
  },
};

const AboutCardList = ({ modalData: { type } }: { modalData: AboutCardListModalData }) => {
  return (
    <ModalContainer>
      <ModalTitleContainer>
        <p>{CardListText[type].title}</p>
      </ModalTitleContainer>
      <ModalContent>
        <ModalDescriptionContainer>
          <p>{CardListText[type].description}</p>
        </ModalDescriptionContainer>
      </ModalContent>
    </ModalContainer>
  );
};

export default AboutCardList;
