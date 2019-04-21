import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'

const PlayerItem = ({
  player, removePlayer, handleEditPlayers
}) => (
      <li className="ui-state-default back-cross">
      <div className="row">
        <div className="col-6 col-sm-9">
          <input onChange={handleEditPlayers} name="editPlayer" type="text" className="form-control add-todo" placeholder="Add player" value={player} />
        </div>
        <div className="col-6 col-sm-3 closeButton">
          <button className="back-cross" onClick={removePlayer}>
            <FontAwesomeIcon icon={faTimesCircle} />
          </button>
        </div>
      </div>
      </li>
  );

export default PlayerItem;
