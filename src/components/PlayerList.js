import React from 'react';
import PlayerItem from './PlayerItem';
const PlayerList = ({
  players, handleRemovePlayer, handleEditPlayers
}) => (
  players.map(player => (
    <PlayerItem player={player.name} key={player.id} removePlayer={() => handleRemovePlayer(player.id)}
      handleEditPlayers={(e) => handleEditPlayers(e, player.id)}
    />
  ))
);

export default PlayerList;
