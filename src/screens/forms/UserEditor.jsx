import React, { Component } from 'react';
import { connect } from "react-redux";
import 'styled-components/macro';
import { withAlert } from 'react-alert';
import InputField from "../../components/base/TextInput";
import Button from "../../components/base/Button";
import { addUser, deleteUser, updateUser } from "../../redux/actions";
import { getUser } from "../../redux/selectors";
import { subscribe } from "redux-subscriber";
import { onAction } from 'redux-action-watch/lib/actionCreators';
import {UPDATE_USER_SUCCESS} from "../../redux/action-types";


class UserEditor extends Component {

  constructor(props) {
    super(props);
    this.state = {
      mode: '',
      user: {
        uid: '',
        username: '',
        birthDate: '',
        email: '',
        website: '',
        interests: '',
        createdDate: '',
        deactivatedDate: '',
        status: '',
        avatar: ''
      }
    };
  }

  componentDidMount() {
    const userUid = this.props.match.params.uid;
    const user = getUser(this.props.users, userUid);
    if (userUid !== undefined) {
      this.setUserState({
        uid: user.uid,
        username: user.username,
        birthDate: user.birthDate,
        email: user.email,
        website: user.website,
        interests: user.interests,
        createdDate: user.createdDate,
        deactivatedDate: user.deactivatedDate,
        status: user.status,
        avatar: user.avatar
      });
      this.setState({ mode: 'UPDATE' });
    } else {
      this.setState({ mode: 'ADD' });
    }
    this.registerListeners();
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  registerListeners = () => {
    this.unsubscribe = subscribe('user.error', state => {
      this.props.alert.error(state.user.error.message);
    });
    this.props.onAction(UPDATE_USER_SUCCESS, action => {
      this.props.alert.info('Successfully updated user');
    });
  };

  render() {
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
          {this.state.mode === 'UPDATE' && (
            <InputField
              description={'UID'}
              value={this.state.user.uid}
              disable
            />
          )}
          <InputField
            description={'Username'}
            onInput={username => this.setUserState({ username })}
            value={this.state.user.username}
          />
          <InputField
            description={'Email'}
            onInput={email => this.setUserState({ email })}
            value={this.state.user.email}
          />
          <InputField
            description={'Website'}
            onInput={website => this.setUserState({ website })}
            value={this.state.user.website}
          />
          <InputField
            description={'Interests'}
            onInput={interests => this.setUserState({ interests: interests.split(', ') })}
            value={this.state.user.interests instanceof Array ?
              this.state.user.interests.join(', ') : ''
            }
          />
          <InputField
            description={'Birth date'}
            onInput={birthDate => this.setUserState({ birthDate })}
            value={this.state.user.birthDate}
          />
          <InputField
            description={'Joined'}
            onInput={createdDate => this.setUserState({ createdDate })}
            value={this.state.user.createdDate}
          />
          <InputField
            description={'Status'}
            onInput={status => this.setUserState({ status })}
            value={this.state.user.status}
          />
          {this.state.mode === 'UPDATE' && (
            <Button
              isLoading={this.props.loading}
              title={'REMOVE'}
              onClick={async () => {
                await deleteUser(this.props.dispatch)(this.state.user.uid);
              }}
            />
          )}
          <Button
            isLoading={this.props.loading}
            title={this.state.mode === 'ADD' ? 'ADD' : 'UPDATE'}
            onClick={async () => {
              if (this.state.mode === 'ADD') {
                await addUser(this.props.dispatch)(this.state.user);
              } else {
                await updateUser(this.props.dispatch)(this.state.user);
              }
            }}
          />
        </div>
      </div>
    )
  }

  setUserState = props => {
    let user = this.state.user;
    for (let key in props) {
      if (props.hasOwnProperty(key)) {
        user[key] = props[key];
      }
    }
    this.setState({ user })
  }

}

export default connect(state => ({
  loading: state.user.loading,
  error: state.user.error,
  users: state.user.users,
}), dispatch => ({
  onAction: onAction(dispatch),
  dispatch
}))(withAlert()(UserEditor));