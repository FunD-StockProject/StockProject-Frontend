import { StockCountryKey } from '@ts/StockCountry';
import useModal from '@hooks/useModal';
import { useQueryComponent } from '@hooks/useQueryComponent';
import FearPopUp from '@components/PopUp/FearPopUp/FearPopUp';
import { useIndexScoreQuery } from '@controllers/query';
import DownSVG from '@assets/icons/down.svg?react';
import InfoSVG from '@assets/icons/info.svg?react';
import UpSVG from '@assets/icons/up.svg?react';
import { IndexScoreContainer, IndexScoreItem, IndexScoreItemHeader, IndexScoreItemScore } from './IndexScore.style';

const IndexScore = ({ country }: { country: StockCountryKey }) => {
  const [indexScores, suspend] = useQueryComponent({ query: useIndexScoreQuery() });

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

  const { Modal, openModal } = useModal({
    Component: FearPopUp,
  });

  if (suspend) return null;

  return (
    <IndexScoreContainer>
      {stockIndexScores.map(({ score, delta }, idx) => (
        <IndexScoreItem key={idx}>
          <IndexScoreItemHeader>
            <p>{stockIndexNames[idx]}</p>
            {idx === 0 && <InfoSVG onClick={openModal} />}
          </IndexScoreItemHeader>
          <IndexScoreItemScore delta={delta}>
            <p>{score}</p>
            {delta === 0 ? '-' : delta > 0 ? <UpSVG /> : <DownSVG />}
          </IndexScoreItemScore>
        </IndexScoreItem>
      ))}
      <Modal />
    </IndexScoreContainer>
  );
};

export default IndexScore;
