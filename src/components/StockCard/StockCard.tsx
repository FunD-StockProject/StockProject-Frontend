import { ButtonDiv, FlexDiv, ImgDiv, StyledSVG } from '../Common/Common';
import { Text, TextDetail, TextHeading, TextTitle } from '../Text/Text';
import { scoreToImage } from '../../utils/ScoreConvert';
import UpSVG from '../../assets/icons/up.svg?react';
import DownSVG from '../../assets/icons/down.svg?react';
import { useNavigate } from 'react-router-dom';
import { webPath } from '../../router';
import {
  StockCardItemContainer,
  StockCardItemDeltaScore,
  StockCardItemScore,
  StockCardItemTitle,
} from './StockCard.Style';
import styled from '@emotion/styled';
import { media, theme, themeColor } from '../../styles/themes';

const StockCardItem = ({ name, score, delta }: { name: string; score: number; delta: number }) => {
  const navigate = useNavigate();
  const scoreImage = scoreToImage(score);
  const backgroundColor = score > 50 ? 'red' : 'blue';
  const deltaColor = delta > 0 ? 'yellow' : 'cyan';
  const deltaSVG = delta > 0 ? <UpSVG /> : <DownSVG />;

  const handleClick = () => {
    navigate(webPath.search(), { state: { name } });
  };

  return (
    <StockCardItemContainer onClick={handleClick}>
      <ImgDiv src={scoreImage} width="100%" />
      <StockCardItemTitle>
        <StockCardItemScore delta={delta}>
          {score}점
          <StockCardItemDeltaScore delta={delta}>
            {Math.abs(delta)}
            {deltaSVG}
          </StockCardItemDeltaScore>
        </StockCardItemScore>
        {name}
      </StockCardItemTitle>
    </StockCardItemContainer>
  );
};

export default StockCardItem;
