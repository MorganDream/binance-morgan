const {Record} = require('immutable');

var InitialState = Record({
  overallData: new Record({
    bnb: [],
    btc: [],
    eth: [],
    usdt: [],
  })(),
  selected: new Record({
    rowInfo: {},
    lastUpdatedId: null,
    asks: [],
    bids: [],
  })(),
});

export default InitialState;
