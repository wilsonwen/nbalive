import React, { Component } from 'react';
import Config from './config'
import './App.css';
import 'antd/dist/antd.css'


class App extends Component {

  constructor(props) {
    super(props)
  }


  render() {
    return (
      <div>
        {this.props.children}
      </div>

    );
  }
}

export default App;
