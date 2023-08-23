import 'App.css';
import React, { useState, useEffect, createRef } from 'react';
import { Routes, Route, useLocation } from "react-router-dom";
import { Navigate } from 'react-router';
import { useCookies } from 'react-cookie';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { ParallaxProvider } from 'react-scroll-parallax';
import SignUp from 'components/Authentication/js/SignUp';
import SignIn from 'components/Authentication/js/SignIn';
import { LogOut, Switch } from 'components/Authentication/js/LogOut'
import Header from 'components/Others/js/Header';
import Home from 'components/Others/js/Home';
import CurrentUser from 'components/User/js/CurrentUser';
import CurrentEmployee from 'components/Employee/js/CurrentEmployee';
import UserList from 'components/User/js/UserList';
import EmployeeList from 'components/Employee/js/EmployeeList';
import AddEmployee from 'components/Employee/js/AddEmployee';
import Employee from 'components/Employee/js/Employee';
import EditEmployee from 'components/Employee/js/EditEmployee';
import EditUser from 'components/User/js/EditUser';
import axios from 'axios';
import { API_URL, inputTypes, formatLabel } from './config';

export default function App() {
  const ref = createRef();
  const location = useLocation();
  const [user, setUser] = useState({});
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

  useEffect(() => {
    if (state.isSignedIn) {
      const getUser = async () => {
        try {
          const response = await axios.get(`${API_URL}/user/getCurrentUser`,
            {
              headers: {
                'Authorization': state.cookies.jwt
              }
            });
          const { password, ...FormData } = response.data;
          setUser(FormData);
          localStorage.setItem('user', JSON.stringify(FormData));
        } catch (error) {
          console.log(error);
        }
      };
      getUser();
    }
  }, [location, state]);

  return (
    <div>
      <Header state={state} />
      <TransitionGroup component={null}>
        <CSSTransition nodeRef={ref} key={location.key} timeout={500} classNames="fade">
          <ParallaxProvider>
            <Routes location={location}>
              <Route path="/" element={<div ref={ref}><Home state={state} /></div>} />
              <Route path="users" element={state.isSignedIn ? <div ref={ref}><UserList state={state} /></div> : <Navigate to="/signin" />} />
              <Route path="user" element={state.isSignedIn ? <div ref={ref}><CurrentUser state={state} /></div> : <Navigate to="/signin" />} />
              <Route path="user/edituser" element={state.isSignedIn ? <div ref={ref}><EditUser state={state} /></div> : <Navigate to="/signin" />} />

              <Route path="employees" element={state.isSignedIn ? <div ref={ref}><EmployeeList state={state} /></div> : <Navigate to="/signin" />} />
              <Route path="employees/employeeProfile" element={state.isSignedIn ? <div ref={ref}><Employee state={state} /></div> : <Navigate to="/signin" />} />
              <Route path="employees/currentEmployeeProfile" element={state.isSignedIn ? <div ref={ref}><CurrentEmployee state={state} /></div> : <Navigate to="/signin" />} />
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
