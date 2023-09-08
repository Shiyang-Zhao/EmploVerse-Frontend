//import "App.css";
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API } from 'api/API'

export function LogOut({ state, removeCookie }) {
  const navigate = useNavigate();
  useEffect(() => {
    const logout = async () => {
      await API.logOut();
      removeCookie("jwt");
      removeCookie("selectedRole");
      navigate("/");
    };
    logout();
  }, []);
}
