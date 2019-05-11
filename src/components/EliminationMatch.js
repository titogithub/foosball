import React from 'react';

const EliminationMatch = ({
    match, upScore = () => {console.log("upscore")}, downScore = () => {console.log("downScore")}
}) => (
    <div>
      <li><span className="seed">{match.goalsA}</span> {match.nameA}
        <i className="fas fa-sort-up fa-2x icon"
          onClick={() => upScore(match.idPlayerA, match.idMatch)}
        />
        <i className="fas fa-sort-down fa-2x icon"
          onClick={() => upScore(match.idPlayerA, match.idMatch)}
        />
        <span className="score"></span>
      </li>

      <li><span className="seed">{match.goalsB}</span>{match.nameB}
        <i className="fas fa-sort-up fa-2x icon"
          onClick={() => upScore(match.idPlayerB, match.idMatch)}
        />
        <i className="fas fa-sort-down fa-2x icon"
          onClick={() => upScore(match.idPlayerB, match.idMatch)}
        />
        <span className="score"></span>
      </li>
    </div>
)

export default EliminationMatch;
