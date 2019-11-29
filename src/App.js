import React from 'react';
import { Switch, Router, Route } from 'react-router-dom';

import GlobalStyle from './styles/global';
import history from './services/history';

import './config/ReactotronConfig';

import Main from './pages/Main';

function App() {
  return (
    <Router history={history}>
      <GlobalStyle />
      <Switch>
        <Route path="/" exact component={Main} />
      </Switch>
    </Router>
  );
}

export default App;
