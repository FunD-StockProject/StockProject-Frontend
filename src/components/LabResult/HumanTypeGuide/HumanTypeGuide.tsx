import {
  Container,
  ChatSection,
  InfoSection,
  ChatBubble,
  Emoji,
  BubbleText,
  InfoTitle,
  InfoContent,
  TypeItem,
  CheckIcon,
  TypeText,
  Description
} from './HumanTypeGuide.Style';

interface HumanType {
  type: string;
  emoji: string;
  color: string;
  successRate: string;
}

function HumanTypeGuide() {
  const humanTypes: HumanType[] = [
    { type: '완전 인간 아님', emoji: '😱', color: '#ff4444', successRate: '0~20%' },
    { type: '인간 아님', emoji: '😞', color: '#ff6666', successRate: '20~40%' },
    { type: '평범 인간', emoji: '😐', color: '#666666', successRate: '40~60%' },
    { type: '인간 맞음', emoji: '🙂', color: '#ffffff', successRate: '60~80%' },
    { type: '인간 완전 맞음', emoji: '😂', color: '#ffffff', successRate: '80% 이상' }
  ];

  return (
    <Container>
      <ChatSection>
        {humanTypes.map((type, index) => (
          <ChatBubble key={index} color={type.color}>
            <Emoji>{type.emoji}</Emoji>
            <BubbleText color={type.color}>{type.type}</BubbleText>
          </ChatBubble>
        ))}
      </ChatSection>

      <InfoSection>
        <InfoTitle>다른 유형은 뭐가 있어요?</InfoTitle>
        <InfoContent>
          {humanTypes.map((type, index) => (
            <TypeItem key={index}>
              <CheckIcon>✓</CheckIcon>
              <TypeText>
                {type.type} 지표: {type.successRate}
              </TypeText>
            </TypeItem>
          ))}
          <Description>
            실험이 끝났을 때 수익률이 0이상인 성공한 실험으로 보고 있어요
          </Description>
        </InfoContent>
      </InfoSection>
    </Container>
  );
}

export default HumanTypeGuide; 