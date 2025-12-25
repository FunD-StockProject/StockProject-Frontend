import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { StockCountryKey } from '@ts/StockCountry';
import useModal from '@hooks/useModal';
import { webPath } from '@router/index';
import FearPopUp from '@components/PopUp/FearPopUp/FearPopUp';
import { useIndexScoreQuery } from '@controllers/score/query';
import DictSVG from '@assets/footer/footer_dict.svg?react';
import DownSVG from '@assets/icons/down.svg?react';
import ExclamationMarkSVG from '@assets/icons/exclamation_mark_circle.svg?react';
import UpSVG from '@assets/icons/up.svg?react';
import {
  HomeInfoBannerContainer,
  HomeInfoContainer,
  HomeInfoScoreContainer,
  HomeInfoScoreItemContainer,
  HomeInfoScoreItemHeader,
  HomeInfoScoreItemValue,
} from './HomeInfo.Style';

type ScoreIndex = 'kospiVix' | 'kospiIndex' | 'kosdaqIndex' | 'snpVix' | 'snpIndex' | 'nasdaqIndex';

const scoreIndexNames: Record<ScoreIndex, string> = {
  kospiVix: '공포지수',
  kospiIndex: '코스피',
  kosdaqIndex: '코스닥',
  snpVix: '공포지수',
  snpIndex: 'S&P 500',
  nasdaqIndex: '나스닥',
};

const scoreIndexCountry: Record<StockCountryKey, ScoreIndex[]> = {
  KOREA: ['kospiVix', 'kospiIndex', 'kosdaqIndex'],
  OVERSEA: ['snpVix', 'snpIndex', 'nasdaqIndex'],
};

const HomeInfo = ({ country }: { country: StockCountryKey }) => {
  const navigate = useNavigate();

  const { data: indexScore } = useIndexScoreQuery();

  const transformed: Record<ScoreIndex, { name: string; value: number; diff: number }> = useMemo(
    () =>
      Object.entries(indexScore ?? []).reduce(
        (acc, [key, value], i, arr) => {
          if (i % 2) return acc;
          return {
            ...acc,
            [key]: {
              name: scoreIndexNames[key as ScoreIndex],
              value: value,
              diff: arr[i + 1][1],
            },
          };
        },
        {} as Record<ScoreIndex, { name: string; value: number; diff: number }>,
      ),
    [indexScore],
  );

  const handleBannerClick = () => {
    navigate(webPath.about());
  };

  const { Modal, openModal } = useModal({
    Component: FearPopUp,
  });

  if (!indexScore) return null;

  return (
    <HomeInfoContainer>
      <Modal />
      <HomeInfoScoreContainer>
        {scoreIndexCountry[country].map((e, idx) => {
          const { name, value, diff } = transformed[e] ?? {};

          return (
            <HomeInfoScoreItemContainer key={`HOME_INFO_SCORE_ITEM_${e}`}>
              <HomeInfoScoreItemHeader>
                <p>{name}</p>
                {idx === 0 && <ExclamationMarkSVG onClick={openModal} />}
              </HomeInfoScoreItemHeader>
              <HomeInfoScoreItemValue delta={diff}>
                <p>{value}</p>
                {diff === 0 ? '' : diff > 0 ? <UpSVG /> : <DownSVG />}
              </HomeInfoScoreItemValue>
            </HomeInfoScoreItemContainer>
          );
        })}
      </HomeInfoScoreContainer>
      <HomeInfoBannerContainer onClick={handleBannerClick}>
        <DictSVG />
        <div>
          <p className="title">도대체 인간지표가 뭐지?</p>
          <p className="description">
            내가 사면 떨어지고, <wbr />
            내가 팔면 오르는 마법??
          </p>
        </div>
      </HomeInfoBannerContainer>
    </HomeInfoContainer>
  );
};

export default HomeInfo;
