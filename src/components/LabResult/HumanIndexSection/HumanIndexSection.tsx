import {
  SectionContainer,
  Title,
  TypeDisplay,
  TypeBadge,
  SummaryText,
  UserNameText
} from './HumanIndexSection.Style';
import BellCurveChart from '../BellCurveChart/BellCurveChart';
import { getTypeColor, getTypeEmoji } from '@utils/humanIndexUtils';

interface HumanIndexSectionProps {
  userScore: number;
  userType: string;
  userNickName: string;
  successRate: string;
  maintainRate: string;
  purchasedCount: number;
  profitCount: number;
}

function HumanIndexSection({
  userScore,
  userType,
  userNickName,
  successRate,
  maintainRate,
  purchasedCount,
  profitCount
}: HumanIndexSectionProps) {

  return (
    <SectionContainer>
      <Title>인간지표</Title>
      <TypeDisplay>
        <UserNameText>{userNickName}님은</UserNameText>
        <TypeBadge color={getTypeColor(userType)}>{getTypeEmoji(userType)}{userType}</TypeBadge>
        지표

      </TypeDisplay>
      <BellCurveChart
        userScore={userScore}
        userType={userType}
        successRate={successRate}
        maintainRate={maintainRate}
      />
      <SummaryText>
        전체 {purchasedCount}번의 매수 중 {profitCount}번 수익을 보았어요
      </SummaryText>
    </SectionContainer>
  );
}

export default HumanIndexSection; 