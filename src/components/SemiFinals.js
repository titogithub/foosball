import React, { Component } from 'react';
import { generateEliminationMatches, generateSemifinals } from './commons/utils';
import EliminationMatch from './EliminationMatch';
import './Brackets.css';

export default class QuarterFinals extends Component {
  constructor(props) {
    super(props);
    this.state = {
      players: [],
      matches: []

    };
  }

  componentWillMount() {
    this.setState({ players: JSON.parse(localStorage.getItem("winners")) }, () => this.newMatches())
  }

  newMatches = () => {
    const quarterFinals = generateEliminationMatches([...this.state.players])
    const matches = [...quarterFinals]
    matches.push({
      idMatch: 'Final',
      idPlayerA: null,
      nameA: '',
      goalsA: 0,
      idPlayerB: null,
      nameB: '',
      goalsB: 0
    })
    this.setState({ matches })
  }

  handleUpScore = (idPlayer, idMatch) => {
    const newMatch = this.state.matches.map(match => {
      if (match.idMatch === idMatch && match.idPlayerA === idPlayer) {
        match.goalsA += 1
      } else if (match.idMatch === idMatch && match.idPlayerB === idPlayer) {
        match.goalsB += 1
      }
      return match
    })

    this.setState({ matches: newMatch })
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

  initiateFinal = () => {
    const regQ = /^Q/
    const final = []
    const matches = this.state.matches.filter(v => {
      return regQ.test(v.idMatch)
    })

    for (const match of this.state.matches) {
      if (regQ.test(match.idMatch)) {
        if (match.goalsA > match.goalsB) {
          final.push({
            idPlayer: match.idPlayerA,
            name: match.nameA
          })
        } else {
          final.push({
            idPlayer: match.idPlayerB,
            name: match.nameB
          })
        }
      }
    }

    matches.push({
      idMatch: 'Final',
      idPlayerA: final[0].idPlayer,
      nameA: final[0].name,
      goalsA: 0,
      idPlayerB: final[1].idPlayer,
      nameB: final[1].name,
      goalsB: 0
    })

    this.setState({ matches })
  }



  render() {
    return (
      (this.state.matches.length === 3) &&
      <div>
        <div className="col-1-8">
          <ul className="matchup">
            <h5>Quarterfinals</h5>
            <EliminationMatch
              match={this.state.matches.find(v => v.idMatch === 'Q0')}
              upScore={(idPlayer, groupId) => this.handleUpScore(idPlayer, groupId)}
              downScore={(idPlayer, groupId) => this.handleDownScore(idPlayer, groupId)}
            />
          </ul>
          <ul className="matchup">
            <h5>Quarterfinals</h5>
            <EliminationMatch
              match={this.state.matches.find(v => v.idMatch === 'Q1')}
              upScore={(idPlayer, groupId) => this.handleUpScore(idPlayer, groupId)}
              downScore={(idPlayer, groupId) => this.handleDownScore(idPlayer, groupId)}
            />
          </ul>
          <button className="btn btn-success initiate" onClick={() => this.initiateFinal()}>Initiate Final</button>
        </div>
        <div className="col-1-8">
          <div className="round-two-top">
            <ul className="matchup">
              <h5>Semifinals</h5>
              <EliminationMatch
                match={this.state.matches.find(v => v.idMatch === 'Final')}
                upScore={(idPlayer, groupId) => this.handleUpScore(idPlayer, groupId)}
                downScore={(idPlayer, groupId) => this.handleDownScore(idPlayer, groupId)}
              />
            </ul>
          </div>
        </div>
      </div>
    )
  }
}