import React, { Component } from 'react';
import { connect } from "react-redux";
import { fetchUsers, addUser } from "../redux/actions";
import 'styled-components/macro'
import UserCard from "../components/UserCard";
import TableView from "../components/base/TableView";


class Users extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    if (this.props.users.length === 0) {
      await fetchUsers(this.props.dispatch)();
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
          onAdd={async () => await addUser(this.props.dispatch)(this.state)}
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
                type={user.type}
                interests={user.interests}
                avatar={user.image}
                createdDate={user.createdDate}
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
}))(Users);