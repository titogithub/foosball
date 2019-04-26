import React, { Component } from 'react';
import Star from './Star';

export default class StarList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 0
    };
  }

  handleStarClick = (qty) => {
    this.setState({selected:qty})
    this.props.starsSelected(qty)
  }

  componentDidMount = () => {
    console.log("starList mounted")
  }

  render() {
    return (
      <div> 
        {
          [...Array(this.props.starQty)].map((v,i) => (
          <Star key={i} selected={this.state.selected > i} 
          rateStar={() => this.handleStarClick(i+1)} />
        ))
      }
         </div>
      );
  }
}
