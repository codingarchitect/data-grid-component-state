import React from 'react';
import ReactDataGrid from '@codingarchitect/react-data-grid';

const columns = [
  { key: 'CustomerAccount', name: 'Customer Account', width: 150 },
  { key: 'Name', name: 'Name' }];
const customers = [{
    CustomerAccount: 'C0001',
    Name: 'Sendhil Kumar R',
  }, {
    CustomerAccount: 'C0002',
    Name: 'Sony Arouje',
  }]

const DataGridSample = () => {  
  const rowsCount = customers ? customers.length : 0;
  const selectedCustomers = [];
  const onRowsSelected = (rows) => {
    selectedCustomers.length = 0;
    selectedCustomers.push(...rows.map(r => r.row.CustomerAccount));
  };
  const onRowsDeselected = () => {
    selectedCustomers.length = 0;
  };
  return (<ReactDataGrid
    columns={columns}
    rowGetter={i => customers[i]}
    rowsCount={rowsCount}
    minHeight={500}
    onRowClick={(rowId, row) => onRowsSelected([{ row, rowIdx: rowId }])}
    rowSelection={{
      showCheckbox: false,
      onRowsSelected,
      onRowsDeselected,
      selectBy: { keys: { rowKey: 'CustomerAccount', values: selectedCustomers } },
    }}
  />);
};

export default DataGridSample;
