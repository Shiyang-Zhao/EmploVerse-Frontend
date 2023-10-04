import 'App.scss';
import React, { useState, useEffect, createRef, useContext } from 'react';
import { Routes, Route, useLocation } from "react-router-dom";
import { Navigate } from 'react-router';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { ParallaxProvider } from 'react-scroll-parallax';
import UserContext, { UserProvider } from "components/Authentication/js/UserProvider";
import SignUp from 'components/Authentication/js/SignUp';
import SignIn from 'components/Authentication/js/SignIn';
import Header from 'components/Others/js/Header';
import Home from 'components/Others/js/Home';
import Chat from 'components/User/js/Chat';
import User from 'components/User/js/User';
import UserList from 'components/User/js/UserList';
import EmployeeList from 'components/Employee/js/EmployeeList';
import AddEmployee from 'components/Employee/js/AddEmployee';
import Employee from 'components/Employee/js/Employee';
import EditEmployee from 'components/Employee/js/EditEmployee';
import EditUser from 'components/User/js/EditUser';
import { LogOut } from 'components/Authentication/js/LogOut';

export default function App() {
  const ref = createRef();
  const location = useLocation();
  const { isSignedIn, isAdmin } = useContext(UserContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <React.Fragment>
      <Header />
      <TransitionGroup component={null}>
        <CSSTransition nodeRef={ref} key={location.key} timeout={500} classNames="fade">
          <ParallaxProvider>
            <Routes location={location}>
              <Route path="/" element={<div ref={ref}><Home /></div>} />
              <Route path="signin" element={<div ref={ref}><SignIn /></div>} />
              <Route path="signup" element={<div ref={ref}><SignUp /></div>} />
              <Route path="logout" element={<div ref={ref}><LogOut /></div>} />

              {isSignedIn() && (<React.Fragment>
                {isAdmin() && (<React.Fragment>
                  <Route path="users" element={<div ref={ref}><UserList /></div>} />
                  <Route path="users/user/:userId" element={<div ref={ref}><User /></div>} />
                  <Route path="users/user/:userId/edit" element={<div ref={ref}><EditUser /></div>} />

                  <Route path="employees/employee/:employeeId" element={<div ref={ref}><Employee /></div>} />
                  <Route path="employees/employee/:employeeId/edit" element={<div ref={ref}><EditEmployee /></div>} />
                </React.Fragment>)}

                <Route path="current_user" element={<div ref={ref}><User /></div>} />
                <Route path="current_user/edit" element={<div ref={ref}><EditUser /></div>} />
                {/* <Route path="chat" element={<div ref={ref}><Chat /></div>} /> */}

                <Route path="employees" element={<div ref={ref}><EmployeeList /></div>} />
                <Route path="employees/add" element={<div ref={ref}><AddEmployee /></div>} />
                <Route path="current_employee" element={<div ref={ref}><Employee /></div>} />
                <Route path="current_employee/edit" element={<div ref={ref}><EditEmployee /></div>} />

              </React.Fragment>)}
            </Routes>
          </ParallaxProvider>
        </CSSTransition>
      </TransitionGroup>
    </React.Fragment>
  )
}
