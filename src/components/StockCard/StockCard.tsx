import { ButtonDiv, FlexDiv, ImgDiv, StyledSVG } from '../Common/Common';
import { Text, TextDetail, TextHeading } from '../Text/Text';
import { scoreToImage } from '../../utils/ScoreConvert';
import UpSVG from '../../assets/icons/up.svg?react';
import DownSVG from '../../assets/icons/down.svg?react';
import { useNavigate } from 'react-router-dom';
import { webPath } from '../../router';
import { StockCardItemContainer, StockCardItemTitle } from './StockCard.Style';

const StockCardItem = ({ name, score, delta }: { name: string; score: number; delta: number }) => {
  const navigate = useNavigate();
  const scoreImage = scoreToImage(score);
  const backgroundColor = score > 50 ? 'red' : 'blue';
  const deltaColor = delta > 0 ? 'yellow' : 'cyan';
  const deltaSVG = delta > 0 ? <StyledSVG svg={UpSVG} fill="yellow" /> : <StyledSVG svg={DownSVG} fill="cyan" />;

  const handleClick = () => {
    navigate(webPath.search(), { state: { name } });
  };

  return (
    <StockCardItemContainer onClick={handleClick}>
      <ImgDiv src={scoreImage} width="100%" />
      <StockCardItemTitle>
        <ButtonDiv gap="8px" background={backgroundColor} radius="100px" padding="8px 24px">
          <Text size="Large" weight="Bold" color="primary0">
            {score}점
          </Text>
          <FlexDiv gap="2px" alignItems="center">
            <TextDetail weight="Bold" color={deltaColor}>
              {delta}
            </TextDetail>
            {deltaSVG}
          </FlexDiv>
        </ButtonDiv>
        <TextHeading color="grayscale90">{name}</TextHeading>
      </StockCardItemTitle>
    </StockCardItemContainer>
  );
};

export default StockCardItem;
