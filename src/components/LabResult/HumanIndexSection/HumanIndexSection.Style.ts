import styled from '@emotion/styled';
import { theme } from '@styles/themes';

export const SectionContainer = styled.div`
  width: 100%;
  margin-bottom: 24px;
`;

export const Title = styled.div`
  ${theme.font.title20Semibold};
  color: ${theme.colors.sub_white};
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  
  button {
    background: none;
    border: none;
    color: ${theme.colors.sub_blue6};
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

export const TypeDisplay = styled.div`
  ${theme.font.body18Medium};
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
`;

export const TypeBadge = styled.span<{ color: string }>`
  background: ${props => props.color};
  color: ${theme.colors.sub_white};
  padding: 4px 12px;
  border-radius: 16px;
  font-weight: 600;
`;

export const InfoButton = styled.button`
  background: none;
  border: none;
  padding: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 16px;
    height: 16px;
  }
`;

export const SummaryText = styled.p`
  ${theme.font.body14Medium};
  color: ${theme.colors.sub_white};
  text-align: flex-start;
`;

export const Highlight = styled.span`
  background: ${theme.colors.grayscale80};
  border-radius: 16px;
  padding: 4px 12px;
`;

export const UserNameText = styled.span`
  ${theme.font.body18Semibold};
  color: ${theme.colors.sub_white};

  display: flex;
  gap: 6px;
  align-items: center;
`;

export const NumberBadge = styled.span`
  background: ${theme.colors.grayscale80};
  color: ${theme.colors.sub_white};
  padding: 4px 8px;
  border-radius: 50px;
  ${theme.font.body14Medium}
`;

export const HighlightedText = styled.span`
  color: ${theme.colors.grayscale50};
`; 