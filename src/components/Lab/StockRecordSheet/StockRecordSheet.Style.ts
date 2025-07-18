

import styled from "@emotion/styled";
import { theme } from "@styles/themes";


export const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center; 
`;

export const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`;

export const FilterTabs = styled.div`
  display: flex;
  gap: 8px;
`;

export const FilterTab = styled.button<{ selected: boolean }>`
${theme.font.body14Semibold};
  padding: 6px 12px;
  border-radius: 16px;
  font-size: 14px;
  border: none;
  background-color: ${({ selected }) => (selected ? theme.colors.sub_blue6 : theme.colors.sub_gray11)};
  color: ${({ selected }) => (selected ? theme.colors.sub_white : theme.colors.sub_gray6)};
  cursor: pointer;
`;

export const SortDropdown = styled.select`
  ${theme.font.body14Regular}
  background-color: transparent;
  color: ${theme.colors.sub_gray4};
  border-radius: 12px;
  border: none;
`;