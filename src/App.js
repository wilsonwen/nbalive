import React, { Component } from 'react';
import { browserHistory, Link } from 'react-router';
import Config from './config'
import './App.css';
import 'antd/dist/antd.css'

import { Row, Col, Layout, List } from 'antd';
import { Menu } from 'antd';
const { Header, Content, Footer, Sider } = Layout;

class App extends Component {

  constructor(props) {
    super(props)

  }



  render() {
    return (
      <div>
         <Header style={{ position: 'fixed', width: '100%', zIndex: 10 }}>
          <div className="logo">
            <Link to='/'>
              <img src="/logo.png" style={{ height: '32px' }} />
            </Link>
          </div>
          <Menu
            theme="dark"
            mode="horizontal"
            style={{ lineHeight: '64px' }}
            >
            <Menu.Item key="1" className="pull-right">
              <Link to='/about'>
                关于本站
              </Link>
            </Menu.Item>
          </Menu>
        </Header>
        {this.props.children}
        <Footer>
        </Footer>
      </div>

    );
  }
}

export default App;
