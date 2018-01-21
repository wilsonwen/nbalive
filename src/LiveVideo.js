import React, { Component } from 'react';
import { browserHistory, Link } from 'react-router';
import Config from './config'
import Game from './Game'
import Spin from './Spin'
import './LiveVideo.css'

import { Layout, Menu, Icon } from 'antd';
const { Header, Content, Footer, Sider } = Layout;


class LiveVideo extends Component {

  constructor(props) {
    super(props)
    this.config = Config()


    this.state = {
      title: "",
      streams: [],
      url: ""
    }

    this.onChange = this.onChange.bind(this)


  }

  onChange(item, key, selectedKeys) {

    let stream = this.state.streams[parseInt(item.key)]
    this.setState({
      url: stream.url
    })
  }

  priority(s) {
    var priorityMap = {
      'goodnba.stream': 0,
      'rawstreams.xyz': 1,
      'buffstream': 2,
      'acesports.stream': 3,
      'watchkobestreams.ml': 5,
      '247nba.net': 6,
      'www.nbastreams.me': 1000,
      'mycloudsports.ml': 1000
    }
    let keys = Object.keys(priorityMap)
    for(var i = 0; i < keys.length; i++) {
      if (s.startsWith('http://' + keys[i])) {
        return priorityMap[keys[i]]
      }
    }
    return 10
  }


  componentDidMount() {
    let url = 'https://www.reddit.com/r/nbastreams/comments/' + decodeURIComponent(this.props.params.url)
    let streamUrl = url.substring(0, url.length-1) + ".json"
    fetch(streamUrl).then(res => res.json()).then((data) => {
      console.log(data)
      let title = data[0].data.children[0].data.title
      let comments = data[1]

      // find all streams
      var streams = []
      for (var i = 0; i < comments.data.children.length; i++) {
        let topic = comments.data.children[i]
        let body = topic.data.body
        let matchAll = body.match(/\([^()]+\)/g)

        if (matchAll == null)
          continue;
        
        for(var j = 0; j < matchAll.length; j++) {
          let s = matchAll[j].substring(1, matchAll[j].length-1)
          if (s.endsWith('m3u8')) {
            continue;
          }
          if (s.startsWith('http')) {
            var stream = {}
            stream['priority'] = this.priority(s)
            stream['url'] = s
            streams.push(stream)
          }
        }
      }
      streams.sort(function(a,b){return a['priority'] - b['priority']})

      console.log('streams', streams)

      this.setState({
        title: title,
        streams: streams,
        url: streams[0].url
      })
    })
  }

  render() {
    var content = <Spin />
    if (this.state.streams.length >= 0) {

      let stream_list = []
      let maxlen = this.state.streams.length;
      if (maxlen > 10) 
        maxlen = 10
      for(var i = 0; i < maxlen; i++) {
        let stream = this.state.streams[i]
        stream_list.push(
          <Menu.Item key={i} url={stream.url}>
              <Icon type="video-camera" />
              <span className="nav-text">线路{i}</span>
          </Menu.Item>
        )
      }
      content = stream_list
    }
  
    return (
      <Layout>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          onCollapse={(collapsed, type) => { console.log(collapsed, type); }}
          >
          <div className="empty" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['0']} onSelect={this.onChange}>
            {content}
          </Menu>
          <div>
            <img src="http://wx4.sinaimg.cn/mw690/6da6f8f9ly1ficpts9a74j20iy0j4gnw.jpg" width="150px"/>
          </div>
        </Sider>

         <Layout>
          <Content style={{ margin: '80px 16px 0' }}>
            <div className="iframe-container ">
              <iframe src={this.state.url} allowfullscreen/>
            </div>
          </Content>
        </Layout>
      </Layout>

    );
  }
}

export default LiveVideo;
