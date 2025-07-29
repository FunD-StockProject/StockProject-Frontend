import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  gap: 16px;
  width: 100%;
  margin-bottom: 16px;
`;

export const ChatSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
`;

export const ChatBubble = styled.div<{ color: string }>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: ${props => props.color};
  border-radius: 12px;
  max-width: fit-content;
`;

export const Emoji = styled.span`
  font-size: 16px;
`;

export const BubbleText = styled.span<{ color: string }>`
  font-size: 13px;
  color: ${props => props.color === '#ffffff' ? '#000' : '#fff'};
  font-weight: 500;
`;

export const InfoSection = styled.div`
  flex: 1;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 16px;
`;

export const InfoTitle = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #fff;
  margin-bottom: 12px;
`;

export const InfoContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const TypeItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const CheckIcon = styled.span`
  color: #4CAF50;
  font-size: 14px;
  font-weight: bold;
`;

export const TypeText = styled.span`
  font-size: 12px;
  color: #fff;
  line-height: 1.4;
`;

export const Description = styled.div`
  font-size: 11px;
  color: rgba(255, 255, 255, 0.7);
  margin-top: 8px;
  line-height: 1.4;
`; 