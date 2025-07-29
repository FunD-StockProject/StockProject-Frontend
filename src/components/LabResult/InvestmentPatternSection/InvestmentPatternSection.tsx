import { HUMAN_TYPE_LIST } from '@constants/patternTypes';
import { SectionContainer, Title, PatternBadge, PatternDisplay, QuestionButton } from './InvestmentPatternSection.Style';

interface InvestmentPatternSectionProps {
  patternType: string;
  userNickName?: string;
  onShowQuadrant?: () => void;
}

function InvestmentPatternSection({ patternType, userNickName = "", onShowQuadrant }: InvestmentPatternSectionProps) {
  const humanType = HUMAN_TYPE_LIST.find(item => item.type === patternType);

  return (
    <SectionContainer>
      <Title>그동안 지켜본 당신의 투자 패턴은</Title>
      <PatternDisplay>
        {userNickName ? `${userNickName}님은 ` : "당신은 "}
        <PatternBadge background={humanType?.background || '#5270FF'}>
          {humanType?.emoji} {humanType?.type}
        </PatternBadge>
        에 속하는 경우가 많아요
        {onShowQuadrant && (
          <QuestionButton onClick={onShowQuadrant}>
            ◆ {patternType}이란?
          </QuestionButton>
        )}
      </PatternDisplay>
    </SectionContainer>
  );
}

export default InvestmentPatternSection; 