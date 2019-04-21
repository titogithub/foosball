import React from 'react';
import PlayerItem from './PlayerItem';
const PlayerList = ({
    players, handleRemovePlayer
}) => (
  players.map(player => (
    <PlayerItem player={player.name} key={player.id} removePlayer={() => handleRemovePlayer(player.id)}/>
  ))
);

export default PlayerList;
