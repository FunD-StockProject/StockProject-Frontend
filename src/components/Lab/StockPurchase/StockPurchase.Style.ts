import styled from '@emotion/styled';
import { deltaScoreToColor } from '@utils/ScoreConvert';
import { theme } from '@styles/themes';

export const SectionTitle = styled.div`
  ${theme.font.body16Medium};
  margin-bottom: 8px;
`;

export const StockGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  margin-top: 16px;
  width: 100%;
  margin-bottom: 50px;
`;

export const StockCard = styled.div({
  background: theme.colors.sub_gray11,
  padding: '10px 0',
  borderRadius: '10px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',

  ['>img']: {
    borderRadius: '999px',
    width: '72px',
    height: 'auto',
    aspectRatio: '1 / 1',
  },
});

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
    width: auto;
    height: 0.5em;
    fill: ${({ delta }) => deltaScoreToColor(delta)};
  }
`;

export const PurchaseButton = styled.button<{ purchased: boolean }>`
  padding: 8px 16px;
  background-color: ${({ purchased }) => (purchased ? '#3451FF' : '#000')};
  color: ${theme.colors.sub_white};
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: ${({ purchased }) => (purchased ? 'default' : 'pointer')};
`;

export const IndustryTagWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 12px;
`;
