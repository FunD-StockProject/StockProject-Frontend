import styled from '@emotion/styled';
import { theme } from '@styles/themes';

export const TableContainer = styled.div`
  width: 100%;
  max-width: 420px;
  margin: 0 auto;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: none;
  padding : 12px 14px;
  box-sizing: border-box;
  background: ${theme.colors.grayscale100};
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

`;

export const TableHeader = styled.thead`
  ${theme.font.body14Regular}
  color: ${theme.colors.grayscale60};
  background: transparent;
`;

export const TableHeaderCell = styled.th`
  text-align: center;
  background: transparent;
`;

export const TableBody = styled.tbody``;

export const TableRow = styled.tr`
  &:not(:last-of-type) {
    border-bottom: 1px solid ${theme.colors.grayscale80};
  }
`;

export const TableCell = styled.td`
  ${theme.font.detail12Medium}  
  padding: 9px 8px;
  text-align: center;
  background: transparent;
`; 