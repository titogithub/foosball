import React from 'react';
import PlayerItem from './PlayerItem';
const PlayerList = ({
  players, handleRemovePlayer, handleEditPlayers
}) => (
  players.map(player => (
    <PlayerItem player={player.name} key={player.idPlayer} removePlayer={() => handleRemovePlayer(player.idPlayer)}
      handleEditPlayers={(e) => handleEditPlayers(e, player.idPlayer)}
    />
  ))
);

export default PlayerList;
