import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from './components/Home';
import DirectEliminationItem from './components/DirectEliminationItem';

const MainRouter = ({
    params,
}) => (
      <Switch> 
        <Route exact path="/" component={Home} />
        <Route exact path="/eliminations" component={DirectEliminationItem} /> 
      </Switch>
  );

export default MainRouter;
