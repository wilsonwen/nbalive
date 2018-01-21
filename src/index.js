import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import './index.css';
import App from './App';
import GameList from './GameList';
import LiveVideo from './LiveVideo';
import About from './About';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={GameList} />
      <Route path="/live/:url" component={LiveVideo} />
      <Route path="/about" component={About} />
    </Route>
  </Router>)
  , document.getElementById('root'));
registerServiceWorker();
