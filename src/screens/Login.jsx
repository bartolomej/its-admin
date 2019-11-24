import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { Form, FormGroup, FormControl, ControlLabel, HelpBlock, Button, ButtonToolbar } from 'rsuite';
import { connect } from "react-redux";
import 'styled-components/macro';
import { showSimpleNotification } from "../utils/notification";
import { subscribe } from "redux-subscriber";
import { fetchUser, login } from "../redux/actions";


function Login ({ loading, user, authToken, login, history, fetchUser }) {
  const [loginCred, setLoginCred] = useState(null);

  useEffect(() => {
    subscribe('profile.error', state => {
      showSimpleNotification('error', state.profile.error.message);
    });
    subscribe('profile.loggedIn', async state => {
      if (state.profile.loggedIn) history.push('/app');
    });
  }, []);

  async function handleLogin () {
    if (!loginCred) {
      return showSimpleNotification('error', "Please input login credentials")
    }
    if (loginCred.password.length < 6) {
      return showSimpleNotification('error', "Password too short");
    }
    await login(loginCred.email, loginCred.password)
  }

  return (
    <div
      css={`
        margin-top: 10%;
        display: flex;
        justify-content: center;
      `}
    >
      <Form onChange={c => setLoginCred(c)}>
        <FormGroup>
          <ControlLabel>Email</ControlLabel>
          <FormControl name="email" type="email"/>
          <HelpBlock tooltip>Required</HelpBlock>
        </FormGroup>
        <FormGroup>
          <ControlLabel>Password</ControlLabel>
          <FormControl name="password" type="password"/>
        </FormGroup>
        <FormGroup>
          <Button
            onClick={handleLogin}
            appearance="primary"
          >
            Login
          </Button>
        </FormGroup>
      </Form>
    </div>
  )
}

export default connect(
  state => ({
    loading: state.profile.loading,
    error: state.profile.error,
    user: state.profile.user,
    authToken: state.profile.authToken
  }),
  dispatch => ({
    login: login(dispatch),
    fetchUser: fetchUser(dispatch)
  })
)(withRouter(Login));