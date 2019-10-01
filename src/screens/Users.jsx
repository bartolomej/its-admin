import React, { Component } from 'react';
import { connect } from "react-redux";
import { fetchUsers } from "../redux/actions";
import 'styled-components/macro'
import UserCard from "../components/UserCard";
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
        flex: 4.5;
        display: flex;
        flex-direction: column;
        height: 80vh;
        overflow-y: scroll;
      `}>
        <h1 css={`padding: 40px 100px`}>Users</h1>
        <div css={`padding: 0 100px;`}>
          {this.props.users.map(user => (
            <Link
              key={user.uid}
              css={`
                color: inherit;
                text-decoration: none
              `}
              to={{
                pathname: `/user/${user.uid}`,
                state: { fromDashboard: true }
              }}
            >
              <UserCard
                uid={user.uid}
                username={user.username}
                email={user.email}
                avatar={user.image}
                createdDate={user.createdDate}
              />
            </Link>
          ))}
        </div>
      </div>
    )
  }

}

export default connect(state => ({
  isLoading: state.user.isLoading,
  error: state.user.error,
  users: state.user.users,
}))(Users);