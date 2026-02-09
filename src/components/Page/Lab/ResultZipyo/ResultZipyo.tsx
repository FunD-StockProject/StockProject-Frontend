import styled from '@emotion/styled';
import useAuthInfo from '@hooks/useAuthInfo';
import ReportClassChart from '@components/Lab/ReportClassChart/ReportClassChart';
import { reportClassMap } from '@components/Lab/ReportClassChart/ReportClassChart.Type';
import { PortfolioResultHumanIndicator } from '@controllers/experiment/api';
import { theme } from '@styles/themes';
import HelpSVG from '@assets/icons/question_mark_circle_fill.svg?react';
import {
  ResultItemContainer,
  ResultItemHelpContainer,
  ResultItemTitle,
  ResultItemTitleHighlight,
} from '../Common.Style';

const ZipyoChartContainer = styled.div({
  background: `${theme.colors.sub_white}0D`,
  padding: '12px 10px',
  borderRadius: '4px',
});

const ZipyoSummary = styled.p({
  ...theme.font.body14Medium,
  color: theme.colors.sub_gray1,
  margin: '0',
  wordBreak: 'keep-all',
  textIndent: '-0.5em',
  paddingLeft: '0.5em',

  ['>span']: {
    color: theme.colors.sub_white,
    background: `${theme.colors.sub_white}1A`,
    padding: '4px 12px',
    borderRadius: '999px',
  },
});

const LabResultZipyo = ({
  humanIndicator,
  openHelpModal,
}: {
  humanIndicator?: PortfolioResultHumanIndicator;
  openHelpModal: () => void;
}) => {
  const { userInfo } = useAuthInfo();

  if (!humanIndicator) return null;

  const { type, successRate, percentile, totalBuyCount, successCount } = humanIndicator;

  const reportClass = reportClassMap[type];
  const { icon, title, color, background } = reportClass;

  return (
    <ResultItemContainer>
      <ResultItemTitle>
        <p className="title">나의 인간지표는?</p>
        <p className="description">
          {userInfo?.nickname}님은 <wbr />
          <ResultItemTitleHighlight type="ZIPYO" color={color} background={background}>
            {icon} {title}
          </ResultItemTitleHighlight>
          지표!
        </p>
      </ResultItemTitle>
      <ResultItemHelpContainer onClick={() => openHelpModal()}>
        <HelpSVG />
        <p>다른 유형은 뭐가 있어요?</p>
      </ResultItemHelpContainer>
      <ZipyoChartContainer>
        <ReportClassChart reportClass={reportClass} successRate={successRate} sameGradeUserRate={percentile} />
      </ZipyoChartContainer>
      <ZipyoSummary>
        <span>{totalBuyCount}개</span> 종목을 사서, <span>{successCount}개</span> 오르는 당신의 유형!
      </ZipyoSummary>
    </ResultItemContainer>
  );
};

export default LabResultZipyo;
