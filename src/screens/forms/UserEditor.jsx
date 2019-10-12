import React, { Component } from 'react';
import { connect } from "react-redux";
import 'styled-components/macro'
import InputField from "../../components/base/TexInput";
import Button from "../../components/base/Button";
import { addUser, updateUser } from "../../redux/actions";


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
    const user = selectUser(this.props.users, userUid);
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
  }

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
          <Button
            style={``}
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

function selectUser (users, uid) {
  let user = users.filter(u => u.uid === uid);
  return user[0];
}

export default connect(state => ({
  isLoading: state.user.isLoading,
  error: state.user.error,
  users: state.user.users,
}))(UserEditor);