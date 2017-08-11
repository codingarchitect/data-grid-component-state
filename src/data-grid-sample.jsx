import React from 'react';
import DataGrid from './data-grid.jsx';

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

const DataGridSample = () => <div>
    <DataGrid 
      columns={columns} 
      data={customers}
      rowKey={columns[0].key}
      rowSelectionMode="single"
      onRowSelectionChanged={console.log} />
    <DataGrid 
      columns={columns} 
      data={customers}
      rowKey={columns[0].key}
      rowSelectionMode="multiple"
      onRowSelectionChanged={console.log} />
  </div>;

export default DataGridSample;
