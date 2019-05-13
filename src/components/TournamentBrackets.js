import React, { Component } from 'react';
import QuarterFinals from './QuarterFinals';
import SemiFinals from './SemiFinals';
export default class TournamentBrackets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      winners: []
    };
  }

  componentWillMount() {
    if (JSON.parse(localStorage.getItem("winners"))) {
      this.setState({ winners: JSON.parse(localStorage.getItem("winners"))})
    }  
  }
  
  render() {
    if (this.state.winners.length === 8){
      return (<QuarterFinals/>)
    } else if (this.state.winners.length === 4){
      return (<SemiFinals/>)
    }else{
      return (<div>Not Enough Players!!!</div>)
    }
  }
}