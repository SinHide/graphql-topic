import React, { Component } from 'react';
import logo from './resources/logo.svg';
import './App.less';

const ChannelList = () => 
  ( <ul className='item-list'>
    <li>Channel 1</li>
    <li>Channel 2</li>
  </ul> );
class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Apollo</h1>
        </header>
        <ChannelList />
      </div>
    );
  }
}

export default App;
