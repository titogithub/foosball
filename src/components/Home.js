import React, { Component } from 'react';
import PlayerItem from './PlayerItem';
import Matches from './Matches';
import BootstrapModal from './commons/BootstrapModal';
import { exactNoOfGroups, unbalancedGroups, generateMatches, addNewPlayerToMatches, removePlayerFromMatches} from './commons/utils';
import DivideStrategy from './commons/divideStrategy';
import RadioButtons from './RadioButton';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      players: [],
      newPlayer: '',
      matches: [],
      classifiedPlayers: [],
      displaySettingsModal: false,
      mainSettingsModal: false,
      classified: 2,
      groups: 2,
      divide: null,
      selectedStrategy: ''
    };
  }

  addWinners = (groupId, winners) => {
    if (!this.state.classifiedPlayers.length){
      this.setState({ classifiedPlayers: [{ groupId, winners }] }, () =>  this.addClassifiedPlayersToList([...this.state.classifiedPlayers]))
    }else {
      const classifiedPlayers = [...this.state.classifiedPlayers]
      for (let i=0; i < classifiedPlayers.length; i++){
        if (classifiedPlayers[i].groupId === groupId){
          classifiedPlayers[i].winners = winners
          this.setState({ classifiedPlayers: [...classifiedPlayers] }, this.addClassifiedPlayersToList([...this.state.classifiedPlayers]))
          break
        }
        if (i === classifiedPlayers.length-1){
          classifiedPlayers.push({ groupId, winners })
          this.setState({classifiedPlayers: [{ groupId, winners }]},() => this.addClassifiedPlayersToList([...this.state.classifiedPlayers]))
        }
      }
    }
  }

  addClassifiedPlayersToList = classifiedPlayers => {
    const newPlayers = []
    for (const group of classifiedPlayers){
      for (const winners of group.winners){
        newPlayers.push(winners)
      }
    }
    localStorage.setItem('winners', JSON.stringify(newPlayers))
    this.setState({ players: [...newPlayers] })
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
    const value = ((type === 'text') || (type === 'radio' )) ? target.value : target.checked
    this.setState({
      [name]: value
    })
  }

  handleRadioChange = (name, value) => {
    this.setState({
      [name]: value
    })
    if (value === 'exactNoOfGroups' ){
      this.state.divide.setStrategy(exactNoOfGroups)
    }
    if (value === 'unbalancedGroups') {
      this.state.divide.setStrategy(unbalancedGroups)
    }

  }

  addPlayer = () => {
    const newPlayers = [...this.state.players]
    if (!this.state.players.length) {
      newPlayers.push({ idPlayer: 0, name: this.state.newPlayer })
    }else{
      newPlayers.push({ idPlayer: this.state.players[this.state.players.length - 1].idPlayer + 1, name: this.state.newPlayer })
    }
    this.setState({ players: newPlayers, newPlayer: ''})
  }

  addPlayerFromGroup = (name) => {
    const newPlayers = [...this.state.players]
    if (!this.state.players.length) {
      newPlayers.push({ idPlayer: 0, name })
    } else {
      newPlayers.push({ idPlayer: this.state.players[this.state.players.length - 1].idPlayer + 1, name})
    }
    
    this.setState({ players: newPlayers})
  }

  removePlayer = (id) => {
    const players = this.state.players.filter(player => player.idPlayer !== id)
    this.setState({players})
  }

  handleEditPlayers = (e, key) => {
    const players = this.state.players.map(player => {
      if(player.idPlayer !== key){
        return player
      }else{
        return {idPlayer: key, name: e.target.value}
      }
    })
    this.setState({players})
  } 

  addPlayerToGroup = (name, group) => {
    const matches = [...this.state.matches]
    const newIdPlayer = (!this.state.players.length)? 1 : [...this.state.players.slice(-1)][0].idPlayer+1
    matches.forEach(v => {
      if(v.groupId === group){
        addNewPlayerToMatches({ idPlayer: newIdPlayer, name }, v.groupedPlayers, v.matches)
        v.groupedPlayers.push({idPlayer: newIdPlayer, name})
        this.addPlayerFromGroup(name)
      }
    })
    this.setState({matches})
  }

  deleteGroup = groupId => {
    const newMatches = [...this.state.matches].filter(v => {
      return v.groupId !== groupId
    })
    this.setState({matches:newMatches})
  }

  removePlayerFromGroup = (idPlayer, group) => {
    const matches = [...this.state.matches]
    matches.forEach(v => {
      if (v.groupId === group) {
       const {newMatches, newPlayers} = removePlayerFromMatches(idPlayer, v.matches, v.groupedPlayers)
       v.matches = newMatches
       v.groupedPlayers = newPlayers
      }
    })
    this.setState({ matches })
  }

  addNewGroup = () => {
    const matches = [...this.state.matches]
    matches.push({groupId: (!matches.length)? 1: matches[matches.length-1].groupId+1, groupedPlayers: [], matches: []})
    this.setState({ matches })
  }

  initiateTournament = () => {
    const players = [...this.state.players]
    let groups = this.state.divide.callStrategy(this.state.groups, players)
    let matches = []
    groups.forEach((v,i) => {
      matches.push({matches:generateMatches(v), groupedPlayers:v, groupId:i})
    });
    this.setState({matches})
  }

  toggleSettingsModal = () => {
    this.setState({displaySettingsModal: !this.state.displaySettingsModal})
  }

  toggleMainSettingsModal = () => {
    this.setState({ mainSettingsModal: !this.state.mainSettingsModal })
  }

  componentDidMount(){
    const ds = new DivideStrategy()
    this.setState({ divide: ds }, () => this.state.divide.setStrategy(exactNoOfGroups)
)
  }

  render() {
    return (
      <div className="App">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="todolist not-done">
                <div className="row">
                  <div className="col-sm-1">
                    <i className="fas fa-cogs fa-2x icon"
                      onClick={this.toggleMainSettingsModal}
                    />
                  </div>
                  <div className="col-sm-11"><h1>Futbolin Tournament</h1></div>
                </div> 
                <input name="addPlayer"  onChange={this.handleChange} type="text" 
                  className="form-control add-todo" 
                  placeholder="Add player" 
                  value={this.state.newPlayer}/>
                <button onClick={this.addPlayer}  className="btn btn-success">Add</button>

                <ul id="sortable" className="list-unstyled">
                  <h3>Players</h3>
                   {this.state.players.map((player,i) => (
                     <PlayerItem player={player.name} key={i} idPlayer={player.idPlayer} removePlayer={() => this.removePlayer(player.idPlayer)}
                       handleEditPlayers={(e) => this.handleEditPlayers(e, player.idPlayer)}
                     />
                   ))}
                </ul>
                <div className="todo-footer">
                  <button className="btn btn-success initiate" onClick={this.initiateTournament}>Initiate Tournament</button>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="todolist">
                <div className="row">
                  <div className="col-sm-1"><h1>Matches</h1></div>
                </div> 
                <ul className="list-unstyled">
                {this.state.matches.map((v,i) => {
                  return (
                    <div key={i} >
                      <div className="row">
                        <div className="col-xs-9"><h1>Group {v.groupId}</h1></div>
                        <div className="col-xs-1"><button onClick={() => this.deleteGroup(v.groupId)} className="btn btn-danger">Delete Group</button></div>
                      </div>
                    <div className="row">
                      <div className="col-xs-12">
                          <Matches matches={v.matches}
                            players={v.groupedPlayers}
                            qualificationQty={this.state.classified}
                            addWinners={(groupId, qualifiedPlayers) => this.addWinners(groupId, qualifiedPlayers)}
                            groupId={v.groupId}
                            addPlayer={(name, group) => this.addPlayerToGroup(name, group)}
                            removePlayerFromGroup={(idPlayer, group) => this.removePlayerFromGroup(idPlayer, group)}
                          />
                      </div>
                    </div>
                  </div>)
                })
                     }
                <div className="row new-group">
                     <div className="col-xs-12">
                      <button className="btn btn-primary" onClick={() => this.addNewGroup()}>Add New Group</button>
                     </div>
                </div>
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
                   onClick={() => { this.setState({ classified: this.state.classified + 1 }) }}/>
                   </div>
                </div>
                <div className="row">
                  <div className="col-sm-1"><i className="fas fa-sort-down fa-3x icon" 
                    onClick={() => { this.setState({ classified: this.state.classified -1 }) }}/>
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

          <BootstrapModal
            isOpen={this.state.mainSettingsModal}
            toggleModal={this.toggleMainSettingsModal}
            okLabel='ok'
            okModal={this.toggleMainSettingsModal}
          >
           <div>
            <div className="row">
              <div className="col-sm-5 group"><label>Number of groups</label> </div>
              <div className="col-sm-1">
                <div className="row">
                  <div className="col-sm-1"><i className="fas fa-sort-up fa-3x icon"
                    onClick={() => { this.setState({ groups: this.state.groups + 1 }) }} />
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-1"><i className="fas fa-sort-down fa-3x icon"
                    onClick={() => { this.setState({ groups: this.state.groups - 1 }) }} />
                  </div>
                </div>
              </div>
              <div className="col-sm-2">
                <input name="groups" onChange={this.handleInputChange} type="text"
                  className="form-control add-todo"
                  value={this.state.groups}
                />
              </div>
            </div>
              <div className="row">
                <div className="col-md-12">
                  <RadioButtons
                    name="selectedStrategy"
                    value="exactNoOfGroups"
                    handleOptionChange={this.handleRadioChange}
                    selectedOption={this.state.selectedStrategy}
                    label='Exact Number of Groups'
                  />
                </div>
                <div className="col-md-12">
                  <RadioButtons
                    name="selectedStrategy"
                    value="unbalancedGroups"
                    handleOptionChange={this.handleRadioChange}
                    selectedOption={this.state.selectedStrategy}
                    label='Unbalanced Groups'
                  />
                </div>
              </div>
            </div>
          </BootstrapModal>
        </div>
      </div>
    );
  }
}
