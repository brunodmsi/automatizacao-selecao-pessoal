import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import Main from '../pages/Main';
import VariablesIndex from '../pages/Variables/Index';
import VariablesCreate from '../pages/Variables/Create';
import RulesIndex from '../pages/Rules/Index'

function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Main} />

      <Route path="/variables" exact component={VariablesIndex} />
      <Route path="/variables/add" component={VariablesCreate} />

      <Route path="/rules" component={RulesIndex} />
    </Switch>
  );
}

export default Routes;
