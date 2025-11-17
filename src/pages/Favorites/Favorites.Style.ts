import styled from '@emotion/styled';
import { theme } from '@styles/themes';

export const Container = styled.div`
  background: ${theme.colors.sub_black};
  color: ${theme.colors.sub_white};
  padding: 0;
  position: relative;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

export const HeaderTitle = styled.div`
  ${theme.font.body18Semibold};
  color: ${theme.colors.sub_white};
  flex: 1;
  margin-left: 15px;
`;

export const HeaderContainer = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

export const EditButton = styled.span`
  cursor: pointer;
  background: none;
  margin-left: 12px;
  display: inline-flex;
  align-items: baseline;
`;

export const UpdateInfo = styled.div`
  ${theme.font.detail12Medium};
  color: ${theme.colors.sub_gray6};
  margin-top: 8px;
`;

export const Content = styled.div`
  padding: 20px;
  flex: 1;
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
`;

export const SVGContainer = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${theme.colors.sub_gray11};
  border-radius: 12px;
`;

export const ActionButtons = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  gap: 20px;
  width: 100%;
`;

export const ActionButton = styled.div`
  ${theme.font.body18Medium};
  background-color: ${theme.colors.sub_gray11};
  color: ${theme.colors.sub_gray6};
  padding: 12px 20px;
  box-sizing: border-box;
  border-radius: 10px;
  text-align: center;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

export const ActionButtonPrimary = styled(ActionButton)`
  ${theme.font.body18Semibold}
  background: ${theme.colors.sub_gray2};
  color: ${theme.colors.sub_black};

  svg {
    width: 24px;
    height: 24px;
  }
`;

export const StockList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
`;

export const StockContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;
export const StockItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 20px;
  background: ${theme.colors.sub_gray11};
  border-radius: 12px;
  transition: background 0.2s ease;
  width: 100%;
`;

export const StockInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const StockName = styled.div`
  ${theme.font.title20Semibold};
  color: ${theme.colors.sub_white};
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const StockPriceRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const StockPrice = styled.div`
  ${theme.font.body16Medium};
  color: ${theme.colors.sub_white};
`;

export const StockChange = styled.div`
  ${theme.font.body16Medium};
`;

export const StockScoreRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const StockScore = styled.div`
  ${theme.font.detail12Medium};
  color: ${theme.colors.sub_gray6};
`;

export const StockScoreChange = styled.div`
  ${theme.font.detail12Medium};
  color: ${theme.colors.danger};
`;

export const NotificationIcon = styled('button')<{ isActive: boolean }>(({ isActive }) => ({
  background: 'none',
  border: 'none',
  fontSize: '20px',
  cursor: 'pointer',
  transition: 'color 0.2s ease',
  '& svg *': {
    fill: isActive ? theme.colors.sub_blue5 : theme.colors.sub_gray7,
  },
}));

export const Checkbox = styled.input`
  width: 20px;
  height: 20px;
  cursor: pointer;
  accent-color: ${theme.colors.sub_gray1};
  margin-right: 12px;
  align-self: center;
`;

export const DeleteButton = styled.button`
  position: fixed;
  bottom: 120px;
  left: 0;
  right: 0;
  background: ${theme.colors.sub_gray1};
  color: ${theme.colors.sub_black};
  border: none;
  padding: 10px 0;
  border-radius: 8px;
  ${theme.font.body18Semibold};
  cursor: pointer;
  margin: 0 20px;
  z-index: 100;
`;
