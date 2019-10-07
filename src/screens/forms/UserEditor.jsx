import React, { Component } from 'react';
import { connect } from "react-redux";
import 'styled-components/macro'
import InputField from "../../components/base/InputField";
import Button from "../../components/base/Button";
import { updateUser } from "../../redux/actions";


class UserEditor extends Component {

  constructor(props) {
    super(props);
    this.state = {
      uid: null,
      username: null,
      birthDate: null,
      email: null,
      website: null,
      interests: null,
      createdDate: null,
      deactivatedDate: null,
      status: null,
      avatar: null
    };
  }

  componentDidMount() {
    const userUid = this.props.match.params.uid;
    const user = selectUser(this.props.users, userUid);
    this.setState({
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
    })
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
          <InputField
            description={'UID'}
            value={this.state.uid}
            disable
          />
          <InputField
            description={'Username'}
            onInput={username => this.setState({ username })}
            value={this.state.username}
          />
          <InputField
            description={'Email'}
            onInput={email => this.setState({ email })}
            value={this.state.email}
          />
          <InputField
            description={'Website'}
            onInput={website => this.setState({ website })}
            value={this.state.website}
          />
          <InputField
            description={'Birth date'}
            onInput={birthDate => this.setState({ birthDate })}
            value={this.state.birthDate}
          />
          <InputField
            description={'Joined'}
            onInput={createdDate => this.setState({ createdDate })}
            value={this.state.createdDate}
          />
          <InputField
            description={'Status'}
            onInput={status => this.setState({ status })}
            value={this.state.status}
          />
          <Button
            style={``}
            title={'UPDATE'}
            onClick={async () => {
              await updateUser(this.props.dispatch)(this.state);
            }}
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
}))(UserEditor);