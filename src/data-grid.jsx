import React from 'react';
import ReactDataGrid from '@codingarchitect/react-data-grid';

const DataGrid = ({ columns, data, rowKey, onRowSelectionChanged }) => {  
  const rowsCount = data ? data.length : 0;
  const selectedRows = [];
  const onRowsSelected = (rows) => {
    selectedRows.length = 0;
    selectedRows.push(...rows.map(r => r.row.CustomerAccount));
    if (onRowSelectionChanged) onRowSelectionChanged(selectedRows);
  };
  const onRowsDeselected = () => {
    selectedRows.length = 0;
    if (onRowSelectionChanged) onRowSelectionChanged(selectedRows);
  };
  return (<ReactDataGrid
    columns={columns}
    rowGetter={i => data[i]}
    rowsCount={rowsCount}
    minHeight={500}
    onRowClick={(rowId, row) => onRowsSelected([{ row, rowIdx: rowId }])}
    rowSelection={{
      showCheckbox: false,
      onRowsSelected,
      onRowsDeselected,
      selectBy: { keys: { rowKey, values: selectedRows } },
    }}
  />);
};

export default DataGrid;
