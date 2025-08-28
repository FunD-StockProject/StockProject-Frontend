import { scoreToImage, scoreToIndex } from '@utils/ScoreConvert';
import {
  GuageChartContainer,
  GuageChartContentsInner,
  GuageChartItem,
  GuageChartItemArc,
  GuageChartItemBalloon,
  GuageChartItemScore,
  GuageChartItemScorePlaceholder,
  GuageChartItemText,
} from './GuageChart.Style';

const GuageChart = ({ score }: { score: number }) => {
  const scoreText = ['대곰탕', '곰탕', '어?', '"호황"', '대호황!'];
  const scoreIndex = scoreToIndex(score);
  const scoreImage = scoreToImage(score);

  return (
    <GuageChartContainer>
      <GuageChartContentsInner>
        {scoreText.map((e, index) => {
          return (
            <GuageChartItem key={`GAUGE_ITEM_${index}`}>
              <GuageChartItemArc index={index} selected={index === scoreIndex} />
              <GuageChartItemText index={index} selected={index === scoreIndex}>
                {e}
              </GuageChartItemText>

              {index === scoreIndex && (
                <GuageChartItemBalloon index={index}>
                  <img src={scoreImage} alt="score-image" />
                </GuageChartItemBalloon>
              )}
            </GuageChartItem>
          );
        })}

        {[0, 30, 40, 50, 70, 100].map((e, index) => {
          return <GuageChartItemScorePlaceholder index={index}>{e}</GuageChartItemScorePlaceholder>;
        })}
      </GuageChartContentsInner>

      <GuageChartItemScore>{score}점</GuageChartItemScore>
    </GuageChartContainer>
  );
};

export default GuageChart;
