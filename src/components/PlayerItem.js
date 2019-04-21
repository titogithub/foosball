import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'

const PlayerItem = ({
    player, removePlayer
}) => (
    <li className="ui-state-default back-cross">{player}
    <button className="back-cross" onClick={removePlayer}>
    <FontAwesomeIcon icon={faTimesCircle} />
    </button>
    </li>
  );

export default PlayerItem;
