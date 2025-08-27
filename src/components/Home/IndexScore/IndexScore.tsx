import { useState } from 'react';
import { STOCK_COUNTRY } from '@ts/Types';
import { useQueryComponent } from '@hooks/useQueryComponent';
import FearPopUp from '@components/PopUp/FearPopUp/FearPopUp';
import { useIndexScoreQuery } from '@controllers/query';
import DownSVG from '@assets/icons/down.svg?react';
import UpSVG from '@assets/icons/up.svg?react';
import InfoSVG from '@assets/info.svg?react';
import { IndexDeltaScore, IndexInfoContainer, IndexItem, IndicesContainer } from './IndexScore.style';

const stockIndices = [
  ['공포탐욕지수 ', '코스피', '코스닥'],
  ['공포탐욕지수 ', 'S&P 500', '나스닥'],
];

const IndexScore = ({ country }: { country: STOCK_COUNTRY }) => {
  const [indexScores, suspend] = useQueryComponent({ query: useIndexScoreQuery() });

  // const [isPopupOpen, setPopupOpen] = useState(false);
  // const togglePopup = () => setPopupOpen((prev) => !prev);

  const transformed = Object.values(indexScores ?? []).reduce<{ score: number; delta: number }[]>((acc, _, i, arr) => {
    if (i % 2 === 0) {
      acc.push({
        score: arr[i] as number,
        delta: arr[i + 1] as number,
      });
    }
    return acc;
  }, []);
  console.log(transformed);

  // const splitIndex = transformed.length / 2;
  // const result = tabIndex === 0 ? transformed.slice(0, splitIndex) : transformed.slice(splitIndex);

  const result = transformed.slice(...(country === 'KOREA' ? [0, 3] : [3, 6]));
  console.log(result);
  // if (suspend) return null;

  // return (
  //   <IndicesContainer>
  //     {result.map(({ score, delta }, idx) => (
  //       <IndexItem key={stockIndices[tabIndex][idx]}>
  //         <IndexInfoContainer>
  //           {stockIndices[tabIndex][idx]}
  //           {idx === 0 && <InfoSVG className="btn_info" onClick={togglePopup} />}
  //         </IndexInfoContainer>
  //         <IndexDeltaScore delta={delta}>
  //           {Math.abs(score)}점 {delta === 0 ? '-' : delta > 0 ? <UpSVG /> : <DownSVG />}
  //         </IndexDeltaScore>
  //       </IndexItem>
  //     ))}
  //     {isPopupOpen && <FearPopUp onClose={togglePopup} />}
  //   </IndicesContainer>
  // );

  return (
    <div
      style={{
        padding: '0 20px',
      }}
    >
      asd
    </div>
  );
};

export default IndexScore;
