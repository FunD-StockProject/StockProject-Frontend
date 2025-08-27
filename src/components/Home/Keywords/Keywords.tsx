import { STOCK_UPDATE_TIME } from '@ts/Constants';
import { STOCK_COUNTRY } from '@ts/Types';
import useModal from '@hooks/useModal';
import { useQueryComponent } from '@hooks/useQueryComponent';
import KeywordPopUp from '@components/PopUp/KeywordPopUp/KeywordPopUp';
import { useKeywordsQuery } from '@controllers/query';
import InfoSVG from '@assets/info.svg?react';
import { HomeItemTtile } from '../Title/Title.Style';
import { KeywordItem, KeywordsContainer, KeywordsGrid } from './Keywords.style';

const Keywords = ({ country }: { country: STOCK_COUNTRY }) => {
  const [keywords, suspend] = useQueryComponent({ query: useKeywordsQuery(country) });
  const { Modal, openModal } = useModal({
    Component: KeywordPopUp,
  });

  const updateTime = STOCK_UPDATE_TIME[country];

  return (
    <KeywordsContainer>
      <HomeItemTtile>
        <p className="title">가장 많이 언급되는 키워드</p>
        <InfoSVG onClick={openModal} />
        <p className="update-time">어제 {updateTime} 기준</p>
        <Modal />
      </HomeItemTtile>
      {suspend || (
        <KeywordsGrid>
          {keywords?.map((keyword: string) => (
            <KeywordItem key={`KEYWORD_ITEM_${country}_${keyword}`}>
              <p>{keyword}</p>
            </KeywordItem>
          ))}
        </KeywordsGrid>
      )}
    </KeywordsContainer>
  );
};

export default Keywords;
