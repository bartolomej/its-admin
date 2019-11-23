import React, { Component } from 'react';
import { connect } from "react-redux";
import 'styled-components/macro';
import { withAlert } from 'react-alert';
import { addUser, deleteUser, updateUser } from "../../redux/actions";
import { getUser } from "../../redux/selectors";
import { subscribe } from "redux-subscriber";
import { onAction } from 'redux-action-watch/lib/actionCreators';
import { UPDATE_USER_SUCCESS } from "../../redux/action-types";
import Form from "../../components/Form";


class UserEditor extends Component {

  constructor (props) {
    super(props);
    this.state = {
      mode: '',
      user: null
    };
  }

  componentDidMount () {
    const userUid = this.props.match.params.uid;
    const user = getUser(this.props.users, userUid);
    if (userUid !== undefined) {
      this.setState({user});
      this.setState({ mode: 'update' });
    } else {
      this.setState({ mode: 'create' });
    }
    this.registerListeners();
  }

  componentWillUnmount () {
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

  render () {
    if (this.props.loading || !this.state.user) {
      return <h3>Loading...</h3>
    }
    return (
      <div>
        <Form
          type={this.state.mode}
          onSubmit={console.log}
          formElements={[
            {
              type: 'text',
              data: this.state.user.uid,
              key: 'uid',
              title: 'UID',
              description: 'Universally Unique Identification',
              disabled: true
            },
            {
              type: 'text',
              data: this.state.user.username,
              key: 'username',
              title: 'Username',
            },
            {
              type: 'text',
              data: this.state.user.email,
              key: 'email',
              title: 'Email',
            },
            {
              type: 'text',
              data: this.state.user.website,
              key: 'website',
              title: 'Website',
            },
            {
              type: 'date',
              data: this.state.user.birthDate,
              key: 'birthDate',
              title: 'Birth Date',
            },
            {
              type: 'date',
              data: this.state.user.createdDate,
              key: 'createdDate',
              title: 'Joined Date',
            },
            {
              type: 'tag',
              data: this.state.user.interests && this.state.user.interests.map(e => ({value: e, label: e})),
              key: 'interests',
              title: 'Interests',
            },
            {
              type: 'text',
              data: this.state.user.status,
              key: 'status',
              title: 'Status',
            },
          ]}
        />
      </div>
    );
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