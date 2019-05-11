import React, { Component } from 'react';
import encuentroMetegol from '../images/encuentro-metegol.jpg'
export default class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (

      <nav className="navbar navbar-expand-md sticky-top  navbar-dark bg-dark">

        <button type="button" className="navbar-toggler " data-toggle="collapse" data-target="#collapse_target">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="collapse_target">
          <a href="" className="navbar-brand"><img className="logo" src={encuentroMetegol} alt="" /></a>
          <span className="navbar-text">Table Soccer</span>
          <ul className="navbar-nav navbar-right">
            <li className="nav-item">
              <a href="/" className="nav-link">Home</a>
            </li>
            <li className="nav-item">
              <a href="/Eliminations" className="nav-link">Eliminations</a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">News</a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">Contact</a>
            </li>
          </ul>
        </div>

      </nav>
    )
  }
}
