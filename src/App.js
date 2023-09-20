import 'App.scss';
import React, { useState, useEffect, createRef } from 'react';
import { Routes, Route, useLocation } from "react-router-dom";
import { Navigate } from 'react-router';
import { useCookies } from 'react-cookie';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { ParallaxProvider } from 'react-scroll-parallax';
import SignUp from 'components/Authentication/js/SignUp';
import SignIn from 'components/Authentication/js/SignIn';
import { LogOut } from 'components/Authentication/js/LogOut'
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

export default function App() {
  const ref = createRef();
  const location = useLocation();
  const [cookies, setCookie, removeCookie] = useCookies(['jwt', 'selectedRole']);
  const [state, setState] = useState({
    cookies: cookies,
    isSignedIn: cookies.jwt ? true : false,
  });
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    setState({
      cookies: cookies,
      isSignedIn: cookies.jwt ? true : false,
    });
  }, [cookies]);

  useEffect(() => {
    console.log(state);
  }, [state]);

  return (
    <div>
      <Header state={state} />
      <TransitionGroup component={null}>
        <CSSTransition nodeRef={ref} key={location.key} timeout={500} classNames="fade">
          <ParallaxProvider>
            <Routes location={location}>
              <Route path="/" element={<div ref={ref}><Home state={state} /></div>} />
              <Route path="signin" element={state.isSignedIn ? <Navigate to="/" /> : <div ref={ref}><SignIn setCookie={setCookie} /></div>} />
              <Route path="signup" element={state.isSignedIn ? <Navigate to="/" /> : <div ref={ref}><SignUp setCookie={setCookie} /></div>} />

              {state.isSignedIn && (
                <React.Fragment>
                  {state.cookies.selectedRole[0] !== 'ROLE_USER' && (
                    <React.Fragment>
                      <Route path="users" element={<div ref={ref}><UserList state={state} /></div>} />
                      <Route path="users/user/:userId" element={<div ref={ref}><User state={state} /></div>} />
                      <Route path="users/user/:userId/edit" element={<div ref={ref}><EditUser state={state} /></div>} />

                      <Route path="employees/employee/:employeeId" element={<div ref={ref}><Employee state={state} /></div>} />
                      <Route path="employees/employee/:employeeId/edit" element={<div ref={ref}><EditEmployee state={state} /></div>} />
                    </React.Fragment>
                  )}

                  <Route path="current_user" element={<div ref={ref}><User state={state} /></div>} />
                  <Route path="current_user/edit" element={<div ref={ref}><EditUser state={state} /></div>} />
                  <Route path="chat" element={<div ref={ref}><Chat /></div>} />

                  <Route path="employees" element={<div ref={ref}><EmployeeList state={state} /></div>} />
                  <Route path="employees/add" element={<div ref={ref}><AddEmployee state={state} /></div>} />
                  <Route path="current_employee" element={<div ref={ref}><Employee state={state} /></div>} />
                  <Route path="current_employee/edit" element={<div ref={ref}><EditEmployee state={state} /></div>} />

                  <Route path="/logout" element={<div ref={ref}><LogOut state={state} removeCookie={removeCookie} /></div>} />
                  {/* <Route path="/switch" element={<div ref={ref}><Switch state={state} removeCookie={removeCookie} /></div>} /> */}
                </React.Fragment>
              )}
            </Routes>
          </ParallaxProvider>
        </CSSTransition>
      </TransitionGroup>
    </div>
  )
}
