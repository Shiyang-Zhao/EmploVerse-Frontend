import React, { useState, createContext, useEffect } from 'react';
import { API } from 'api/API';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [isSignedIn, setIsSignedIn] = useState(null);
  const [auth, setAuth] = useState({
    roles: null,
    selectedRoles: null,
    isAdmin: false,
    isManager: false,
    isUser: false
  })

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await API.checkAuth();
        setIsSignedIn(true);
        setAuth({
          roles: response.data.roles,
          selectedRoles: response.data.selectedRoles,
          isAdmin: response.data.selectedRoles.includes('ROLE_ADMIN'),
          isManager: response.data.selectedRoles.includes('ROLE_MANAGER'),
          isUser: response.data.selectedRoles.includes('ROLE_USER'),
        })
        console.log('User is authenticated');
      } catch (error) {
        setIsSignedIn(false);
        console.log('User is not authenticated');
      }
    }
    checkAuth();
  }, []);

  const signup = async (data) => {
    try {
      const response = await API.signUp(data);
      return response;
    } catch (error) {
      throw new Error("Failed to sign up");
    }
  };

  const signin = async (credentials) => {
    try {
      const response = await API.signIn(credentials);
      setIsSignedIn(true);
      return response;
    } catch (error) {
      throw new Error("Failed to sign in");
    }
  };

  const logout = async () => {
    try {
      await API.logOut();
      setIsSignedIn(false);
    } catch (error) {
      throw new Error("Failed to log out");
    }
  };

  return (
    <UserContext.Provider value={{ signup, signin, logout, isSignedIn, auth }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
