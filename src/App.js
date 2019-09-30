import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import RouteTab from './components/RouteTab';
import 'styled-components/macro'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faBook, faToolbox, faUserTie } from '@fortawesome/free-solid-svg-icons'
import UserScreen from './screens/Users';

/**
 * IDEAS:
 * - create global search field on top menu (searches users, courses,..)
 */


const routes = [
  {
    path: "/",
    exact: true,
    title: 'Users',
    image: <FontAwesomeIcon icon={faUser} />,
    main: () => UserScreen()
  },
  {
    path: "/course",
    title: 'Courses',
    image: <FontAwesomeIcon icon={faBook} />,
    main: () => <h2>Bubblegum</h2>
  },
  {
    path: "/project",
    title: 'Projects',
    image: <FontAwesomeIcon icon={faToolbox} />,
    main: () => <h2>Shoelaces</h2>
  }
];

export default function App() {
  return (
    <Router>
      <div
        css={`
          height: 100vh;
          display: flex;
          flex: 6
        `}>
        <div
          css={`
            display: flex;
            flex: 1.5;
            flex-direction: column;
          `}>
          <div css={`display: flex; width: 100%; height: 20%; align-items: center`}>
            <div
              css={`
                display: flex; 
                flex: 1;
                flex-direction: row; 
                padding: 15px; 
                justify-content: center;
                align-items: center;
                @media (max-width: 768px) {
                  flex-direction: column;
                }
              `}>
              <FontAwesomeIcon css={`font-size: 40px`} icon={faUserTie} />
              <span
                css={`
                  font-weight: 700; 
                  font-size: 14px; 
                  padding: 10px
                `}>Bartolomej</span>
            </div>
          </div>
          <div css={`width: 100%;`}>
            {routes.map((route, index) => (
              <RouteTab
                key={index}
                activeOnlyWhenExact={true}
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
            background-color: #F3F5FA;
          `}>
          {routes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              exact={route.exact}
              component={route.main}
            />
          ))}
        </div>
      </div>
    </Router>
  );
}