import React, { useState, createContext, useEffect } from 'react';
import { API } from 'api/API';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [isSignedIn, setIsSignedIn] = useState(null);

  useEffect(async () => {
    try {
      const response = await API.checkAuth();
      if (response.status === 200) {
        setIsSignedIn(true);
        console.log('User is authenticated');
      } else if (response.status === 401) {
        setIsSignedIn(false);
        console.log('User is not authenticated');
      } else {
        console.log('Unhandled response status:', response.status);
      }
    } catch (error) {
      console.error('Error checking authentication:', error);
    }
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
    <UserContext.Provider value={{ user, signup, signin, logout, isSignedIn, }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
