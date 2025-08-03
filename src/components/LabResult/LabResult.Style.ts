import styled from '@emotion/styled';
import { theme } from '@styles/themes';

export const Container = styled.div`
  width: 100%;
  max-width: 420px;
  padding: 20px 12px;
  min-height: 100vh;
  box-sizing: border-box;
  overflow-x: hidden;

  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const Title = styled.div`
  ${theme.font.title20Semibold}
  color: ${theme.colors.sub_white};
`;

export const Description = styled.p`
  ${theme.font.body14Medium}
  color: ${theme.colors.sub_white};
  display: flex;
  align-items: center;
`;

export const Highlight = styled.span`
  background: ${theme.colors.grayscale80};
  border-radius: 16px;
  padding: 4px 12px;
  font-weight: 700;
  margin: 0 6px;
`;

// 빈 상태 화면 스타일
export const EmptyStateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 60vh;
  text-align: center;
  color: white;
`;

export const EmptyStateTitle = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 16px;
`;

export const EmptyStateSubtitle = styled.div`
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 16px;
`;

export const EmptyStateDescription = styled.div`
  font-size: 14px;
  color: rgba(255, 255, 255, 0.5);
`;

export const StartButton = styled.button`
  background: ${theme.colors.sub_white};
  border: none;
  border-radius: 500px;
  padding: 16px 32px;
  color: ${theme.colors.sub_black};
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.4);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const GlowEffect = styled.div`
  position: absolute;
  bottom: 20%;
  left: 50%;
  transform: translateX(-50%);
  width: 100px;
  height: 100px;
  background: radial-gradient(circle, rgba(147, 51, 234, 0.3) 0%, transparent 70%);
  border-radius: 50%;
  filter: blur(20px);
`;

