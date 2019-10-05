import React, { Component } from 'react';
import { connect } from "react-redux";
import 'styled-components/macro'
import {far, faUser} from '@fortawesome/free-regular-svg-icons';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import InputField from "../components/base/InputField";


class UserForm extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const userUid = this.props.match.params.uid;
    const user = selectUser(this.props.users, userUid);
    console.log(user);
    return (
      <div
        css={`
          display: flex;
          flex-direction: column;
          flex: 2;
          margin: 80px 150px;
        `}>
        <div
          css={`
            display: flex;
            flex: 0.5;
            flex-direction: column;
          `}>
          <InputField
            description={'UID'}
            onInput={console.log}
            value={user.uid}
            disable
          />
          <InputField
            description={'Username'}
            onInput={console.log}
            value={user.username}
          />
          <InputField
            description={'Email'}
            onInput={console.log}
            value={user.email}
          />
          <InputField
            description={'Website'}
            onInput={console.log}
            value={user.website}
          />
          <InputField
            description={'Birth date'}
            onInput={console.log}
            value={user.username}
          />
          <InputField
            description={'Joined'}
            onInput={console.log}
            value={user.username}
          />
          <InputField
            description={'Status'}
            onInput={console.log}
            value={user.status}
          />
        </div>
      </div>
    )
  }

}

function selectUser (users, uid) {
  let user = users.filter(u => u.uid === uid);
  return user[0];
}

export default connect(state => ({
  isLoading: state.user.isLoading,
  error: state.user.error,
  users: state.user.users,
}))(UserForm);