import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from './components/Home';
import TournamentBrackets from './components/TournamentBrackets';
const MainRouter = ({
    params,
}) => (
      <Switch> 
       <Route exact path="/" component={Home} />
      <Route exact path="/eliminations" component={TournamentBrackets} /> 
      </Switch>
  );

export default MainRouter;
