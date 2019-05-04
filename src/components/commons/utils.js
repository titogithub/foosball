const toggleModal = (value, stateModal) => {
  this.setState({ value: !stateModal })
}

const mixPlayers = (players) => {
  return players.sort(() => Math.random() - 0.5)
}

const exactNoOfGroups = (groupsNo, players) => {
  const mixedPlayers = mixPlayers(players)
  let groups = []
  for( let i=0; i < groupsNo; i++){
    groups.push([])
  }
  let groupIndex = 0
  mixedPlayers.forEach((v,i) => {
    groups[groupIndex].push(v)
    groupIndex+=1
    if (groupIndex === groupsNo){
      groupIndex = 0
    }
  });
  return groups
}

const unbalancedGroups = (groupsNo, players) => {
  console.log("unbalanced groups")
}

const generateMatches = (players) => {
  const matches = []
  for (let i = 0; i < players.length - 1; i++) {
    for (let j = i + 1; j < players.length; j++) {
      matches.push({
        idMatch: matches.length + 1,
        idPlayerA: players[i].idPlayer,
        nameA: players[i].name,
        goalsA: 0,
        idPlayerB: players[j].idPlayer,
        nameB: players[j].name,
        goalsB: 0
      })
    }
  }
  return matches
}

const addNewPlayerToMatches = (newPlayer, players, matches) => {
  for (let i = 0; i < players.length; i++) {
      matches.push({
        idMatch: (matches.length)? matches.slice(-1)[0].idMatch + 1 : 0,
        idPlayerA: players[i].idPlayer,
        nameA: players[i].name,
        goalsA: 0,
        idPlayerB: newPlayer.idPlayer,
        nameB: newPlayer.name,
        goalsB: 0
      })
  }
}

const removePlayerFromMatches = (idPlayer, matches, groupedPlayers) => {
  debugger
  const newMatches = matches.filter(v => {
    return (v.idPlayerA !== idPlayer && v.idPlayerB !== idPlayer)
  })
  const newPlayers = groupedPlayers.filter(v => {
    return v.idPlayer !== idPlayer
  })
  
  return {newMatches, newPlayers}
}

export {
  toggleModal,
  mixPlayers,
  exactNoOfGroups,
  unbalancedGroups,
  generateMatches,
  addNewPlayerToMatches,
  removePlayerFromMatches
    }