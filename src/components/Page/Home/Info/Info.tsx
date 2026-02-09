import { StockCountryKey } from '@ts/StockCountry';
import { deltaToCaret } from '@utils/ScoreConvert';
import GuideBanner from '@components/Common/GuideBanner/GuideBanner';
import useAboutFearModal from '@components/Modal/CenterTutorial/AboutFear/useAboutFear';
import { useIndexScoreQuery } from '@controllers/score/query';
import ExclamationMarkSVG from '@assets/icons/exclamation_mark_circle.svg?react';
import {
  InfoContainer,
  InfoScoreContainer,
  InfoScoreItemContainer,
  InfoScoreItemTitle,
  InfoScoreItemValue,
} from './Info.Style';

const HomeInfo = ({ country }: { country: StockCountryKey }) => {
  const { data: indexScore } = useIndexScoreQuery();

  const { Modal: AboutFearModal, openModal: openAboutFearModal } = useAboutFearModal();

  if (!indexScore) return null;

  return (
    <InfoContainer>
      {AboutFearModal}
      <InfoScoreContainer>
        {indexScore[country].map(({ key, name, value, diff }, idx) => {
          const Caret = deltaToCaret(diff);

          return (
            <InfoScoreItemContainer key={`HOME_INFO_SCORE_ITEM_${key}`}>
              <InfoScoreItemTitle>
                <p>{name}</p>
                {idx === 0 && <ExclamationMarkSVG onClick={() => openAboutFearModal()} />}
              </InfoScoreItemTitle>
              <InfoScoreItemValue delta={diff}>
                <p>{value}</p>
                <Caret />
              </InfoScoreItemValue>
            </InfoScoreItemContainer>
          );
        })}
      </InfoScoreContainer>
      <GuideBanner />
    </InfoContainer>
  );
};

export default HomeInfo;
