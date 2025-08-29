import { STOCK_UPDATE_TIME } from '@ts/Constants';
import { StockCountryKey } from '@ts/StockCountry';
import useModal from '@hooks/useModal';
import { useQueryComponent } from '@hooks/useQueryComponent';
import KeywordPopUp from '@components/PopUp/KeywordPopUp/KeywordPopUp';
import { useKeywordsQuery } from '@controllers/query';
import InfoSVG from '@assets/info.svg?react';
import { HomeItemTtile } from '../Title/Title.Style';
import { KeywordItem, KeywordsContainer, KeywordsGrid } from './Keywords.style';

const Keywords = ({ country, onClick }: { country: StockCountryKey; onClick: (keyword: string) => () => void }) => {
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
          {keywords?.slice(0, 9).map((keyword: string) => (
            <KeywordItem key={`KEYWORD_ITEM_${country}_${keyword}`} onClick={onClick(keyword)}>
              <p>{keyword}</p>
            </KeywordItem>
          ))}
        </KeywordsGrid>
      )}
    </KeywordsContainer>
  );
};

export default Keywords;
