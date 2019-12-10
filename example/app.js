import React, { Component } from 'react'
import ReactDom from 'react-dom';
import PropTypes from 'prop-types'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'

import Default from './src/components/default/default.jsx';

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div>router</div>
        <div>
          <Router>
            <Switch>
              <Route exact path="/" component={Default} />
              __react-router__
            </Switch>
          </Router>
        </div>
      </div>
    )
  }
}

ReactDom.render(<App />, document.getElementById('root'))

