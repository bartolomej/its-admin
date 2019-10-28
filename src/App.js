import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import SidebarLink from './components/SidebarLink';
import 'styled-components/macro'
import { connect } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserAstronaut } from '@fortawesome/free-solid-svg-icons'
import TopBar from './components/TopBar';
import routes from './routes';
import { DARK_FONT } from "./styles";


function App () {
  return (
    <Router>
      <div>
        <div
          css={`
            /* SIDEBAR */
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
            <AdminProfile
              firstName={'Bartolomej'}
              lastName={'Kozorog'}
            />
          </div>
          <div>
            {routes.map((route, index) => (
              // render sidebar link for appropriate routes
              route.image && route.title ?
                <SidebarLink
                  key={index}
                  activeOnlyWhenExact={route.exact}
                  image={route.image}
                  path={route.path}
                  title={route.title}
                /> : undefined
              )
            )}
          </div>
        </div>
        <div
          css={`
            /* MAIN VIEW */
            flex: 5;
            margin-left: 240px;
            display: flex;
            min-height: 100vh;
            flex-direction: column;
            background-color: #F8F6F7;
          `}>
          <TopBar/>
          <div css={`flex: 4.5`}>
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
      </div>
    </Router>
  );
}

function AdminProfile ({ firstName, lastName }) {
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
        {firstName}
      </span>
    </div>
  )
}

export default connect(state => ({
  profile: state.profile
}))(App);