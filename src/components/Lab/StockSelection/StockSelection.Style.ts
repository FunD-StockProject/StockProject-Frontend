import styled from '@emotion/styled';
import { theme } from '@styles/themes';

export const Section = styled.div`
  ${theme.font.body16Medium};
  margin-bottom: 20px;
`;

export const SectionTitle = styled.div`
  margin-bottom: 8px;
`;


export const IndustryBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
  background: ${theme.colors.sub_gray11};
  padding: 12px 20px;
  border-radius: 12px;
`;

export const IndustryTag = styled.div<{ selected: boolean }>`
  padding: 8px 16px;
  background: ${({ selected }) => selected ? theme.colors.sub_blue6 : theme.colors.sub_gray10};
color: ${({ selected }) => selected ? theme.colors.sub_white : theme.colors.sub_gray6};
  border-radius: 50px;
`;

export const SelectedStockWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 12px;
`;

export const SelectedStockTag = styled.div`
  ${theme.font.body14Semibold}
  display: flex;
  align-items: center;
  background: ${theme.colors.sub_blue6};
  color: ${theme.colors.sub_white};
  padding: 6px 12px;
  border-radius: 50px;
  
`;
export const SelectedStockSymbolName = styled.div`
  max-width: 100px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const RemoveStockButton = styled.span`
  margin-left: 8px;
  cursor: pointer;
`;


export const SearchModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); // 어두운 반투명 배경
  backdrop-filter: blur(5px); // 흐림 효과 추가
  -webkit-backdrop-filter: blur(5px); // 사파리 지원
  z-index: 999;
`;