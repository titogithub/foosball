import React from 'react';
import './EliminationMatchStyle.css'
const EliminationMatch = ({
    match, upScore, downScore
}) => (
    <div>
      <li><span className="seed">{match.goalsA}</span> {match.nameA}
        <i className="fas fa-sort-up fa-2x icon score-right"
          onClick={() => upScore(match.idPlayerA, match.idMatch)}
        />
        <i className="fas fa-sort-down fa-2x icon score-right"
          onClick={() => downScore(match.idPlayerA, match.idMatch)}
        />
        <span className="score"></span>
      </li>

      <li><span className="seed">{match.goalsB}</span>{match.nameB}
        <i className="fas fa-sort-up fa-2x icon score-right"
          onClick={() => upScore(match.idPlayerB, match.idMatch)}
        />
        <i className="fas fa-sort-down fa-2x icon score-right"
          onClick={() => downScore(match.idPlayerB, match.idMatch)}
        />
        <span className="score"></span>
      </li>
    </div>
)

export default EliminationMatch;
