import React, { useState, useEffect } from 'react';
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
import EmployeeList from './components/EmployeeList';
import AddEmployee from './components/AddEmployee';
import User from './components/User';
import Employee from './components/Employee';
import EditEmployee from './components/EditEmployee';
import EditUser from './components/EditUser';

export default function App() {
  const location = useLocation();
  const [cookies, setCookie, removeCookie] = useCookies(['email', 'jwt', 'selectedRole']);
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
    console.log(state);
  }, [state]);

  return (
    <div>
      <Header state={state} />
      {window.location.pathname === "/" ? "" : <div className="gradient-top"></div>}
      <TransitionGroup component={null}>
        <CSSTransition key={location.key} timeout={500} classNames="fade">
          <ParallaxProvider>
            <Routes location={location}>
              <Route path="/" element={<Home />}></Route>
              <Route path="user" element={state.isSignedIn ? <User state={state} /> : <Navigate to="/signin" />}></Route>
              <Route path="user/edituser" element={state.isSignedIn ? <EditUser state={state} /> : <Navigate to="/signin" />}></Route>

              <Route path="employees" element={state.isSignedIn ? <EmployeeList state={state} /> : <Navigate to="/signin" />}></Route>
              <Route path="employees/employeeProfile" element={state.isSignedIn ? <Employee state={state} /> : <Navigate to="/signin" />}></Route>
              <Route path="employees/addemployee" element={state.isSignedIn ? <AddEmployee state={state} /> : <Navigate to="/signin" />}></Route>
              <Route path="employees/editemployee" element={state.isSignedIn ? <EditEmployee state={state} /> : <Navigate to="/signin" />}></Route>

              <Route path="signin" element={state.isSignedIn ? <Navigate to="/" /> : <SignIn setCookie={setCookie} />}></Route>
              <Route path="signin/signup" element={state.isSignedIn ? <Navigate to="/" /> : <SignUp setCookie={setCookie} />}></Route>
              <Route path="/logout" element={state.isSignedIn ? <LogOut state={state} removeCookie={removeCookie} /> : <Navigate to="/signin" />}></Route>
              <Route path="/switch" element={state.isSignedIn ? <Switch state={state} removeCookie={removeCookie} /> : <Navigate to="/signin" />}></Route>
            </Routes>
          </ParallaxProvider>
        </CSSTransition>
      </TransitionGroup>
    </div>
  )
}
