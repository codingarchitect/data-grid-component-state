const initialState = {
  selectedRows: [],
  gridConfiguration: {
    rowSelectionMode: 'single',
    rowKey: null,
    onRowSelectionChanged: null,
  }
};

const actionTypes = {
  rowsSelected: 'ROWS_SELECTED',
  rowsDeselected: 'ROWS_DE_SELECTED',
  updateGridConfig: 'UPDATE_GRID_CONFIG',
};

const actionCreators = {
  rowsSelected: (rows) => ({
    type: actionTypes.rowsSelected,
    payload: rows
  }),
  rowsDeselected: (rows) => ({
    type: actionTypes.rowsDeselected,
    payload: rows
  }),
  updateGridConfig: (gridConfig) => ({
    type: actionTypes.updateGridConfig,
    payload: gridConfig
  }),
};

const handleUpdateGridConfig = (state, action) => {
  return {
    ...state,
    gridConfiguration: { 
      ...action.payload
    },
  };
}

const handleRowsSelection = (state, action) => {
  let newState;
  if (state.gridConfiguration.rowSelectionMode === 'single') {
    newState = {
      ...state,
      selectedRows: [...action.payload]
    }
  } else {
    newState = {
      ...state,
      selectedRows: [
        ...state.selectedRows,
        ...action.payload
      ]
    }
  }
  const { onRowSelectionChanged } = state.gridConfiguration;
  if (onRowSelectionChanged) onRowSelectionChanged(newState.selectedRows);
  return newState;
}

const handleRowsDeselection = (state, action) => {
  let newState;
  if (state.gridConfiguration.rowSelectionMode === 'single') {
    newState = {
      ...state,
      selectedRows: []
    }
  } else {
    const { rowKey } = state.gridConfiguration;
    newState = {
      ...state,
      selectedRows: 
        state.selectedRows.filter((selectedRow) => !action.payload.includes(selectedRow))
    };
  }
  const { onRowSelectionChanged } = state.gridConfiguration;
  if (onRowSelectionChanged) onRowSelectionChanged(newState.selectedRows);
  return newState;
}

const dataGridReducer = (state = initialState, action) => {
  if (!action || !action.type) return state;
  switch (action.type) {
    case actionTypes.rowsSelected: {
      return handleRowsSelection(state, action);
    }
    case actionTypes.rowsDeselected: {
      return handleRowsDeselection(state, action);
    }
    case actionTypes.updateGridConfig: {
      return handleUpdateGridConfig(state, action);
    }    
    default:
      return state;
  }
};

export default {
  actions: {
    types: actionTypes,
    creators: actionCreators
  },
  reducer: dataGridReducer
};
