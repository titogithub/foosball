import React, { Component } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import MainRouter from './MainRouter';
class App extends Component {
  render() {
    return (
      <div>
        <Navbar/>
        <MainRouter/>
      </div>
    );
  }
}

export default App;
