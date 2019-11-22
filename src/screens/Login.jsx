import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { useFirebase } from 'react-redux-firebase'
import { Form, FormGroup, FormControl, ControlLabel, HelpBlock, Button, ButtonToolbar } from 'rsuite';
import { connect } from "react-redux";
import 'styled-components/macro';
import { showSimpleNotification } from "../utils/notification";


function Login () {
  const firebase = useFirebase();
  const [loginCred, setLoginCred] = useState(null);

  function emailLogin (cred) {
    return firebase.login(cred)
      .then(console.log)
      .catch(err => showSimpleNotification('error', err.message))
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
            onClick={() => emailLogin(loginCred)}
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
    profile: state.profile.profile,
    authToken: state.profile.authToken
  }),
  dispatch => ({

  })
)(withRouter(Login));