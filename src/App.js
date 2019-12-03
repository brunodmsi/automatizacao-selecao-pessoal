import React from 'react';
import { Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import GlobalStyle from './styles/global';

import history from './services/history';
import Routes from './routes'

import './config/ReactotronConfig';

function App() {
  return (
    <Router history={history}>
      <GlobalStyle />
      <ToastContainer autoClose={2000} />
      <Routes />
    </Router>
  );
}

export default App;
