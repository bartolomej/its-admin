import React, { Component } from 'react';
import { connect } from "react-redux";
import { fetchUsers } from "../redux/actions";
import 'styled-components/macro'
import UserCard from "../components/UserCard";
import TableView from "../components/base/TableView";
import { Link, Route } from "react-router-dom";


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
        margin: 80px 150px;
      `}>
        <TableView
          title={'Users'}
          onAdd={() => console.log('add user')}
          columns={[
            {title: '', flex: 0.5},
            {title: 'username', flex: 1},
            {title: 'email', flex: 1},
            {title: 'created', flex: 0.6},
            {title: '', flex: 0.5}
          ]}
          rows={
            this.props.users.map(user => (
              <UserCard
                key={user.uid}
                uid={user.uid}
                username={user.username}
                email={user.email}
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