import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";
import { browserHistory } from 'react-router'

import OverallTabTable from '../components/OverallTabTable';

import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import * as actions from '../reducers/actions';

function mapStateToProps(state) {
  return {
    data: state.overallData
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

class MainPage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    var self = this;
    var request = new XMLHttpRequest();
    request.open('GET', 'https://www.binance.co/exchange/public/product', true);
    request.onload = function ({target:{response}}) {
      let {data} = JSON.parse(response);
      self.props.actions.onDataUpdated(data);
    }
    request.send();
  }

  onRowClickCallback = rowInfo => {
    if (!rowInfo) {
      return;
    }
    this.props.actions.onRowClicked(rowInfo);
    browserHistory.push(`/${rowInfo.original.symbol}`);
  }

  render() {
    return (
      <div style={{ padding: 50 }}>
        <Tabs>
          <TabList>
            <Tab>BNB Markets</Tab>
            <Tab>BTC Markets</Tab>
            <Tab>ETH Markets</Tab>
            <Tab>USDT Markets</Tab>
          </TabList>

          <TabPanel>
            <OverallTabTable data={this.props.data.bnb} onRowClickCallback={this.onRowClickCallback} />
          </TabPanel>
          <TabPanel>
            <OverallTabTable data={this.props.data.btc} onRowClickCallback={this.onRowClickCallback} />
          </TabPanel>
          <TabPanel>
            <OverallTabTable data={this.props.data.eth} onRowClickCallback={this.onRowClickCallback} />
          </TabPanel>
          <TabPanel>
            <OverallTabTable data={this.props.data.usdt} onRowClickCallback={this.onRowClickCallback} />
          </TabPanel>
        </Tabs>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
