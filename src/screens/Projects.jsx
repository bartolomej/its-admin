import React, { Component } from 'react';
import { connect } from "react-redux";
import 'styled-components/macro'


class Projects extends Component {

  constructor (props) {
    super(props);
    this.state = {};
  }

  render () {
    return (
      <div css={`
        margin: 40px 80px;
      `}>
        <h1>Projects</h1>
        <div>TODO</div>
      </div>
    )
  }

}


export default connect(state => ({
  isLoading: state.user.isLoading,
  error: state.user.error,
  users: state.user.users,
}))(Projects);