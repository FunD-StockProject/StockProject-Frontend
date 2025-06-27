import styled from '@emotion/styled';
import { theme } from '@styles/themes';

export const FlagBox = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  margin: 40px 0;
`;

export const FlagButton = styled.button<{ selected: boolean; dimmed: boolean }>`
  width: 50%;
  height: 145px;
  background: ${({ selected }) => selected ? theme.colors.primary50 : theme.colors.sub_gray11};
  border: none;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  transition: background 0.2s, opacity 0.2s;
  overflow: hidden;
  padding-top: 12px;
  opacity: ${({ dimmed }) => dimmed ? 0.5 : 1};
`;

export const FlagIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const FlagLabel = styled.div<{ selected: boolean }>`
  ${theme.font.body16Medium};
  color: ${({ selected }) => selected ? theme.colors.sub_white : theme.colors.sub_gray6};
  text-align: center;
  margin-top: 4px;
`;
