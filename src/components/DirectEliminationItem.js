import React, { Component } from 'react';
import classnames from 'classnames';

const DirectEliminationItem = ({
    match, upScore, downScore
}) => (
        <div> 
	        <ul className="round round-1">
            <li className="spacer">&nbsp;</li>
        <li className={classnames('game game-top', {'winner': match.goalsA > match.goalsB})}> {match.nameA}
           <span>
                <i className="fas fa-sort-up fa-2x icon" 
                  onClick={() => upScore(match.idPlayerA, match.idMatch)}
                />
                {match.goalsA}
               <i className="fas fa-sort-down fa-2x icon"
                  onClick={() => downScore(match.idPlayerA, match.idMatch)}
                />
            </span>
            </li>
            <li className="game game-spacer">&nbsp;</li>
        <li className={classnames('game game-bottom', { 'winner': match.goalsB > match.goalsA })}> {match.nameB}
            <span>
            <i className="fas fa-sort-up fa-2x icon" 
              onClick={() => upScore(match.idPlayerB, match.idMatch)}
              />
                {match.goalsB}
             <i className="fas fa-sort-down fa-2x icon"
              onClick={() => downScore(match.idPlayerB, match.idMatch)}
             />
              </span>
            </li>
          </ul>
        </div>
      );

export default DirectEliminationItem;
