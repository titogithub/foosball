import React, { Component } from 'react';
import PlayerList from './PlayerList';

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

  render() {
    return (
      <div className="App">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="todolist not-done">
                <h1>Futbolin Tournament</h1>
                <input name="addPlayer"  onChange={this.handleChange} type="text" className="form-control add-todo" placeholder="Add player" value={this.state.newPlayer}/>
                <button onClick={this.addPlayer}  className="btn btn-success">Add</button>

                <ul id="sortable" className="list-unstyled">
                  <PlayerList players={this.state.players} handleRemovePlayer={this.removePlayer}/>
                </ul>
                <div className="todo-footer">
                  <strong><span className="count-todos"></span></strong> Items Left
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="todolist">
                <h1>Already Done</h1>
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
