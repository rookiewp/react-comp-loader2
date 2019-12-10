import React, { Component } from 'react'

class Page extends Component {
  constructor(props) {
    super(props);
    this.state = {
      View: null,
    }
    const { loader } = this.props;
    loader().then((view) => {
      this.setState({
        View: view.default,
      })
    })
  }

  render() {
    const { View } = this.state;
    if (View) return React.createElement(View, this.porps)
    return  React.createElement('div', null, 'Loading')
  }
}

export default (config) => {
  return props => React.createElement(Page, {...props, ...config})
}
