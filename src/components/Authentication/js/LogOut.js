//import "App.css";
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from "config";
export function LogOut({ state, removeCookie }) {
  const navigate = useNavigate();
  useEffect(() => {
    const logout = async () => {
      await axios.post(`${API_URL}/user/logout`, null, {
        headers: { 'Authorization': state.cookies.jwt },
      });
      removeCookie("jwt");
      removeCookie("selectedRole");
      navigate("/");
    };
    logout();
  }, []);
}

export function Switch({ state, removeCookie }) {
  const navigate = useNavigate();
  useEffect(() => {
    const logout = async () => {
      await axios.post(`${API_URL}/user/logout`, null, {
        headers: { 'Authorization': state.cookies.jwt },
      });
      removeCookie("jwt");
      removeCookie("selectedRole");
      navigate("/signin");
    };
    logout();
  }, []);
}
