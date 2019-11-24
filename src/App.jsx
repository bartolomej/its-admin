import React, {useEffect} from "react";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import 'styled-components/macro'
import { connect } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserAstronaut } from '@fortawesome/free-solid-svg-icons'

import SidebarLink from './components/SidebarLink';
import TopBar from './components/TopBar';
import routes from './routes';
import { DARK_FONT } from "./styles";
import Login from "./screens/Login";



function App ({user, loading, error, loggedIn}) {
  // redirect to Login screen if authToken not present
  return (
    <Router>
      {!loggedIn ? <Redirect to="/login" /> : <Redirect to="/app" />}
      <Route exact path="/login">
        <Login/>
      </Route>
      <Route path="/app">
        <Sidebar username={user && user.username}/>
        <MainView/>
      </Route>
    </Router>
  );
}

function MainView () {
  return (
    <div
      css={`
        flex: 5;
        margin-left: 240px;
        display: flex;
        min-height: 100vh;
        flex-direction: column;
        background-color: #F6F6FA;
      `}>
      <TopBar/>
      <div
        css={`
          flex: 1;
          padding: 60px 220px;
          @media (max-width: 1300px) { padding: 60px 100px; }
          @media (max-width: 1000px) { padding: 60px 60px; }
        `}
      >
        {routes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            exact={true}
            component={route.component}
          />
        ))}
      </div>
    </div>
  )
}

function Sidebar ({username}) {
  return (
    <div
      css={`
         height: 100vh;
         display: flex;
         width: 240px;
         position: fixed;
         flex-direction: column;
         border-right: 1px solid #e1e4e8;
      `}>
      <div
        css={`
           display: flex; 
           width: 100%; 
           height: 20%; 
           align-items: center
        `}>
        <AdminProfile username={username} />
      </div>
      <div>
        {routes
          .filter(r => r.image && r.title)
          .map((route, index) => (
            <SidebarLink
              key={index}
              activeOnlyWhenExact={route.exact}
              image={route.image}
              path={route.path}
              title={route.title}
            />
          )
        )}
      </div>
    </div>
  )
}

function AdminProfile ({ username }) {
  return (
    <div
      css={`
        display: flex; 
        flex: 1;
        flex-direction: column; 
        padding: 15px; 
        justify-content: center;
        align-items: center;
        color: ${DARK_FONT};
      `}>
      <FontAwesomeIcon
        css={`
          font-size: 40px;
          margin: 10px;
        `}
        icon={faUserAstronaut}/>
      <span
        css={`
          font-weight: 700; 
          font-size: 15px; 
          padding: 10px
        `}>
        {username ? username : ''}
      </span>
    </div>
  )
}

export default connect(state => ({
  user: state.profile.user,
  loading: state.profile.loading,
  error: state.profile.error,
  authToken: state.profile.authToken
}))(App);