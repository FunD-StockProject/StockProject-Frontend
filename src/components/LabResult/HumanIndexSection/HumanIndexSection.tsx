import {
  SectionContainer,
  Title,
  TypeDisplay,
  TypeBadge,
  SummaryText,
  UserNameText,
  Highlight
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
        <UserNameText>{userNickName}님은
          <TypeBadge color={getTypeColor(userType)}>{getTypeEmoji(userType)}{userType}</TypeBadge>
          지표!
        </UserNameText>
      </TypeDisplay>
      <BellCurveChart
        userScore={userScore}
        userType={userType}
        successRate={successRate}
        maintainRate={maintainRate}
      />
      <SummaryText>
        <Highlight>{purchasedCount}개</Highlight> 종목을 사서, <Highlight>{profitCount}개</Highlight> 오르는 당신의 유형
      </SummaryText>
    </SectionContainer>
  );
}

export default HumanIndexSection; 