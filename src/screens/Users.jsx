import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom'
import { fetchUsers } from "../redux/actions";
import 'styled-components/macro'
import UserCard from "../components/UserCard";
import TableView from "../components/base/TableView";


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

  render () {
    return (
      <div css={`
        flex: 6;
        display: flex;
        flex-direction: column;
        margin: 60px 220px;
      `}>
        <TableView
          isLoading={this.props.loading}
          title={'Users'}
          onAdd={() => this.props.history.push('/add_user')}
          columns={[
            { title: '', flex: 0.5 },
            { title: 'username', flex: 0.5 },
            { title: 'email', flex: 1 },
            { title: 'website', flex: 1 },
            { title: 'interests', flex: 1 },
            { title: 'created', flex: 0.5 },
            { title: '', flex: 0.5 }
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
    );
  }

}


export default connect(state => ({
  loading: state.user.loading,
  error: state.user.error,
  users: state.user.users,
}))(withRouter(Users));