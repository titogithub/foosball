import React, { Component } from 'react';
import PlayerList from './PlayerList';
import SatarList from './StarList';
import StarList from './StarList';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      players: [],
      newPlayer: ''
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

  render() {
    return (
      <div className="App">
        <StarList starQty={4}/>
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
                  <button className="btn btn-success initiate">Initiate Tournament</button>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="todolist">
                <h1>Matches</h1>
                <ul id="done-items" className="list-unstyled">
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
