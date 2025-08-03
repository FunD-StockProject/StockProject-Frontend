
import BellCurveChart from '../BellCurveChart/BellCurveChart';
import {
  SectionContainer,
  Title,
  TypeDisplay,
  TypeBadge,
  SummaryText,
  UserNameText,
  Highlight
} from './HumanIndexSection.Style';
import { getTypeColor, getTypeEmoji } from '@utils/humanIndexUtils';

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
  return (
    <SectionContainer>
      <Title>나의 인간지표는?</Title>
      <TypeDisplay>
        <UserNameText>{userNickName}님은</UserNameText>
        <TypeBadge color={getTypeColor(userType)}> {getTypeEmoji(userType)} {userType} </TypeBadge> 지표!
      </TypeDisplay>
      <BellCurveChart
        userScore={userScore}
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