import React, { Component } from 'react';
import { connect } from "react-redux";
import 'styled-components/macro'


class Dashboard extends Component {

  constructor (props) {
    super(props);
    this.state = {};
  }

  render () {
    return (
      <div css={`
        margin: 40px 80px;
      `}>
        <h1>Dashboard</h1>
        <div>TODO</div>
      </div>
    )
  }

}


export default connect(state => ({
  isLoading: state.user.isLoading,
  error: state.user.error,
  users: state.user.users,
}))(Dashboard);