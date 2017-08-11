import React from 'react';
import { compose, withReducer, withHandlers } from 'recompose';
import ReactDataGrid from '@codingarchitect/react-data-grid';
import dataGridStore from './data-grid-reducer';

const enhance = compose(
  withReducer('gridState', 'dispatch', dataGridStore.reducer),
  withHandlers({
    onRowsSelected: ({ dispatch, rowKey }) => (e) => {
      console.log(e);
      dispatch(dataGridStore.actions.creators.rowsSelected(e.map(r => r.row[rowKey])));
    },
    onRowsDeselected: ({ dispatch, rowKey }) => (e) => {
      dispatch(dataGridStore.actions.creators.rowsDeselected(e.map(r => r.row[rowKey])));
    },
    updateGridConfig: ({ dispatch, rowKey, rowSelectionMode }) => () => {
      dispatch(dataGridStore.actions.creators.updateGridConfig({
        rowKey,
        rowSelectionMode,
      }));
    },
  })
);

const DataGrid = (props) => {
  const { columns, data, rowKey, onRowSelectionChanged, rowSelectionMode,
    gridState, onRowsSelected, onRowsDeselected, dispatch } = props;
  const onRowClick = (rowId, row) => {
      if (rowId != -1) 
        onRowsSelected([{ row, rowIdx: rowId }]);
    }
  const rowsCount = data ? data.length : 0;
  if (gridState.gridConfiguration.rowKey === null) {
    dispatch(dataGridStore.actions.creators.updateGridConfig({
      rowKey,
      rowSelectionMode,
      onRowSelectionChanged,
    }));
  }
  return (<ReactDataGrid
    columns={columns}
    rowGetter={i => data[i]}
    rowsCount={rowsCount}
    minHeight={500}
    onRowClick={onRowClick}
    rowSelection={{
      showCheckbox: rowSelectionMode !== 'single',
      onRowsSelected,
      onRowsDeselected,
      selectBy: { keys: { rowKey, values: gridState.selectedRows } },
    }}
  />);
};

export default enhance(DataGrid);
