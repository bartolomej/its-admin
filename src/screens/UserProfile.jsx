import React, { Component } from 'react';
import { connect } from "react-redux";
import 'styled-components/macro'


class UserProfile extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const userUid = this.props.match.params.uid;
    const user = selectUser(this.props.users, userUid);
    return (
      <div>
        {JSON.stringify()}
      </div>
    )
  }

}

function selectUser (users, uid) {
  return users.filter(u => u.uid === uid);
}

export default connect(state => ({
  isLoading: state.user.isLoading,
  error: state.user.error,
  users: state.user.users,
}))(UserProfile);