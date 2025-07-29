import { useState } from 'react';
import BellCurveChart from '../BellCurveChart/BellCurveChart';
import {
  SectionContainer,
  Title,
  TypeDisplay,
  TypeBadge,
  InfoButton,
  SummaryText,
  UserNameText,
  Highlight
} from './HumanIndexSection.Style';
import info from '@assets/info.svg';
import { getTypeColor } from '@utils/humanIndexUtils';

interface HumanIndexSectionProps {
  userScore: number;
  userType: string;
  userNickName: string;
  successRate: string;
  maintainRate: string;
  purchasedCount: number;
  profitCount: number;
  onShowTypes?: () => void;
}

function HumanIndexSection({
  userScore,
  userType,
  userNickName,
  successRate,
  maintainRate,
  purchasedCount,
  profitCount,
  onShowTypes
}: HumanIndexSectionProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <SectionContainer>
      <Title>인간지표</Title>
      <TypeDisplay>
        <UserNameText>{userNickName}님은</UserNameText>
        <TypeBadge color={getTypeColor(userType)}>{userType}</TypeBadge>
        <InfoButton onClick={() => setShowTooltip(!showTooltip)}>
          <img src={info} alt="info" />
        </InfoButton>
      </TypeDisplay>
      <BellCurveChart
        userScore={userScore}
        userType={userType}
        successRate={successRate}
        maintainRate={maintainRate}
        onShowTypes={onShowTypes}
      />
      <SummaryText>
        <Highlight>{purchasedCount}개</Highlight> 종목을 사서, <Highlight>{profitCount}개</Highlight> 오르는 당신의 유형
      </SummaryText>
    </SectionContainer>
  );
}

export default HumanIndexSection; 