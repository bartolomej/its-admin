import React from 'react';
import {
  faUser,
  faBook,
  faToolbox,
  faHome,
  faEnvelope
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import UserScreen from './screens/Users';
import UserForm from "./screens/forms/UserEditor";
import CourseScreen from './screens/Courses';
import DashboardScreen from "./screens/Dashboard";
import CourseEditor from "./screens/forms/CourseEditor";
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
  }
];

const otherRoutes = [
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

export default [ ...sidebarRoutes, ...otherRoutes ];