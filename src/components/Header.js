import React from 'react';
import { Link } from "react-router-dom";

const Header = ({
    params,
}) => (
 <div>
 <nav className="navbar navbar-inverse">
      <div className="container">
        <div className="navbar-header">
          <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse-4">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <a className="navbar-brand" href="#">Table Soccer</a>
        </div>

        <div className="collapse navbar-collapse" id="navbar-collapse-4">
          <ul className="nav navbar-nav navbar-right">
            <li><a href="/">Home</a></li>
            <li><a href="/Eliminations">Eliminations</a></li>
            <li><a href="#">News</a></li>
            <li><a href="#">Contact</a></li>
            <li>
              <a className="btn btn-default btn-outline btn-circle collapsed" data-toggle="collapse" href="#nav-collapse4" aria-expanded="false" aria-controls="nav-collapse4">Profile <i className=""></i> </a>
            </li>
          </ul>
          <ul className="collapse nav navbar-nav nav-collapse slide-down" role="search" id="nav-collapse4">
            <li><a href="#">Support</a></li>
            <li className="dropdown">
              <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false"><img className="img-circle" src="https://pbs.twimg.com/profile_images/588909533428322304/Gxuyp46N.jpg" alt="maridlcrmn" width="20" /> Maridlcrmn <span className="caret"></span></a>
              <ul className="dropdown-menu" role="menu">
                <li><a href="#">My profile</a></li>
                <li><a href="#">Favorited</a></li>
                <li><a href="#">Settings</a></li>
                <li className="divider"></li>
                <li><a href="#">Logout</a></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
</div >
);

export default Header;
