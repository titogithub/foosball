import React, { Component } from 'react';
import DirectEliminationItem from './DirectEliminationItem';

export default class DirectEliminationList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      matches: props.matches || []
    };
  }

  componentWillReceiveProps = (nextProps) => {
    this.setState({matches: nextProps.matches})
  };

  handleUpScore = (idPlayer, idMatch) => {
    const newMatch = this.state.matches.map(match => {
      if (match.idMatch === idMatch && match.idPlayerA === idPlayer){
        match.goalsA += 1
      } else if (match.idMatch === idMatch && match.idPlayerB === idPlayer){
        match.goalsB += 1
        }
      return match
      })
    
    this.setState({matches:newMatch})
  }

  handleDownScore = (idPlayer, idMatch) => {
    const newMatch = this.state.matches.map(match => {
      if (match.idMatch === idMatch && match.idPlayerA === idPlayer) {
        match.goalsA -= 1
      } else if (match.idMatch === idMatch && match.idPlayerB === idPlayer) {
        match.goalsB -= 1
      }
      return match
    })

    this.setState({ matches: newMatch })
  }

  isWinner = (idPlayer, match) =>{
    if ( match.idPlayerA === idPlayer && match.goalsA > match.goalsB ) {
      return true
    } else if (match.idPlayerB === idPlayer && match.goalsB > match.goalsA ) {
      return true
    }else{
      return false
    }
  }

  calculateWinners = ( qualificationQty )=> {
    const playersPoints = []
    const qualifiedPlayers = []
    this.props.players.map(player => {
      const punctuation = {idPlayer: player.id, points: 0, name: player.name}
      this.state.matches.map(match => {
        if (match.idPlayerA === player.id && this.isWinner(player.id, match) ){
          punctuation.points +=(match.goalsA - match.goalsB)
        } else if (match.idPlayerB === player.id && this.isWinner(player.id ,match)) {
          punctuation.points += (match.goalsB - match.goalsA)
        }
      })
      playersPoints.push(punctuation)  
    })
    console.log("players Points: ", playersPoints)
    const playersPointsAux = [...playersPoints]
    let maxCandidate = {}
   
    // Calculate max n winners
    for (let i = 0; i < qualificationQty ; i++) {
      for (let j = 0; j < playersPointsAux.length; j++) {
        if (maxCandidate.id === undefined || maxCandidate.points < playersPointsAux[j].points) {
          maxCandidate = { ...playersPointsAux[j]}
        }
      }  
      playersPointsAux.pop(maxCandidate)
      qualifiedPlayers.push(maxCandidate)
      maxCandidate = {}
    }
    // End Calculate max n winners

    // Calculate min
    let minPoints = {}
    qualifiedPlayers.forEach((v,i) => {
      if (minPoints.id === undefined || v.points < minPoints.points) {
        minPoints = { ...qualifiedPlayers[i]}
      }
    })
    // END Calculate min
    console.log("minPoints: ", minPoints)
    playersPointsAux.forEach((v,i) => {
      if (v.points === minPoints.points) {
        console.log("there are players with the same points that the minimum player, check classification settings and add more players")
      }
    })

    console.log("qualified players: ", qualifiedPlayers)
  }

  render() {
    return (
      <div>
      {this.state.matches.map((match, i) => (
          <DirectEliminationItem key={i} match={match}
           downScore={this.handleDownScore}
           upScore={this.handleUpScore} />
      ))}
     <div className="todo-footer">
          <button className="btn btn-success initiate" onClick={() => this.calculateWinners(this.props.qualificationQty)}>Calculate Winners</button>
     </div>
    </div>
    );
  }
}
