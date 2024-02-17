import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

const renderCellValue = (row, column) => {
    const value = row[column.id];
    if (typeof value === 'boolean') {
      return value.toString();
    } else if (Array.isArray(value)) {
      return value.join(', ');
    } else {
      return value;
    }
  };

// Define columns for table1
const columns1 = [
  { id: 'Parola', label: 'Parola', minWidth: 100 },
  { id: 'PosizioneAccento', label: 'Posizione Accento', minWidth: 100 },
  { id: 'NumElementiSillabazione', label: 'Num Elementi Sillabazione', minWidth: 100 },
  { id: 'DiexSin_eresi', label: 'DiexSin_eresi', minWidth: 100 },
  { id: 'Sillabazione', label: 'Sillabazione', minWidth: 100 },
  { id: 'Trovata', label: 'Trovata', minWidth: 100 },
  { id: 'Riga_testo_indice_parola', label: 'Riga_testo_indice_parola', minWidth: 100 },
 
  { id: 'Substringa_Rima', label: 'Substringa_Rima', minWidth: 100 },
  { id: 'Ultima_Parola', label: 'Ultima_Parola', minWidth: 100 },
  { id: 'Sinalefe', label: 'Sinalefe', minWidth: 100 },
  { id: 'Range_vocali', label: 'Range_vocali', minWidth: 100 },
  { id: 'TipoDiParola', label: 'TipoDiParola', minWidth: 100 },
  { id: 'Alternative', label: 'Alternative', minWidth: 100 },

    // Add more columns as needed
];

// Define columns for table2
const columns2 = [
  { id: 'Totale_Dieresi', label: 'Totale_Dieresi', minWidth: 100 },
  { id: 'Totale_Sinalefe', label: 'Totale_Sinalefe', minWidth: 100 },
  { id: 'Totale_Sineresi', label: 'Totale_Sineresi', minWidth: 100 },
  { id: 'computo_finale', label: 'computo_finale', minWidth: 100 },
  { id: 'conto_assoluto', label: 'conto_assoluto', minWidth: 100 },
  { id: 'posiz_acc_in_verso', label: 'posiz_acc_in_verso', minWidth: 100 },
  // Add more columns as needed
];

export const RenderTables = ({ responseData }) => {
  // Pagination state for table1
  const [pageTable1, setPageTable1] = useState(0);
  const [rowsPerPageTable1, setRowsPerPageTable1] = useState(5);

  // Pagination state for table2
  const [pageTable2, setPageTable2] = useState(0);
  const [rowsPerPageTable2, setRowsPerPageTable2] = useState(5);

  if (!response || !response.ajaxResponses || response.ajaxResponses.length === 0) {
    return <div>No data available</div>;
  }

  // Aggregate data for table1 and table2
  const table1Data = response.ajaxResponses.map((responseData) => responseData.response.table1).flat();
  const table2Data = response.ajaxResponses.map((responseData) => responseData.response.table2).flat();

  return (
    <div>
      {/* Table 1 */}
      <Paper sx={{ width: '100%', overflow: 'hidden', marginBottom: '20px' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns1.map((column) => (
                  <TableCell key={column.id} align="center" style={{ minWidth: column.minWidth }}>
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPageTable1 > 0
                ? table1Data.slice(pageTable1 * rowsPerPageTable1, pageTable1 * rowsPerPageTable1 + rowsPerPageTable1)
                : table1Data
              ).map((row, index) => (
                <TableRow key={index}>
                  {columns1.map((column) => (
                    <TableCell key={column.id} align="center">
                            {renderCellValue(row, column)}

                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={table1Data.length}
          rowsPerPage={rowsPerPageTable1}
          page={pageTable1}
          onPageChange={(event, newPage) => setPageTable1(newPage)}
          onRowsPerPageChange={(event) => {
            setRowsPerPageTable1(+event.target.value);
            setPageTable1(0);
          }}
        />
      </Paper>

      {/* Table 2 */}
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns2.map((column) => (
                  <TableCell key={column.id} align="center" style={{ minWidth: column.minWidth }}>
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPageTable2 > 0
                ? table2Data.slice(pageTable2 * rowsPerPageTable2, pageTable2 * rowsPerPageTable2 + rowsPerPageTable2)
                : table2Data
              ).map((row, index) => (
                <TableRow key={index}>
                  {columns2.map((column) => (
                    <TableCell key={column.id} align="center">
                            {renderCellValue(row, column)}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={table2Data.length}
          rowsPerPage={rowsPerPageTable2}
          page={pageTable2}
          onPageChange={(event, newPage) => setPageTable2(newPage)}
          onRowsPerPageChange={(event) => {
            setRowsPerPageTable2(+event.target.value);
            setPageTable2(0);
          }}
        />
      </Paper>
    </div>
  );
};

export default RenderTables;
