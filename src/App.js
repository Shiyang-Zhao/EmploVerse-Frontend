import React, { useState, useEffect, createRef } from 'react';
import { Routes, Route, useLocation } from "react-router-dom";
import { Navigate } from 'react-router';
import { useCookies } from 'react-cookie';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { ParallaxProvider } from 'react-scroll-parallax';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import { LogOut, Switch } from './components/LogOut'
import Header from './components/Header';
import Home from './components/Home';
import User from './components/User';
import UserList from './components/UserList';
import EmployeeList from './components/EmployeeList';
import AddEmployee from './components/AddEmployee';
import Employee from './components/Employee';
import EditEmployee from './components/EditEmployee';
import EditUser from './components/EditUser';

export default function App() {
  const ref = createRef();
  const location = useLocation();
  const [cookies, setCookie, removeCookie] = useCookies(['id', 'username', 'email', 'jwt', 'selectedRole']);
  const [state, setState] = useState({
    cookies: cookies,
    isSignedIn: cookies.jwt ? true : false,
  });
  useEffect(() => {
    setState({
      cookies: cookies,
      isSignedIn: cookies.jwt ? true : false,
    });
  }, [cookies]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
              <Route path="/" element={<div ref={ref}><Home /></div>} />
              <Route path="users" element={state.isSignedIn ? <div ref={ref}><UserList state={state} /></div> : <Navigate to="/signin" />} />
              <Route path="user" element={state.isSignedIn ? <div ref={ref}><User state={state} /></div> : <Navigate to="/signin" />} />
              <Route path="user/edituser" element={state.isSignedIn ? <div ref={ref}><EditUser state={state} /></div> : <Navigate to="/signin" />} />

              <Route path="employees" element={state.isSignedIn ? <div ref={ref}><EmployeeList state={state} /></div> : <Navigate to="/signin" />} />
              <Route path="employees/employeeProfile" element={state.isSignedIn ? <div ref={ref}><Employee state={state} /></div> : <Navigate to="/signin" />} />
              <Route path="employees/addemployee" element={state.isSignedIn ? <div ref={ref}><AddEmployee state={state} /></div> : <Navigate to="/signin" />} />
              <Route path="employees/editemployee" element={state.isSignedIn ? <div ref={ref}><EditEmployee state={state} /></div> : <Navigate to="/signin" />} />

              <Route path="signin" element={state.isSignedIn ? <Navigate to="/" /> : <div ref={ref}><SignIn setCookie={setCookie} /></div>} />
              <Route path="signin/signup" element={state.isSignedIn ? <Navigate to="/" /> : <div ref={ref}><SignUp setCookie={setCookie} /></div>} />
              <Route path="/logout" element={state.isSignedIn ? <div ref={ref}><LogOut state={state} removeCookie={removeCookie} /></div> : <Navigate to="/signin" />} />
              <Route path="/switch" element={state.isSignedIn ? <div ref={ref}><Switch state={state} removeCookie={removeCookie} /></div> : <Navigate to="/signin" />} />

            </Routes>
          </ParallaxProvider>
        </CSSTransition>
      </TransitionGroup>
    </div>
  )
}
