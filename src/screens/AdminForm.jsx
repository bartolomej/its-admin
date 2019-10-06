import React, { Component } from 'react';
import { connect } from "react-redux";
import 'styled-components/macro'
import InputField from "../components/base/InputField";
import Button from "../components/base/Button";
import { updateAdmin } from "../redux/actions";


class UserForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      uid: null,
      firstName: null,
      lastName: null,
      email: null,
      role: null,
      phoneNumber: null,
      createdDate: null,
    };
  }

  componentDidMount() {
    const adminUid = this.props.match.params.uid;
    const admin = selectAdmin(this.props.admins, adminUid);
    this.setState({
      uid: admin.uid,
      firstName: admin.firstName,
      lastName: admin.lastName,
      email: admin.email,
      role: admin.role,
      createdDate: admin.createdDate,
      phoneNumber: admin.phoneNumber
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
            description={'First Name'}
            onInput={firstName => this.setState({ firstName })}
            value={this.state.firstName}
          />
          <InputField
            description={'Last Name'}
            onInput={lastName => this.setState({ lastName })}
            value={this.state.lastName}
          />
          <InputField
            description={'Email'}
            onInput={email => this.setState({ email })}
            value={this.state.email}
          />
          <InputField
            description={'Role'}
            onInput={role => this.setState({ role })}
            value={this.state.role}
          />
          <InputField
            description={'Joined'}
            onInput={createdDate => this.setState({ createdDate })}
            value={this.state.createdDate}
          />
          <Button
            style={``}
            title={'UPDATE'}
            onClick={this.updateAdmin}
          />
        </div>
      </div>
    )
  }

  updateAdmin = async () => {
    await updateAdmin(this.props.dispatch)(this.state);
  }

}

function selectAdmin (admins, uid) {
  let admin = admins.filter(u => u.uid === uid);
  return admin[0];
}

export default connect(state => ({
  isLoading: state.admin.isLoading,
  error: state.admin.error,
  admins: state.admin.admins,
}))(UserForm);