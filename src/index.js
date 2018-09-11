import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

import MainPage from './pages/MainPage';
import TradePage from './pages/TradePage';

import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducer from './reducers/reducer';
import InitialState from './reducers/initialState';

const store = createStore(reducer, new InitialState())

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
        <Route path="/" component={MainPage}/>
        <Route path="/:symbol" component={TradePage} />
    </Router>
  </Provider>,
  document.getElementById('root'));
registerServiceWorker();
