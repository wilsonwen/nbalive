import React, { Component } from 'react';
import { browserHistory, Link } from 'react-router';
import FontAwesome from 'react-fontawesome';

import Config from "./config"
import "./Game.css"

class Game extends Component {

	constructor(props) {
		super(props);
		this.config = Config()
	}

	render() {
	  let url = '/live/' + encodeURIComponent(this.props.game.url);
	  console.log(url)
	  let time = ((parseInt(this.props.game.time) + 1300) % 2400).toString()
	  let hour = time.length == 4 ? time.substring(0, 2) : '0' + time.substring(0, 1)
	  let minute = time.length == 4 ? time.substring(2, 4) : time.substring(1, 3)
	  let home = this.props.game.home
	  let visitor = this.props.game.visitor


	  return (
	  	<div className="row game-row">
	  		<Link to={url} >
		  		<div className="col-xs-2 col-sm-2">
		  			{hour}:{minute}
		  		</div>
		  		<div className="col-xs-4 col-sm-4">
		  			{home.city} {home.nickname}
		  		</div>
		  		<div className="col-xs-2 col-sm-2">
		  			{home.score} - {visitor.score}
		  		</div>
		  		<div className="col-xs-4 col-sm-4">
		  			{visitor.city} {visitor.nickname}
		  		</div>
					
			</Link>
		</div>

	  )
	}
}

export default Game;