import { useState } from 'react';
import { useQueryComponent } from '@hooks/useQueryComponent';
import FearPopUp from '@components/PopUp/FearPopUp/FearPopUp';
import { IndexScoreQuery } from '@controllers/query';
import DownSVG from '@assets/icons/down.svg?react';
import UpSVG from '@assets/icons/up.svg?react';
import InfoSVG from '@assets/info.svg?react';
import { IndexDeltaScore, IndexInfoContainer, IndexItem, IndicesContainer } from './IndexScore.style';

// interface TransformedData {
//   score: number;
//   delta: number;
// }

const stockIndices = [
  ['공포 지수', '코스피', '코스닥'],
  ['공포 지수', 'S&P 500', '나스닥'],
];

const IndexScore = ({ tabIndex }: { tabIndex: number }) => {
  const [indexScores, suspend] = useQueryComponent({ query: IndexScoreQuery() });

  const [isPopupOpen, setPopupOpen] = useState(false);
  const togglePopup = () => setPopupOpen((prev) => !prev);

  const entries = Object.entries(indexScores ?? []);

  const transformed = entries.reduce<{ score: number; delta: number }[]>((acc, _, i) => {
    if (i % 2 === 0) {
      acc.push({
        score: entries[i][1] as number,
        delta: entries[i + 1]?.[1] as number,
      });
    }
    return acc;
  }, []);

  const splitIndex = transformed.length / 2;
  const result = tabIndex === 0 ? transformed.slice(0, splitIndex) : transformed.slice(splitIndex);

  if (suspend) return null;

  return (
    <IndicesContainer>
      {result.map(({ score, delta }, idx) => (
        <IndexItem key={stockIndices[tabIndex][idx]}>
          <IndexInfoContainer>
            {stockIndices[tabIndex][idx]} {idx === 0 && <InfoSVG className="btn_info" onClick={togglePopup} />}
          </IndexInfoContainer>
          <IndexDeltaScore delta={delta}>
            {Math.abs(score)}점 {delta === 0 ? '-' : delta > 0 ? <UpSVG /> : <DownSVG />}
          </IndexDeltaScore>
        </IndexItem>
      ))}
      {isPopupOpen && <FearPopUp onClose={togglePopup} />}
    </IndicesContainer>
  );
};

export default IndexScore;
