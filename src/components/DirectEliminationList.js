import React, { Component } from 'react';
import BootstrapModal from './commons/BootstrapModal';
import Match from './Match';

export default class DirectEliminationList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      matches: props.matches || [],
      showErrorModal: false,
      classified: 1,
      displaySettingsModal: false,
      groupId: props.groupId
    };
  }

  handleInputChange = (event) => {
    const target = event.target;
    const name = target.name;
    const type = target.type;
    const value = ((type === 'text') || (type === 'radio')) ? target.value : target.checked
    this.setState({
      [name]: value
    })
  }

  addWinnersToPlayerList = winners => {
    this.props.addWinners(this.state.groupId, winners)
  }

  toggleSettingsModal = () => {
    this.setState({ displaySettingsModal: !this.state.displaySettingsModal })
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
      const punctuation = {idPlayer: player.idPlayer, points: 0, name: player.name}
      this.state.matches.map(match => {
        if (match.idPlayerA === player.idPlayer && this.isWinner(player.idPlayer, match) ){
          punctuation.points +=(match.goalsA - match.goalsB)
        } else if (match.idPlayerB === player.idPlayer && this.isWinner(player.idPlayer ,match)) {
          punctuation.points += (match.goalsB - match.goalsA)
        }
      })
      playersPoints.push(punctuation)  
    })
    const playersPointsAux = [...playersPoints]
    let maxCandidate = {}
    // Calculate max n winners
    for (let i = 0; i < qualificationQty ; i++) {
      let removeIndex = null
      for (let j = 0; j < playersPointsAux.length; j++) {
        if (maxCandidate.idPlayer === undefined || maxCandidate.points < playersPointsAux[j].points) {
          maxCandidate = { ...playersPointsAux[j]}
          removeIndex = j
        }
      }  
      playersPointsAux.splice(removeIndex,1)
      qualifiedPlayers.push(maxCandidate)
      maxCandidate = {}
    }
    // End Calculate max n winners
    // Calculate min
    let minPoints = {}
    qualifiedPlayers.forEach((v,i) => {
      if (minPoints.idPlayer === undefined || v.points < minPoints.points) {
        minPoints = { ...qualifiedPlayers[i]}
      }
    })
    // END Calculate min

    if (!this.validateWinners(playersPointsAux, minPoints)){
      this.toggleModal()
    }

    console.log("classified players: ", qualifiedPlayers)
    // this.addWinnersToPlayerList(qualifiedPlayers)
    this.props.addWinners(this.state.groupId, qualifiedPlayers)

  }
  
  validateWinners = (winners, minPoints) => {
    let validateWinners = true
    winners.forEach((v, i) => {
      if (v.points === minPoints.points) {
        validateWinners = false
      }
  })
    return validateWinners
}

  toggleModal = () => {
     this.setState({ showErrorModal: !this.state.showErrorModal })
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-sm-1 settings">
            <i className="fas fa-cogs fa-2x icon"
              onClick={this.toggleSettingsModal}
            />
          </div>
          </div>
        {this.state.matches.map((match, i) => (
          <Match key={i} match={match}
          downScore={this.handleDownScore}
          upScore={this.handleUpScore} />
        ))}
     <div className="todo-footer">
          <button className="btn btn-success initiate" onClick={() => this.calculateWinners(this.state.classified)}>Calculate Winners</button>
     </div>
        <BootstrapModal isOpen={this.state.showErrorModal}
          okLabel='ok' 
          toggleModal={this.toggleModal}
          okModal={this.toggleModal}
        >
        <p>
          There are players with the same points. Its imposible to determinate only {this.state.classified} number of players. Check classification settings and add more players
        </p>

        </BootstrapModal>

        <BootstrapModal
          isOpen={this.state.displaySettingsModal}
          toggleModal={this.toggleSettingsModal}
          okLabel='ok'
          okModal={this.toggleSettingsModal}
        >
          <div className="row">
            <div className="col-sm-5"><label>Quantity of classified players</label> </div>
            <div className="col-sm-1">
              <div className="row">
                <div className="col-sm-1"><i className="fas fa-sort-up fa-3x icon"
                  onClick={() => { this.setState({ classified: this.state.classified + 1 }) }} />
                </div>
              </div>
              <div className="row">
                <div className="col-sm-1"><i className="fas fa-sort-down fa-3x icon"
                  onClick={() => { this.setState({ classified: this.state.classified - 1 }) }} />
                </div>
              </div>
            </div>
            <div className="col-sm-2">
              <input name="classified" onChange={this.handleInputChange} type="text"
                className="form-control add-todo"
                value={this.state.classified}
              />
            </div>
          </div>
        </BootstrapModal>
    </div>
    );
  }
}
