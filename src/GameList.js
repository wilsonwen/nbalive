import React, { Component } from 'react';
import Config from './config'
import Game from './Game'
import Spin from './Spin'
import { Row, Col, Layout, List } from 'antd';
import { Menu } from 'antd';
const { Header, Content, Footer, Sider } = Layout;

const fs = require('fs');

class GameList extends Component {

  constructor(props) {
    super(props)
    this.config = Config()

    this.state = {
      games: [],
      lives: []
    }
  }

  parseLive(json) {
    let lives = []
    for(var i = 0; i < json.data.children.length; i++) {
      let topic = json.data.children[i]
      if (topic.data.title.startsWith('Game Thread')) {
        var match = {}
        match.title = topic.data.title
        match.url = topic.data.url
        lives.push(match)
      }
    }
    return lives
  }

  componentDidMount() {

    // Get scores of games
    let url = this.config.server + "/scores"
    fetch(url).then(res => res.json()).then((data) => {
      console.log(data)
      let games = data.sports_content.games.game
      this.setState({
        games: games
      })
    })

    // Get lives streams of games
    var livesUrl
    if (process.env.NODE_ENV == 'development') {
      livesUrl = this.config.server + "/nbastreams"
    } else {
      livesUrl = "https://www.reddit.com/r/nbastreams.json"
    }
    fetch(livesUrl).then(res => res.json()).then((data) => {
      console.log(data)
      let lives = this.parseLive(data)
      this.setState({
        lives: lives
      })
    })
  }


  render() {

    var content
    if (this.state.games.length == 0) {   
      content = <Spin />  
    } else {
      let game_list = []
      let games = this.state.games

      // add live url to games
      for(var i = 0; i < games.length; i++) {
        for(var j = 0; j < this.state.lives.length; j++) {
          let live = this.state.lives[j]
          let keyword = games[i].home.nickname
          if (live.title.indexOf(keyword) >= 0) {
            games[i].url = live.url
          }
        }
      }

      // render games list
      for(var i = 0; i < games.length; i++) {
        let game = games[i]
        game_list.push(<Game key={i} game={game} />)
      }
      content = game_list
    }

    
    return (
      <Layout>
        <Content style={{ padding: '0px', marginTop: '64px' }}>
          <div className="" style={{ background: '#fff', padding: 10, minHeight: 380, textAlign: 'center' }}>
        
              <h3>今日比赛</h3>
            <List> 
              { content }
            </List>

            
          </div>
        </Content>
      </Layout>

    );
  }
}

export default GameList;
