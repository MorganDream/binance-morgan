import InitialState from './initialState';

const initialState = new InitialState();

function tradeRecordArrayToObject(trade) {
  if (trade.__proto__.constructor !== Array){
    console.error(`${trade} is not an array`);
    return trade;
  }

  let tradeObject = {};
  tradeObject.price = trade[0];
  tradeObject.amount = trade[1];
  return tradeObject;
}

export default function reducer(state = initialState, action) {
  if (!(state instanceof InitialState) || (state == undefined)) return initialState.mergeDeep(state)

  switch (action.type) {
    case 'DATA_UPDATE': {
      let data = action.payload;
      let bnbData = [];
      let btcData = [];
      let ethData = [];
      let usdtData = [];
      data.map(item => {
        if (item.symbol.endsWith('BNB')){
          bnbData.push(item);
        }
        if (item.symbol.endsWith('BTC')){
          btcData.push(item);
        }
        if (item.symbol.endsWith('ETH')){
          ethData.push(item);
        }
        if (item.symbol.endsWith('USDT')){
          usdtData.push(item);
        }
      })
      return state.setIn(['overallData', 'bnb'], bnbData)
                  .setIn(['overallData', 'btc'], btcData)
                  .setIn(['overallData', 'eth'], ethData)
                  .setIn(['overallData', 'usdt'], usdtData);
    }

    case 'ROW_CLICK': {
      return state.setIn(['selected', 'rowInfo'], action.payload);
    }

    case 'SYMBOLD_TRADES_UPDATE': {
      const {lastUpdatedId, bids, asks} = action.payload;
      let bidsArrayOfObjects = [];
      let asksArrayOfObjects = [];
      bids.map(bid => bidsArrayOfObjects.push(tradeRecordArrayToObject(bid)));
      asks.map(ask => asksArrayOfObjects.push(tradeRecordArrayToObject(ask)));
      return state.setIn(['selected', 'lastUpdatedId'], lastUpdatedId)
                  .setIn(['selected', 'bids'], bidsArrayOfObjects)
                  .setIn(['selected', 'asks'], asksArrayOfObjects);
    }
  }

  return state;
}
