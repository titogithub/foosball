import React, { Component } from 'react';
import PlayerList from './PlayerList';
import DirectEliminationList from './DirectEliminationList';
import BootstrapModal from './commons/BootstrapModal';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      players: [],
      newPlayer: '',
      matches: [],
      displaySettingsModal: false,
      classified: 2
    };
  }

  handleChange = (e) => {
    const { target } = e
    const newPlayer = target.value
    this.setState({newPlayer})
  }

  handleInputChange = (event) => {
    const target = event.target;
    const name = target.name;
    const type = target.type;
    const value = type === 'text' ? target.value : target.checked
    this.setState({
      [name]: value
    })
  }

  addPlayer = () => {
    const newPlayers = [...this.state.players]
    newPlayers.push({id: this.state.players.length+1, name:this.state.newPlayer})
    this.setState({ players: newPlayers})
    this.setState({newPlayer:''})
  }

  removePlayer = (id) => {
    const players = this.state.players.filter(player => player.id !== id)
    this.setState({players})
  }

  handleEditPlayers = (e, key) => {
    const players = this.state.players.map(player => {
      if(player.id !== key){
        return player
      }else{
        return {id: key, name: e.target.value}
      }
    })
    this.setState({players})
  } 

  sortPlayers = () => {
    const players = [...this.state.players]
    const shuffledPlayers = players.sort(() => Math.random() -0.5)
    const matches = this.playersCombination(shuffledPlayers)
    this.setState({matches})
  }

  playersCombination = (players) => {
    let permutedPlayers = []
    for (let i = 0; i < players.length - 1; i++) {
      for (let j = i+1; j < players.length; j++) {
        permutedPlayers.push({ idMatch: permutedPlayers.length+1, 
                                idPlayerA: players[i].id, 
                                nameA: players[i].name, 
                                goalsA: 0,
                                idPlayerB: players[j].id,
                                nameB: players[j].name,
                                goalsB: 0 })
      }
    }
    return permutedPlayers
  }

  toggleSettingsModal = () => {
    this.setState({displaySettingsModal: !this.state.displaySettingsModal})
  }

  render() {
    return (
      <div className="App">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="todolist not-done">
                <h1>Futbolin Tournament</h1>
                <input name="addPlayer"  onChange={this.handleChange} type="text" 
                  className="form-control add-todo" 
                  placeholder="Add player" 
                  value={this.state.newPlayer}/>
                <button onClick={this.addPlayer}  className="btn btn-success">Add</button>

                <ul id="sortable" className="list-unstyled">
                  <h3>Players</h3>
                  <PlayerList players={this.state.players}
                   handleRemovePlayer={this.removePlayer} 
                   handleEditPlayers={this.handleEditPlayers}
                   />
                </ul>
                <div className="todo-footer">
                  <button className="btn btn-success initiate" onClick={this.sortPlayers}>Initiate Tournament</button>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="todolist">
                <div className="row">
                  <div className="col-sm-1">
                    <i className="fas fa-cogs fa-2x icon"
                      onClick={this.toggleSettingsModal}
                    />
                  </div>
                  <div className="col-sm-1"><h1>Matches</h1></div>
                </div> 
                <ul className="list-unstyled">
                    <DirectEliminationList matches={this.state.matches} 
                      players={this.state.players} 
                      qualificationQty={this.state.classified}
                    />
                </ul>
              </div>
            </div>
          </div>
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
                   onClick={() => { this.setState({ classified: this.state.classified += 1 }) }}/>
                   </div>
                </div>
                <div className="row">
                  <div className="col-sm-1"><i className="fas fa-sort-down fa-3x icon" 
                    onClick={() => { this.setState({ classified: this.state.classified -= 1 }) }}/>
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
      </div>
    );
  }
}
