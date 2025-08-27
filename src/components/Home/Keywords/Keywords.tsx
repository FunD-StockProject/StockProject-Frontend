import { useState } from 'react';
import { STOCK_UPDATE_TIME } from '@ts/Constants';
import useModal from '@hooks/useModal';
import { useQueryComponent } from '@hooks/useQueryComponent';
import KeywordPopUp from '@components/PopUp/KeywordPopUp/KeywordPopUp';
import { useKeywordsQuery } from '@controllers/query';
import InfoSVG from '@assets/info.svg?react';
import { HomeItemTtile } from '../Title/Title.Style';
import { KeywordItem, KeywordItemConainer, KeywordList, KeywordsContainer } from './Keywords.style';

const Keywords = ({ country }: { country: string }) => {
  const [keywords, suspend] = useQueryComponent({ query: useKeywordsQuery(country) });

  const [isPopupOpen, setPopupOpen] = useState(false);
  const togglePopup = () => setPopupOpen((prev) => !prev);

  const updateTime = STOCK_UPDATE_TIME[country];

  const { Modal, openModal } = useModal({
    Component: KeywordPopUp,
  });

  return (
    <KeywordsContainer>
      <HomeItemTtile>
        <p className="title">가장 많이 언급되는 키워드</p>
        <InfoSVG onClick={openModal} />
        <p className="update-time">어제 {updateTime} 기준</p>
        <Modal />
      </HomeItemTtile>
      <KeywordList>
        <KeywordItemConainer>
          {suspend ||
            (keywords &&
              keywords.map((keyword: string, index: number) => (
                <KeywordItem key={index} onClick={() => {}}>
                  {keyword.toLocaleUpperCase()}
                </KeywordItem>
              )))}
        </KeywordItemConainer>
      </KeywordList>
      {isPopupOpen && <KeywordPopUp onClose={togglePopup} />}
    </KeywordsContainer>
  );
};

export default Keywords;
