import React, { Component } from 'react';
import { browserHistory, Link } from 'react-router';
import { Row, Col, List } from 'antd';

import Config from "./config"
import getTeamLogo from "./TeamLogo"
import "./Game.css"


class Game extends Component {

	constructor(props) {
		super(props);
		this.config = Config()
	}

	render() {
	  let start = 'https://www.reddit.com/r/nbastreams/comments/'.length
	  let url = this.props.game.url
	  var link
	  if (url == undefined) {
	  	link = "#"
	  } else {
		let params = url.substring(start)
		link = '/live/' + encodeURIComponent(params);
	  }
	  
	  let time = ((parseInt(this.props.game.time) + 1300) % 2400).toString()
	  let hour = time.length == 4 ? time.substring(0, 2) : '0' + time.substring(0, 1)
	  let minute = time.length == 4 ? time.substring(2, 4) : time.substring(1, 3)
	  let home = this.props.game.home
	  let visitor = this.props.game.visitor
	  let homeLogo = getTeamLogo(home.nickname)
	  let visitorLogo = getTeamLogo(visitor.nickname)


	  return (
	  	<List.Item>
	  		<Link className="gameitem" to={link}>
	  			<Row style={{ width: '100%', textAlign: 'center'}}>
	  				<Col xs={{span:6}} sm={{span: 4, offset: 4}}>
	  					<div>
	  						<img className="teamlogo" src={homeLogo} type="image/svg+xml"/>
	  					</div>
	  					<div>
			  				{home.city} {home.nickname}
			  			</div>
			  		</Col>
			  		<Col xs={{span:4}} sm={{span: 3}}>
			  			{home.score} 
			  		</Col>
			  		<Col xs={{span:4}} sm={{span: 2}}>
			  			<div className="time"> 
			  				{hour}:{minute} 
			  			</div>
			  		</Col>
			  		<Col xs={{span:4}} sm={{span: 3}}>
			  			{visitor.score}
			  		</Col>
			  		<Col xs={{span:6}} sm={{span: 4}}>
			  			<div>
			  				<img className="teamlogo" src={visitorLogo} type="image/svg+xml"/>
			  			</div>
			  			<div>
			  				{visitor.city} {visitor.nickname}
			  			</div>
			  		</Col>
				</Row>
			</Link>
		</List.Item>

	  )
	}
}

export default Game;