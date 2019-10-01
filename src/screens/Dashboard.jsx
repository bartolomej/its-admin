import React, { Component } from 'react';
import { connect } from "react-redux";
import 'styled-components/macro'


class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div css={`
        flex: 4.5;
        display: flex;
        flex-direction: column;
        height: 80vh;
        overflow-y: scroll;
      `}>
        <h1 css={`padding: 40px 100px`}>Dashboard</h1>
        <div css={`padding: 0 100px;`}>
          Screen
        </div>
      </div>
    )
  }

}

export default connect(state => ({
  isLoading: state.user.isLoading,
  error: state.user.error,
  users: state.user.users,
}))(Dashboard);