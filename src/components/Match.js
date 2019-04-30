import React from 'react';
import classnames from 'classnames';

const Match = ({
    match, upScore, downScore
}) => (
  <div>
      <div className="row match-row">
        <div className={classnames('col-xs-2 ', {'winner': match.goalsA > match.goalsB})}>{match.nameA}</div>
        <div className="col-xs-2">
          <div className="row">
            <div className="col-xs-2"> 
               <i className="fas fa-sort-up fa-2x icon"
                  onClick={() => upScore(match.idPlayerA, match.idMatch)}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-xs-2">
              <i className="fas fa-sort-down fa-2x icon"
                onClick={() => downScore(match.idPlayerA, match.idMatch)}
              />
            </div>
          </div>
        </div>
        <div className="col-xs-2"> {match.goalsA} </div>
        <div className="col-xs-2">  {match.goalsB} </div>
        <div className="col-xs-2">
          <div className="row">
            <div className="col-xs-2">
              <i className="fas fa-sort-up fa-2x icon"
                onClick={() => upScore(match.idPlayerB, match.idMatch)}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-xs-2">
              <i className="fas fa-sort-down fa-2x icon"
                onClick={() => downScore(match.idPlayerB, match.idMatch)}
              />
            </div>
          </div>
        </div>
        <div className={classnames('col-xs-2 ', { 'winner': match.goalsA < match.goalsB })}>{match.nameB}</div>
      </div>
      <div className="row match-row">
        <div className="col-xs-2 match-border-top"></div>
        <div className="col-xs-2 match-diagonal-left"></div>
        <div className="col-xs-2 match-border-bottom"></div>
        <div className="col-xs-2 match-border-bottom"></div>
        <div className="col-xs-2 match-diagonal-right"></div>
        <div className="col-xs-2 match-border-top "></div>
      </div>
  </div>
  );

export default Match;
