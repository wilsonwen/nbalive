import React, { Component } from 'react';
import Config from './config'
import Game from './Game'
import Spin from './Spin'
import './App.css';

import FontAwesome from 'react-fontawesome';

class App extends Component {

  constructor(props) {
    super(props)
  }


  render() {
    return (
      <div className="App">
       {this.props.children}
      </div>

    );
  }
}

export default App;
