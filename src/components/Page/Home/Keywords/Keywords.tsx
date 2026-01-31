import { SearchCategoryKey } from '@ts/SearchCategory';
import { StockCountryKey } from '@ts/StockCountry';
import useAboutKeyword from '@components/Modal/CenterTutorial/AboutKeyword/useAboutKeyword';
import { usePopularKeywordsQuery } from '@controllers/stocks/query';
import ItemTitle from '../Common';
import { HomeItemContainer } from '../Common.Style';
import { KeywordItem, KeywordsGrid } from './Keywords.Style';

const HomeKeywords = ({
  country,
  openSearchBarModal,
}: {
  country: StockCountryKey;
  openSearchBarModal: ({ type, value }: { type?: SearchCategoryKey; value?: string }) => () => void;
}) => {
  const { data: keywords } = usePopularKeywordsQuery(country);

  const { Modal: AboutKeywordModal, openModal: openAboutKeywordModal } = useAboutKeyword();

  return (
    <HomeItemContainer>
      {AboutKeywordModal}
      <ItemTitle title="가장 많이 언급되는 키워드" country={country} openAboutModal={() => openAboutKeywordModal()} />
      <KeywordsGrid>
        {keywords?.slice(0, 9).map((keyword: string) => (
          <KeywordItem
            key={`KEYWORD_ITEM_${country}_${keyword}`}
            onClick={openSearchBarModal({ type: 'KEYWORD', value: keyword })}
          >
            <p>{keyword}</p>
          </KeywordItem>
        ))}
      </KeywordsGrid>
    </HomeItemContainer>
  );
};

export default HomeKeywords;
