import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from './components/Home';
import Match from './components/Match';  

const MainRouter = ({
    params,
}) => (
      <Switch> 
        <Route exact path="/" component={Home} />
        <Route exact path="/eliminations" component={Match} /> 
      </Switch>
  );

export default MainRouter;
