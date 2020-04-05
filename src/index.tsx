import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {
  BrowserRouter as Router,
  Link,
  Switch,
  Route,
} from 'react-router-dom';

import './index.scss';

const el = document.getElementById('app');
ReactDOM.render((
  <Router>
    <h1>Redditbooru</h1>
    <Link to="/upload">Do it</Link>
    <Switch>
      <Route path="/upload">
        Upload
      </Route>
    </Switch>
  </Router>
), el);
