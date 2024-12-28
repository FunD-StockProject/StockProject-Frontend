import { useState } from 'react';
import { useQueryComponent } from '@hooks/useQueryComponent';
import KeywordPopUp from '@components/PopUp/KeywordPopUp/KeywordPopUp';
import { KeywordsQuery } from '@controllers/query';
import InfoSVG from '@assets/info.svg?react';
import { KeywordItem, KeywordList, KeywordsContainer, Title, TitleWrapper } from './Keywords.style';

const Keywords = ({ country }: { country: string }) => {
  const [keywords, suspend] = useQueryComponent({ query: KeywordsQuery(country) });

  const [isPopupOpen, setPopupOpen] = useState(false);
  const togglePopup = () => setPopupOpen((prev) => !prev);
  return (
    <KeywordsContainer>
      <TitleWrapper>
        <Title>
          가장 많이 언급되는 키워드
          <InfoSVG onClick={togglePopup} />
        </Title>
        <span>전일 08:24 기준</span>
      </TitleWrapper>
      <KeywordList>
        {suspend ||
          (keywords &&
            keywords.map((keyword: string, index: number) => (
              <KeywordItem key={index} onClick={() => {}}>
                {keyword}
              </KeywordItem>
            )))}
      </KeywordList>
      {isPopupOpen && <KeywordPopUp onClose={togglePopup} />}
    </KeywordsContainer>
  );
};

export default Keywords;
