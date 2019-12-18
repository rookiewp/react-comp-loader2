import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import store from './integrate';

class View extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = () => {
  }

  render() {
    const { id } = this.props.match.params;
    return (
      <div >
        <div>我是a页面</div>
        <div>路由参数id: {id}</div>
        <div>name: {this.props.name}</div>
        <div>
          <button
            onClick={() => { store.changeData({ name: 'wp2' }) }}
          >
            dispatch
          </button>
        </div>
        <button
          onClick={() => { store.emptyBox({ name: 'wp3' }) }}
        >
          async
        </button>
      </div>
    )
  }
}

const mapStateToProps = state => state['a'];
export default connect(mapStateToProps)(View)

