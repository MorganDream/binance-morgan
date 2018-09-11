
export function onDataUpdated(data) {
  return {
    type: 'DATA_UPDATE',
    payload: data
  }
};

export function onRowClicked(rowInfo) {
  return {
    type: 'ROW_CLICK',
    payload: rowInfo
  }
}

export function symbolTradesUpdated(trades) {
  return {
    type: 'SYMBOLD_TRADES_UPDATE',
    payload: trades
  }
}
