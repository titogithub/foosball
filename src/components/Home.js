import React, { Component } from 'react';
import PlayerList from './PlayerList';
import DirectEliminationList from './DirectEliminationList';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      players: [],
      newPlayer: '',
      matches: []
    };
  }

  handleChange = (e) => {
    const { target } = e
    const newPlayer = target.value
    this.setState({newPlayer})
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
    console.log("matches: ", this.state.matches)
  }

  playersCombination = (players) => {
    let permutedPlayers = []
    for (let i = 0; i < players.length - 1; i++) {
      for (let j = i+1; j < players.length; j++) {
        permutedPlayers.push({ idPlayerA: players[i].id, nameA: players[i].name , goalsA: 0, idPlayerB: players[j].id , nameB: players[j].name, goalsB: 0 })
      }
    }
    return permutedPlayers
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
                <h1>Matches</h1>
                <ul  className="list-unstyled">
                <DirectEliminationList matches={this.state.matches}/>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
