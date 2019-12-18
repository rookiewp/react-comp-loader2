import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { HashRouter as Router, Route, Switch, Link } from 'react-router-dom'
import Default from './components/default/default.jsx';

export default class App extends Component {

  render() {
    return (
      <div style={{ margin: 10 }}>
        <Router>
          <div>
            <div>
              <div>
                导航:
                <span>
                  <Link to="/">defaule</Link>
                </span>
                <span style={{ margin: '0 20px' }}>
                  <Link to="/a/123">a</Link>
                </span>
                <span>
                  <Link to="/b">b</Link>
                </span>
              </div>
            </div>
            <Switch>
              <Route
                exact
                path='/'
                component={Default}
              />
              __react_router__
            </Switch>
          </div>
        </Router>
      </div>
    )
  }
}

App.propTypes = {
  title: PropTypes.string
};

