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
    const semiFinals = generateSemifinals()
    const matches = [...quarterFinals, ...semiFinals]
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

  initiateSemiFinals = () => {
    const regQ = /^Q/
    const regQF = /^[QF]/
    const semiFinals = []
    const matches = this.state.matches.filter(v => {
      return regQF.test(v.idMatch)
    })

    for (const match of this.state.matches) {
      if (regQ.test(match.idMatch)) {
        if (match.goalsA > match.goalsB) {
          semiFinals.push({
            idPlayer: match.idPlayerA,
            name: match.nameA
          })
        } else {
          semiFinals.push({
            idPlayer: match.idPlayerB,
            name: match.nameB
          })
        }
      }
    }

    matches.push({
      idMatch: 'S0',
      idPlayerA: semiFinals[0].idPlayer,
      nameA: semiFinals[0].name,
      goalsA: 0,
      idPlayerB: semiFinals[1].idPlayer,
      nameB: semiFinals[1].name,
      goalsB: 0
    })

    matches.push({
      idMatch: 'S1',
      idPlayerA: semiFinals[2].idPlayer,
      nameA: semiFinals[2].name,
      goalsA: 0,
      idPlayerB: semiFinals[3].idPlayer,
      nameB: semiFinals[3].name,
      goalsB: 0
    })
    this.setState({ matches })
  }


  initiateFinal = () => {
    const regQF = /^[QS]/
    const regS = /^S/
    const final = []
    const matches = this.state.matches.filter(v => {
      return regQF.test(v.idMatch)
    })

    for (const match of this.state.matches) {
      if (regS.test(match.idMatch)) {
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
      (this.state.matches.length === 7) &&
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
          <ul className="matchup">
            <h5>Quarterfinals</h5>
            <EliminationMatch
              match={this.state.matches.find(v => v.idMatch === 'Q2')}
              upScore={(idPlayer, groupId) => this.handleUpScore(idPlayer, groupId)}
              downScore={(idPlayer, groupId) => this.handleDownScore(idPlayer, groupId)}
            />
          </ul>
          <ul className="matchup">
            <h5>Quarterfinals</h5>
            <EliminationMatch
              match={this.state.matches.find(v => v.idMatch === 'Q3')}
              upScore={(idPlayer, groupId) => this.handleUpScore(idPlayer, groupId)}
              downScore={(idPlayer, groupId) => this.handleDownScore(idPlayer, groupId)}
            />
          </ul>

          <button className="btn btn-success initiate" onClick={() => this.initiateSemiFinals()}>Initiate SemiFinals</button>
        </div>
        <div className="col-1-8">
          <div className="round-two-top">
            <ul className="matchup">
              <h5>Semifinals</h5>
              <EliminationMatch
                match={this.state.matches.find(v => v.idMatch === 'S0')}
                upScore={(idPlayer, groupId) => this.handleUpScore(idPlayer, groupId)}
                downScore={(idPlayer, groupId) => this.handleDownScore(idPlayer, groupId)}
              />
            </ul>
          </div>
          <div className="round-two-bottom">
            <ul className="matchup round-two-bottom">
              <h5>Semifinals</h5>
              <EliminationMatch
                match={this.state.matches.find(v => v.idMatch === 'S1')}
                upScore={(idPlayer, groupId) => this.handleUpScore(idPlayer, groupId)}
                downScore={(idPlayer, groupId) => this.handleDownScore(idPlayer, groupId)}
              />
            </ul>
          </div>
          <button className="btn btn-success initiate" onClick={() => this.initiateFinal()}>Initiate Final</button>
        </div>
        <div className="col-1-8 champ">
          <div className="round-three">
            <ul className="matchup">
              <h5>Final</h5>
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