import React, { Component } from 'react';
import { browserHistory, Link } from 'react-router';
import Config from './config'
import Game from './Game'
import Spin from './Spin'
import './LiveVideo.css'

import FontAwesome from 'react-fontawesome';

class Stream extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let stream = this.props.stream

    return (
      <div className="row">
        <a href={stream.url} target="_blank">
          <p> 直播 </p>
        </a>
      </div>
    )
  }
}

class LiveVideo extends Component {

  constructor(props) {
    super(props)
    this.config = Config()


    this.state = {
      title: "",
      streams: []
    }


  }

  priority(s) {
    var priorityMap = [
      {'goodnba.stream': 0},
      {'rawstreams.xyz': 1},
      {'www.genti.stream': 2}
    ]

    let keys = priorityMap.keys()
    for(var i = 0; i < keys.length; i++) {
      if (s.startsWith('http://' + keys[i])) {
        return priorityMap[keys[i]]
      }
    }
    return 10
  }


  componentDidMount() {
    let url = decodeURIComponent(this.props.params.url)
    let streamUrl = url.substring(0, url.length-1) + ".json"
    fetch(streamUrl).then(res => res.json()).then((data) => {
      let title = data[0].data.children[0].data.title
      let comments = data[1]
      let topic = comments.data.children[0]
      let body = topic.data.body

      let matchAll = body.match(/\([^()]+\)/g)
      var streams = []
      for(var i = 0; i < matchAll.length; i++) {
        let s = matchAll[i].substring(1, matchAll[i].length-1)
        if (s.startsWith('http')) {
          var stream = {}
          stream['priority'] = this.priority(s)
          stream['url'] = s
          streams.push(stream)
        }
      }

      this.setState({
        title: title,
        streams: streams
      })
    })
  }

  render() {
    var content = <Spin />
    if (this.state.streams.length >= 0) {

      let stream_list = []
      for(var i = 0; i < this.state.streams.length; i++) {
        let stream = this.state.streams[i]
        stream_list.push(<Stream key={i} stream={stream} />)
        console.log(stream)
      }
      content = stream_list
    }
  
    return (
      <div className="App">
        <div className="App-header"> 
          <h1 className="App-title"> 
           NBA 直播
          </h1>
        </div>

        <div> 
          <p> {this.state.title} </p>
          <div className="col-sm-offset-3 col-sm-6 col-xs-offset-1 col-xs-10">
              { content }
          </div>
        </div>

      </div>

    );
  }
}

export default LiveVideo;
