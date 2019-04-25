import React, { Component } from 'react';

const DirectEliminationItem = ({
    match, upScore, downScore
}) => (
        <div> 
	        <ul className="round round-1">
            <li className="spacer">&nbsp;</li>
            <li className="game game-top winner"> {match.nameA}
           <span>
                <i className="fas fa-sort-up fa-2x arrow" 
                  onClick={() => upScore(match.idPlayerA)}
                />
                {match.goalsA}
               <i className="fas fa-sort-down fa-2x arrow"
                onClick={() => downScore(match.idPlayerA)}
                />
            </span>
            </li>
            <li className="game game-spacer">&nbsp;</li>
            <li className="game game-bottom "> {match.nameB}
            <span>
            <i className="fas fa-sort-up fa-2x arrow" 
              onClick={() => upScore(match.idPlayerB)}
              />
                {match.goalsB}
             <i className="fas fa-sort-down fa-2x arrow"
              onClick={() => downScore(match.idPlayerB)}
             />
              </span>
            </li>
          </ul>
          <div className="container">
            <div className="row">
              <div className="col-xs-2 col-sm-1 "><div className="game game-top winner"> </div> </div>
              <div className="col-xs-2 col-sm-1"></div>
            </div>
            <div className="row">
              <div className="col-xs-2 col-sm-1"></div>
              <div className="col-xs-2 col-sm-1"></div>
            </div>
          </div>

        </div>
      );

export default DirectEliminationItem;
