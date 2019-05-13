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

      <nav className="navbar navbar-expand-md sticky-top navbar-inverse">

        <button type="button" className="navbar-toggle " data-toggle="collapse" data-target="#collapse_target">
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
        </button>

        <div className="collapse navbar-collapse" id="collapse_target">
          <div className="navbar-header">
            <a href="" className="navbar-brand Navlogo"><img className="logo" src={encuentroMetegol} alt="" /></a>
          </div>
          <span className="navbar-text">Table Soccer</span>
          <ul className="nav navbar-nav navbar-right">
            <li className="nav-item active">
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
