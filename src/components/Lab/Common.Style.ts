
import styled from '@emotion/styled';
import { theme } from '@styles/themes';

export const Container = styled.div`
  background: black;
  color: ${theme.colors.sub_white};
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

export const TopBar = styled.div<{ statusRate: number }>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 48px;
  padding: 24px;
  border-bottom: 4px solid ${theme.colors.sub_gray11};
  
  &::before {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    height: 4px;
    width: ${({ statusRate }) => `${statusRate}%`};
    background: ${theme.colors.sub_gray9};
  }  
`;


export const BackIcon = styled.div`
  position: absolute;
  left: 20px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  padding-left: 8px;
`;

export const TopBarTitle = styled.div`
  ${theme.font.body18Semibold};
  color: ${theme.colors.sub_gray5};
`;

export const TabContainer = styled.div`
  border-bottom: 1px solid ${theme.colors.sub_gray6};
  padding: 0 24px;
`;

export const InnerContainer = styled.div`
  padding: 24px;
  padding-bottom: 120px; 
  overflow-y: auto;
  justify-content: space-between;
`;

export const Title = styled.div`
  ${theme.font.title20Semibold}
  margin-bottom: 12px;
`;

export const Description = styled.p`
  ${theme.font.body14Medium};
  color: ${theme.colors.sub_gray6};
  margin-bottom: 24px;
`;

export const NavButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 100px;
`;

export const NavButton = styled.button<{ next?: boolean, active?: boolean }>`
  ${theme.font.body18Semibold};
  flex: 1;
  padding: 12px;
  margin: 0 4px;
  border-radius: 8px;
  border: none;
  background: ${({ next, active }) => active ? theme.colors.sub_blue6 : next ? theme.colors.sub_gray8 : theme.colors.sub_gray11};
  color: ${({ next, active }) => active ? theme.colors.sub_white : next ? theme.colors.sub_black : theme.colors.sub_gray5};
  
`;

export const IndustryTag = styled.div<{ selected: boolean }>`
  padding: 6px 12px;
  background: ${({ selected }) => selected ? theme.colors.sub_blue6 : theme.colors.sub_gray10};
  color: white;
  border-radius: 16px;
  font-size: 13px;
  cursor: pointer;
  border: none;
`;


export const SearchInput = styled.input`
  background: transparent;
  border: none;
  outline: none;
  flex: 1;
  color: white;
  
  &::placeholder{
  ${theme.font.body16Medium}
    color: ${theme.colors.sub_gray7};
  }
`;

export const SearchIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.sub_gray8};
`;

export const SearchBar = styled.div`
  background: ${theme.colors.sub_gray11};
  color:white;
  border-radius: 8px;
  display: flex;
  align-items: center;
  padding: 10px 12px;
`;


export const ToastStyle = styled.div`
  ${theme.font.detail12Semibold}
  color:${theme.colors.sub_gray2};
  position: fixed;
  bottom: 100px;
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


export const Divider = styled.div`
  background-color: ${theme.colors.sub_gray11};
  width: calc(100% + 48px);
  border: none;
  height: 4px;
  margin: 24px -24px;
`;