import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom'
import { fetchUsers } from "../redux/actions";
import 'styled-components/macro'
import Table from '../components/Table';

class Users extends Component {

  constructor (props) {
    super(props);
    this.state = {};
  }

  componentDidMount = async () => {
    if (this.props.users.length === 0) {
      await fetchUsers(this.props.dispatch)();
    }
  };

  getUsers = () => (
    this.props.users.map(u => ({
      ...u,
      createdDate: new Date(u.createdDate).toDateString(),
    }))
  );

  navigateToEdit = user => {
    this.props.history.push(`/app/user/${user.uid}`);
  };

  render () {
    return (
      <div>
        <Table
          title="Users"
          onAdd={() => this.props.history.push('/app/add_user')}
          isLoading={this.props.loading}
          height={600}
          data={this.getUsers()}
          columns={[
            { type: 'image', title: 'Avatar', key: 'avatar', width: 100 },
            { type: 'text', title: 'Username', key: 'username', width: 200 },
            { type: 'text', title: 'Type', key: 'type', width: 80 },
            { type: 'email', title: 'Email', key: 'email', width: 250 },
            { type: 'text', title: 'Created', key: 'createdDate', width: 150 },
            { type: 'action', title: 'Actions', key: 'action', width: 100, onEdit: this.navigateToEdit }
          ]}
        />
      </div>
    )
  }

}

export default connect(state => ({
  loading: state.user.loading,
  error: state.user.error,
  users: state.user.users,
}))(withRouter(Users));