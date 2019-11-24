import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { Form, FormGroup, FormControl, ControlLabel, HelpBlock, Button, ButtonToolbar } from 'rsuite';
import { connect } from "react-redux";
import 'styled-components/macro';
import { showSimpleNotification } from "../utils/notification";
import { login } from "../redux/actions";
import { subscribe } from "redux-subscriber";


function Login ({loading, user, authToken, login, history}) {
  const [loginCred, setLoginCred] = useState(null);

  useEffect(() => {
    subscribe('profile.error', state => {
      showSimpleNotification('error', state.profile.error.message);
    });
    subscribe('profile.loggedIn', state => {
      if (state.profile.loggedIn) history.push('/app');
    });
  }, []);

  function handleLogin () {
    if (!loginCred.password || !loginCred.email) {
      return showSimpleNotification('error', "Please fill login credentials")
    }
    if (loginCred.password.length < 6) {
      return showSimpleNotification('error', "Password too short");
    }
    login(loginCred.email, loginCred.password)
  }

  return (
    <div
      css={`
        display: flex;
        align-items: center;
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
    login: login(dispatch)
  })
)(withRouter(Login));