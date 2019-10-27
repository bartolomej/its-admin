import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import SidebarLink from './components/SidebarLink';
import 'styled-components/macro'
import { connect } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faUser,
  faBook,
  faToolbox,
  faUserAstronaut,
  faHome,
  faEnvelope
} from '@fortawesome/free-solid-svg-icons'
import UserScreen from './screens/Users';
import UserForm from "./screens/forms/UserEditor";
import CourseScreen from './screens/Courses';
import DashboardScreen from "./screens/Dashboard";
import CourseEditor from "./screens/forms/CourseEditor";
import TopBar from './components/TopBar';
import CategoryForm from "./screens/forms/CategoryEditor";
import SubcategoryForm from "./screens/forms/SubcategoryEditor";
import Projects from "./screens/Projects";
import Emails from "./screens/Emails";


const sidebarRoutes = [
  {
    path: "/",
    exact: true,
    title: 'DASHBOARD',
    image: <FontAwesomeIcon icon={faHome}/>,
    component: DashboardScreen
  },
  {
    path: "/user",
    title: 'USERS',
    image: <FontAwesomeIcon icon={faUser}/>,
    component: UserScreen
  },
  {
    path: "/course",
    title: 'COURSES',
    image: <FontAwesomeIcon icon={faBook}/>,
    component: CourseScreen
  },
  {
    path: "/project",
    title: 'PROJECTS',
    image: <FontAwesomeIcon icon={faToolbox}/>,
    component: Projects
  },
  {
    path: "/email",
    title: 'EMAILS',
    image: <FontAwesomeIcon icon={faEnvelope}/>,
    component: Emails
  },
  {
    path: "/user/:uid",
    component: UserForm
  },
  {
    path: "/category/:uid",
    component: CategoryForm
  },
  {
    path: "/subcategory/:uid",
    component: SubcategoryForm
  },
  {
    path: "/course/:uid",
    component: CourseEditor
  },
  {
    path: "/add_user",
    component: UserForm
  },
  {
    path: "/add_category",
    component: CategoryForm
  },
  {
    path: "/add_subcategory",
    component: SubcategoryForm
  },
  {
    path: "/add_course",
    component: CourseEditor
  }
];

function App () {
  return (
    <Router>
      <div>
        <div
          css={`
            height: 100vh;
            display: flex;
            width: 240px;
            position: fixed;
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
              lastName={'Kozorog'}
            />
          </div>
          <div css={``}>
            {sidebarRoutes.map((route, index) => (
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
            flex: 5;
            margin-left: 240px;
            display: flex;
            min-height: 100vh;
            flex-direction: column;
            background-color: #F3F5FA;
          `}>
          <TopBar/>
          <div css={`flex: 4.5`}>
            {sidebarRoutes.map((route, index) => (
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
      `}>
      <FontAwesomeIcon
        css={`font-size: 35px`}
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