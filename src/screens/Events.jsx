import React, { Component } from 'react';
import { connect } from "react-redux";
import 'styled-components/macro'


class Events extends Component {

  constructor (props) {
    super(props);
    this.state = {};
  }

  render () {
    return (
      <div>

      </div>
    )
  }

}


export default connect(state => ({
  isLoading: state.user.isLoading,
  error: state.user.error,
  users: state.user.users,
}))(Events);