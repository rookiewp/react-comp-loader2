import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Default extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = () => {
    console.log(this.props)
  }

  render() {
    return (
      <div>
        我是default页
      </div>
    )
  }
}

