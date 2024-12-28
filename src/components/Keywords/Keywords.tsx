import { useState } from 'react';
import KeywordPopUp from '@components/PopUp/KeywordPopUp/KeywordPopUp';
import InfoSVG from '@assets/info.svg?react';
import { KeywordItem, KeywordList, KeywordsContainer, Subtitle, Title, TitleWrapper } from './Keywords.style';

const Keywords = () => {
  const keywords = ['이재명', '더불어민주당', '항공사', '탄소저감', '신용평가', '가스에너지', '원유정제', '조선사', '섬유'];
  const [isPopupOpen, setPopupOpen] = useState(false);
  const togglePopup = () => setPopupOpen((prev) => !prev);
  return (
    <KeywordsContainer>
      <TitleWrapper>
        <Title>
          가장 많이 언급되는 키워드
          <InfoSVG onClick={togglePopup} />
        </Title>
        <Subtitle>어제 08:24 기준</Subtitle>
      </TitleWrapper>
      <KeywordList>
        {keywords.map((keyword, index) => (
          <KeywordItem key={index} onClick={() => {}}>
            {keyword}
          </KeywordItem>
        ))}
      </KeywordList>
      {isPopupOpen && <KeywordPopUp onClose={togglePopup} />}
    </KeywordsContainer>
  );
};

export default Keywords;
