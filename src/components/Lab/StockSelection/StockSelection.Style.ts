import styled from '@emotion/styled';
import { theme } from '@styles/themes';

export const Section = styled.div`
  ${theme.font.body16Medium};
  margin-bottom: 20px;
`;

export const SectionTitle = styled.div`
  margin-bottom: 8px;
`;

export const SearchBar = styled.div`
  background: ${theme.colors.sub_gray11};
  color:white;
  border-radius: 8px;
  display: flex;
  align-items: center;
  padding: 10px 12px;

  
`;

export const SearchInput = styled.input`
  background: transparent;
  border: none;
  outline: none;
  flex: 1;
  color: white;
  
  &::placeholder{
    color: ${theme.colors.sub_gray7};
  }
`;

export const SearchIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.sub_white};
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
