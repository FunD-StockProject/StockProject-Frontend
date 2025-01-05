import { useNavigate } from 'react-router-dom';
import { scoreToImage } from '@utils/ScoreConvert';
import { webPath } from '@router/index';
import DownSVG from '@assets/icons/down.svg?react';
import UpSVG from '@assets/icons/up.svg?react';
import {
  KeywordContainer,
  MobileScoreImage,
  MobileStockCardItemContainer,
  MobileStockCardItemDeltaScore,
  MobileStockCardItemScore,
  MobileStockCardItemText,
  MobileStockCardItemTitle,
  MobileStockCardKeyword,
} from './MobileStockCard.Style';

const MobileStockCardItem = ({
  name,
  score,
  delta,
  country,
  keywords,
}: {
  name: string;
  score: number;
  delta: number;
  country: string;
  keywords: string[];
}) => {
  const navigate = useNavigate();
  const scoreImage = scoreToImage(score);
  const deltaSVG = !delta ? ' -' : delta > 0 ? <UpSVG /> : <DownSVG />;

  const handleClick = () => {
    navigate(webPath.search(), { state: { symbolName: name, country: country } });
  };

  return (
    <MobileStockCardItemContainer onClick={handleClick}>
      <MobileScoreImage src={scoreImage} />
      <MobileStockCardItemTitle>
        <MobileStockCardItemText>{name}</MobileStockCardItemText>
        <MobileStockCardItemScore>
          {score}점
          <MobileStockCardItemDeltaScore delta={delta}>
            {Math.abs(delta)}점{deltaSVG}
          </MobileStockCardItemDeltaScore>
        </MobileStockCardItemScore>
        <KeywordContainer>
          <MobileStockCardKeyword>{keywords[0]}</MobileStockCardKeyword>
          <MobileStockCardKeyword>{keywords[1]}</MobileStockCardKeyword>
        </KeywordContainer>
      </MobileStockCardItemTitle>
    </MobileStockCardItemContainer>
  );
};

export default MobileStockCardItem;
