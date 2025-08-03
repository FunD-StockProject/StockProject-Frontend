import styled from '@emotion/styled';
import { theme } from '@styles/themes';

export const LegendContainer = styled.div`
  margin-bottom: 24px;
  // padding: 16px;
  border-radius: 8px;
`;

export const LegendTitle = styled.h3`
  ${theme.font.body16Semibold};
  color: ${theme.colors.sub_white};
`;

export const LegendGrid = styled.div`
  ${theme.font.body14Medium}
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const LegendCell = styled.div`
  ${theme.font.body14Medium};
  display: flex;
  align-items: flex-start;
  gap: 12px;
  border-radius: 8px;
  
  .title-badge {
    background: ${theme.colors.sub_gray11};
    color: ${props => props.color || theme.colors.sub_blue6};
    padding: 4px 12px;
    border-radius: 16px;
    white-space: nowrap;
    width: 72px;
    text-align: center;
  }
  
  .content {
    flex: 1;
    
    div {
      color: ${theme.colors.sub_gray5};
      line-height: 1.4;
    }
  }
`;

export const QuadrantChart = styled.div`
  margin-top: 10px;
  background-color: rgba(255, 255, 255, 0.05);
`;

export const QuadrantTitle = styled.h4`
  ${theme.font.body16Semibold};
  color: ${theme.colors.sub_white};
  margin-bottom: 16px;
`;

export const QuadrantDescription = styled.p`
  ${theme.font.body14Regular};
  color: ${theme.colors.sub_white};
  margin: 8px 0;
`;

export const QuadrantGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 12px;
  height: 200px;
  
  .quadrant {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 8px;
    padding: 12px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    
    &.top-left {
      border-top-left-radius: 12px;
    }
    
    &.top-right {
      border-top-right-radius: 12px;
    }
    
    &.bottom-left {
      border-bottom-left-radius: 12px;
    }
    
    &.bottom-right {
      border-bottom-right-radius: 12px;
    }
  }
`;