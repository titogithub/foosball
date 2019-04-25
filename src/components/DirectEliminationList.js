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

  handleUpScore = (idPlayer) => {
    const newMatch = this.state.matches.map(match => {
      if (match.idPlayerA === idPlayer){
        match.goalsA += 1
      } else if (match.idPlayerB === idPlayer){
        match.goalsB += 1
        }
      return match
      })
    
    this.setState({matches:newMatch})
  }

  handleDownScore = (idPlayer) => {
    const newMatch = this.state.matches.map(match => {
      if (match.idPlayerA === idPlayer) {
        match.goalsA -= 1
      } else if (match.idPlayerB === idPlayer) {
        match.goalsB -= 1
      }
      return match
    })

    this.setState({ matches: newMatch })
  }


  render() {
    return (
      this.state.matches.map((match, i) => (
          <DirectEliminationItem key={i} match={match}
           downScore={this.handleDownScore}
           upScore={this.handleUpScore} />
      ))
    );
  }
}
