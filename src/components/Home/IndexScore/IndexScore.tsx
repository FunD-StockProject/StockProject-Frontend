import { useState } from 'react';
import { STOCK_COUNTRY } from '@ts/Types';
import { useQueryComponent } from '@hooks/useQueryComponent';
import FearPopUp from '@components/PopUp/FearPopUp/FearPopUp';
import { useIndexScoreQuery } from '@controllers/query';
import DownSVG from '@assets/icons/down.svg?react';
import InfoSVG from '@assets/icons/info.svg?react';
import UpSVG from '@assets/icons/up.svg?react';
import { IndexScoreContainer, IndexScoreItem, IndexScoreItemHeader, IndexScoreItemScore } from './IndexScore.style';

const IndexScore = ({ country }: { country: STOCK_COUNTRY }) => {
  const [indexScores, suspend] = useQueryComponent({ query: useIndexScoreQuery() });

  const [isPopupOpen, setPopupOpen] = useState(false);
  const togglePopup = () => setPopupOpen((prev) => !prev);

  const transformed = Object.values(indexScores ?? []).reduce<{ score: number; delta: number }[]>((acc, _, i, arr) => {
    if (i % 2 === 0) {
      acc.push({
        score: arr[i] as number,
        delta: arr[i + 1] as number,
      });
    }
    return acc;
  }, []);

  const stockIndexNames = country === 'KOREA' ? ['공포지수', '코스피', '코스닥'] : ['공포지수', 'S&P 500', '나스닥'];
  const stockIndexScores = transformed.slice(...(country === 'KOREA' ? [0, 3] : [3, 6]));

  if (suspend) return null;

  return (
    <IndexScoreContainer>
      {stockIndexScores.map(({ score, delta }, idx) => (
        <IndexScoreItem key={idx}>
          <IndexScoreItemHeader>
            <p>{stockIndexNames[idx]}</p>
            {idx === 0 && <InfoSVG onClick={togglePopup} />}
          </IndexScoreItemHeader>
          <IndexScoreItemScore delta={delta}>
            <p>{score}</p>
            {delta === 0 ? '' : delta > 0 ? <UpSVG /> : <DownSVG />}
          </IndexScoreItemScore>
        </IndexScoreItem>
      ))}
      {isPopupOpen && <FearPopUp onClose={togglePopup} />}
    </IndexScoreContainer>
  );
};

export default IndexScore;
