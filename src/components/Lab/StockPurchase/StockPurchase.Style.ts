import styled from "@emotion/styled";
import { theme } from "@styles/themes";
import { deltaScoreToColor } from "@utils/ScoreConvert";

export const StockGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  margin-top: 16px;
  width: 100%;
`;

export const StockCard = styled.div`
  background: ${theme.colors.sub_gray11};
  padding: 10px 0;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const StockImagePlaceholder = styled.div`
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background-color: ${theme.colors.sub_gray9};
  margin-bottom: 12px;
`;

export const StockName = styled.div`
  ${theme.font.body18Semibold}
  margin-bottom: 8px;
  max-width: 80%;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const StockPrice = styled.div`
  ${theme.font.body14Medium}
  margin-bottom: 4px;
  display: flex;
  align-items: center;
  gap: 4px;
  flex-wrap: nowrap;
`;

export const StockScore = styled.div`
  ${theme.font.detail12Semibold}
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 4px;
  flex-wrap: nowrap;
`;

export const ScoreDiff = styled.span<{ delta: number }>`
  color: ${({ delta }) => deltaScoreToColor(delta)};

  svg {
    height: 0.5em;
    width: auto;
    fill: ${({ delta }) => deltaScoreToColor(delta)};
  }
`;

export const PurchaseButton = styled.button<{ purchased: boolean }>`
  padding: 8px 16px;
  background-color: ${({ purchased }) => (purchased ? '#3451FF' : '#000')};
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: ${({ purchased }) => (purchased ? 'default' : 'pointer')};
`;

export const ToastStyle = styled.div`
  ${theme.font.detail12Semibold}
  color:${theme.colors.sub_gray2};
  position: fixed;
  bottom: 150px;
  left: 50%;
  transform: translateX(-50%);
  padding: 12px 16px;
  background: rgba(0, 0, 0, 0.80);
  border: 1px solid rgba(73, 80, 87, 0.5);
  border-radius: 5px;
  z-index: 1000;

  max-width: 80vw;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  display: flex;
  align-items: center;
  justify-content: center;
`;