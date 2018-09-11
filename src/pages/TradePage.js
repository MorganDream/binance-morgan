import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";

import SymbolTabTable from '../components/SymbolTabTable';
import Socket from '../lib/Socket';

import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import * as actions from '../reducers/actions';

function mapStateToProps(state) {
  return {
    data: state.selected
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

class TradePage extends React.Component {
  constructor(props){
    super(props);
    this.state = {autoRefreshEnabled: true}
  }

  componentWillMount() {
    var self = this;
    const config = {
      symbol: this.props.params.symbol.toLowerCase(),
      callback: (res) => {
        const { data } = res;
        console.log(`Received new Data from server`);
        self.props.actions.symbolTradesUpdated(JSON.parse(data));
      }
    }
    this.socket = new Socket(config)
    this.socket.connect();
  }

  componentWillUnmount() {
    this.socket.disconnect();
  }

  onWebsocketStatusChange_ = () => {
    if (this.state.autoRefreshEnabled) {
      this.socket.disconnect();
      this.setState({autoRefreshEnabled:false});
    } else {
      this.socket.connect();
      this.setState({autoRefreshEnabled:true});
    }
  }

  render() {
    return (
      <div style={{ padding: 50 }}>
        <h2>{this.props.params.symbol}</h2>
        <button style={{ padding: 5}} onClick={this.onWebsocketStatusChange_}>
          {this.state.autoRefreshEnabled ? `点击关闭自动刷新` : `点击开启自动刷新`}
        </button>
        <Tabs>
          <TabList>
            <Tab>Bids</Tab>
            <Tab>Asks</Tab>
          </TabList>

          <TabPanel>
            <SymbolTabTable data={this.props.data.bids}/>
          </TabPanel>
          <TabPanel>
            <SymbolTabTable data={this.props.data.asks}/>
          </TabPanel>
        </Tabs>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TradePage);
