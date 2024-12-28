import { useState } from 'react';
import { useQueryComponent } from '@hooks/useQueryComponent';
import FearPopUp from '@components/PopUp/FearPopUp/FearPopUp';
import { IndexScoreQuery } from '@controllers/query';
import DownSVG from '@assets/icons/down.svg?react';
import UpSVG from '@assets/icons/up.svg?react';
import InfoSVG from '@assets/info.svg?react';
import { IndexDeltaScore, IndexInfoContainer, IndexItem, IndicesContainer } from './IndexScore.style';

const IndexScore = ({ tabIndex }: { tabIndex: number }) => {
  const stockIndices = [
    ['공포 지수', '코스피', '코스닥'],
    ['공포 지수', 'S&P 500', '나스닥'],
  ];
  const country = tabIndex === 0 ? 'KOREA' : 'OVERSEA';

  const [indexScores, suspend] = useQueryComponent({ query: IndexScoreQuery(country) });

  const [isPopupOpen, setPopupOpen] = useState(false);
  const togglePopup = () => setPopupOpen((prev) => !prev);

  return (
    <IndicesContainer>
      {suspend ||
        (indexScores &&
          stockIndices[tabIndex].map((stockIndex, idx) => {
            const delta = indexScores[idx];
            const deltaSVG = delta > 0 ? <UpSVG /> : <DownSVG />;

            return (
              <IndexItem key={stockIndex}>
                <IndexInfoContainer>
                  {stockIndex} {idx === 0 && <InfoSVG className="btn_info" onClick={togglePopup} />}
                </IndexInfoContainer>
                <IndexDeltaScore delta={delta}>
                  {Math.abs(delta)}점{deltaSVG}
                </IndexDeltaScore>
              </IndexItem>
            );
          }))}
      {isPopupOpen && <FearPopUp onClose={togglePopup} />}
    </IndicesContainer>
  );
};

export default IndexScore;
