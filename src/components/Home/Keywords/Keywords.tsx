import { useState } from 'react';
import { STOCK_UPDATE_TIME } from '@ts/Constants';
import { useQueryComponent } from '@hooks/useQueryComponent';
import KeywordPopUp from '@components/PopUp/KeywordPopUp/KeywordPopUp';
import { KeywordsQuery } from '@controllers/query';
import InfoSVG from '@assets/info.svg?react';
import { KeywordItem, KeywordList, KeywordsContainer, Title, TitleWrapper } from './Keywords.style';

const Keywords = ({ country }: { country: string }) => {
  const [keywords, suspend] = useQueryComponent({ query: KeywordsQuery(country) });

  const [isPopupOpen, setPopupOpen] = useState(false);
  const togglePopup = () => setPopupOpen((prev) => !prev);

  const updateTime = STOCK_UPDATE_TIME[country];
  return (
    <KeywordsContainer>
      <TitleWrapper>
        <Title>
          오늘 가장 많이 언급된 키워드
          <InfoSVG onClick={togglePopup} />
        </Title>
        <span>매일 {updateTime}시 업데이트됩니다.</span>
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
