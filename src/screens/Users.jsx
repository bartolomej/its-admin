import React, { Component } from 'react';
import { connect } from "react-redux";
import { fetchAdmins, fetchUsers } from "../redux/actions";
import 'styled-components/macro'
import UserCard from "../components/UserCard";
import TableView from "../components/base/TableView";
import AdminCard from "../components/AdminCard";


class Users extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    if (this.props.users.length === 0) {
      await fetchUsers(this.props.dispatch)();
    }
    if (this.props.admins.length === 0) {
      await fetchAdmins(this.props.dispatch)();
    }
  }

  render() {
    return (
      <div css={`
        flex: 6;
        display: flex;
        flex-direction: column;
        margin: 50px 80px;
      `}>
        <TableView
          title={'User'}
          onAdd={() => console.log('add user')}
          columns={[
            {title: '', flex: 0.5},
            {title: 'username', flex: 0.5},
            {title: 'email', flex: 1},
            {title: 'website', flex: 1},
            {title: 'interests', flex: 1},
            {title: 'created', flex: 0.5},
            {title: '', flex: 0.5}
          ]}
          rows={
            this.props.users.map(user => (
              <UserCard
                key={user.uid}
                uid={user.uid}
                username={user.username}
                email={user.email}
                website={user.website}
                interests={user.interests}
                avatar={user.image}
                createdDate={user.createdDate}
              />
            ))
          }
        />
        <TableView
          title={'Admin'}
          onAdd={() => console.log('add admin')}
          columns={[
            {title: '', flex: 0.5},
            {title: 'firstName', flex: 0.5},
            {title: 'lastName', flex: 0.5},
            {title: 'email', flex: 1},
            {title: 'phone', flex: 0.5},
            {title: 'role', flex: 0.5},
            {title: 'created', flex: 1},
            {title: '', flex: 0.5}
          ]}
          rows={
            this.props.admins.map(admin => (
              <AdminCard
                key={admin.uid}
                uid={admin.uid}
                firstName={admin.firstName}
                lastName={admin.lastName}
                email={admin.email}
                role={admin.role}
                phoneNumber={admin.phoneNumber}
                createdDate={admin.createdDate}
              />
            ))
          }
        />
      </div>
    )
  }

}

export default connect(state => ({
  isLoading: state.user.isLoading,
  error: state.user.error,
  users: state.user.users,
  admins: state.admin.admins
}))(Users);