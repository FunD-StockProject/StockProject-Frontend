import { TableContainer, Table, TableHeader, TableHeaderCell, TableBody, TableRow, TableCell } from './ScoreTable.Style';

interface ScoreRange {
  range: string;
  avg: string;
  median: string;
}

interface ScoreTableProps {
  data: ScoreRange[];
}

function ScoreTable({ data }: ScoreTableProps) {
  return (
    <TableContainer>
      <Table>
        <TableHeader>
          <tr>
            <TableHeaderCell>인간지표 점수대</TableHeaderCell>
            <TableHeaderCell>전체 평균 수익률</TableHeaderCell>
            <TableHeaderCell>내 평균 수익률</TableHeaderCell>
          </tr>
        </TableHeader>
        <TableBody>
          {data.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.range}</TableCell>
              <TableCell>{item.avg}</TableCell>
              <TableCell>{item.median}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ScoreTable; 