import React, { Component } from 'react';
import { browserHistory, Link } from 'react-router';
import Config from './config'
import Game from './Game'
import Spin from './Spin'
import './LiveVideo.css'

import { Layout, Menu, Icon } from 'antd';
const { Header, Content, Footer, Sider } = Layout;


class About extends Component {

  

  render() {
    
    return (
      <Layout>
        <Content style={{ padding: '0px', marginTop: '64px' }}>
          <div className="" style={{ background: '#fff', padding: 10, minHeight: 380, textAlign: 'center' }}>
        
              <h2>关于YVPLAY</h2>
              <p>
              	This is why we play! 如果你有任何建议，欢迎给我写邮件 kanmeijuapp@gmail.com
              </p>
              <p>
              	喜欢这个网站么？请我喝瓶佳德乐吧！
              	
              </p>
              <img src="http://wx4.sinaimg.cn/mw690/6da6f8f9ly1ficpts9a74j20iy0j4gnw.jpg" width="150px"/>

          </div>
        </Content>
      </Layout>

    );
  }
}

export default About;
