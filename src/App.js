import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import SidebarLink from './components/SidebarLink';
import 'styled-components/macro'
import { connect } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faBook, faToolbox, faUserAstronaut, faHome } from '@fortawesome/free-solid-svg-icons'
import UserScreen from './screens/Users';
import UserProfile from "./screens/UserProfile";
import CourseScreen from './screens/Courses';
import DashboardScreen from "./screens/Dashboard";
import CourseEditor from "./screens/CourseEditor";
import TopBar from './components/TopBar';


const sidebarRoutes = [
  {
    path: "/",
    exact: true,
    title: 'Dashboard',
    image: <FontAwesomeIcon icon={faHome} />,
    main: DashboardScreen
  },
  {
    path: "/user",
    title: 'Users',
    image: <FontAwesomeIcon icon={faUser} />,
    main: UserScreen
  },
  {
    path: "/course",
    title: 'Courses',
    image: <FontAwesomeIcon icon={faBook} />,
    main: CourseEditor
  },
  {
    path: "/project",
    title: 'Projects',
    image: <FontAwesomeIcon icon={faToolbox} />,
    main: () => <h2>Projects screen</h2>
  },
];

const otherRoutes = [
  {
    path: "/user/:uid",
    title: 'Projects',
    image: <FontAwesomeIcon icon={faToolbox} />,
    main: UserProfile
  },
];

function App() {
  return (
    <Router>
      <div
        css={`
          height: 100vh;
          display: flex;
          flex: 6;
        `}>
        <div
          css={`
            display: flex;
            width: 200px;
            flex-direction: column;
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
              lastName={'Kozorog'} />
          </div>
          <div css={`width: 100%;`}>
            {sidebarRoutes.map((route, index) => (
              <SidebarLink
                key={index}
                activeOnlyWhenExact={route.exact}
                image={route.image}
                path={route.path}
                title={route.title}/>
              )
            )}
          </div>
        </div>
        <div
          css={`
            flex: 5;
            display: flex;
            flex-direction: column;
            background-color: #F3F5FA;
          `}>
          { /* <TopBar/> */ }
          <div css={`flex: 4.5`}>
            {sidebarRoutes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                exact={true}
                component={route.main}
              />
            ))}
            {otherRoutes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                component={route.main}
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
      `}>
      <FontAwesomeIcon
        css={`font-size: 35px`}
        icon={faUserAstronaut} />
      <span
        css={`
          font-weight: 700; 
          font-size: 15px; 
          padding: 10px
        `}>
        { firstName }
      </span>
    </div>
  )
}

export default connect(state => ({
  profile: state.profile
}))(App);