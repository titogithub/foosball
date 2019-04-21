import React, { Component } from 'react';
import './App.css';

import Header from './components/Header';
import MainRouter from './MainRouter';
class App extends Component {
  render() {
    return (
      <div>
        <Header/>
        <MainRouter/>
      </div>
    );
  }
}

export default App;
