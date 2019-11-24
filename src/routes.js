import React from 'react';
import {
  faUser,
  faBook,
  faList,
  faHome,
  faEnvelope
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import UserScreen from './screens/Users';
import UserForm from "./screens/forms/User";
import CourseScreen from './screens/Courses';
import DashboardScreen from "./screens/Dashboard";
import CourseEditor from "./screens/forms/Course";
import CategoryForm from "./screens/forms/Category";
import SubcategoryForm from "./screens/forms/Subcategory";
import Events from "./screens/Events";
import Emails from "./screens/Emails";
import Login from './screens/Login';


const sidebarRoutes = [
  {
    path: "/app/",
    exact: true,
    title: 'DASHBOARD',
    image: <FontAwesomeIcon icon={faHome}/>,
    component: DashboardScreen
  },
  {
    path: "/app/user",
    title: 'USERS',
    image: <FontAwesomeIcon icon={faUser}/>,
    component: UserScreen
  },
  {
    path: "/app/course",
    title: 'COURSES',
    image: <FontAwesomeIcon icon={faBook}/>,
    component: CourseScreen
  },
  {
    path: "/app/event",
    title: 'EVENTS',
    image: <FontAwesomeIcon icon={faList}/>,
    component: Events
  },
  {
    path: "/app/email",
    title: 'EMAILS',
    image: <FontAwesomeIcon icon={faEnvelope}/>,
    component: Emails
  }
];

const otherRoutes = [
  {
    path: "/app/login",
    component: Login
  },
  {
    path: "/app/user/:uid",
    component: UserForm
  },
  {
    path: "/app/category/:uid",
    component: CategoryForm
  },
  {
    path: "/app/subcategory/:uid",
    component: SubcategoryForm
  },
  {
    path: "/app/course/:uid",
    component: CourseEditor
  },
  {
    path: "/app/add_user",
    component: UserForm
  },
  {
    path: "/app/add_category",
    component: CategoryForm
  },
  {
    path: "/app/add_subcategory",
    component: SubcategoryForm
  },
  {
    path: "/app/add_course",
    component: CourseEditor
  }
];

export default [ ...sidebarRoutes, ...otherRoutes ];