import React, { Component } from 'react';
import Star from './Star';

export default class StarList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: props.selected || 0
    };
  }

  handleStarClick = (qty) => {
    this.setState({selected:qty})
  }

  render() {
    return (
      <div> 
        {
          [...Array(this.props.starQty)].map((v,i) => (
          <Star selected={this.state.selected > i} 
          rateStar={() => this.handleStarClick(i+1)} />
        ))
      }
         </div>
      );
  }
}
