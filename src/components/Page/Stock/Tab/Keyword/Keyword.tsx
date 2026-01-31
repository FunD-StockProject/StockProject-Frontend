import styled from '@emotion/styled';
import useAboutAntVoice from '@components/Modal/CenterTutorial/AboutAntVoice/useAboutAntVoice';
import StockWordCloud from '@components/Search/StockWordCloud/StockWordCloud';
import { StockDetailInfo } from '@controllers/stocks/types';
import { StockItemContainer } from '../../Common.Style';
import StockItemTitle from '../../ItemTitle';

const WordCloudContainer = styled.div({
  padding: '0px 20px',
});

const StockKeywordPanel = ({ stockInfo }: { stockInfo: StockDetailInfo }) => {
  const { Modal: AboutAntVoiceModal, openModal } = useAboutAntVoice();

  const handleOpenAntVoiceModal = () => {
    openModal();
  };

  return (
    <StockItemContainer>
      {AboutAntVoiceModal}
      <StockItemTitle
        title="자주 언급되는 단어"
        country={stockInfo.country}
        help={{ text: '자주 언급되는 단어란 무엇인가요?', onClick: () => handleOpenAntVoiceModal() }}
      />
      <WordCloudContainer>
        <StockWordCloud symbol={stockInfo.symbol} country={stockInfo.country} />
      </WordCloudContainer>
    </StockItemContainer>
  );
};

export default StockKeywordPanel;
