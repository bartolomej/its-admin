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
    };
  }

  componentDidMount () {
    const userUid = this.props.match.params.uid;
    this.setState({ mode: userUid !== undefined ? 'update' : 'create' });
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
    const userUid = this.props.match.params.uid;
    const user = getUser(this.props.users, userUid);

    if (this.props.loading) {
      return <h3>Loading...</h3>
    }
    return (
      <div>
        <Form
          type={this.state.mode}
          onSubmit={(uid, data) => this.props.updateUser(uid, data)}
          onDelete={uid => this.props.deleteUser(uid)}
          entityUid={user.uid}
          formElements={[
            {
              type: 'text',
              data: user.uid,
              key: 'uid',
              title: 'UID',
              description: 'Universally Unique Identification',
              disabled: true
            },
            {
              type: 'text',
              data: user.username,
              key: 'username',
              title: 'Username',
            },
            {
              type: 'text',
              data: user.email,
              key: 'email',
              title: 'Email',
            },
            {
              type: 'text',
              data: user.website,
              key: 'website',
              title: 'Website',
            },
            {
              type: 'date',
              data: user.birthDate,
              key: 'birthDate',
              title: 'Birth Date',
            },
            {
              type: 'date',
              data: user.createdDate,
              key: 'createdDate',
              title: 'Joined Date',
              disabled: true
            },
            {
              type: 'text',
              data: user.interests.join(', '),
              key: 'interests',
              title: 'Interests',
              disabled: true
            },
            {
              type: 'text',
              data: user.status,
              key: 'status',
              title: 'Status',
              disabled: true
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
  deleteUser: deleteUser(dispatch),
  updateUser: updateUser(dispatch)
}))(withAlert()(UserEditor));