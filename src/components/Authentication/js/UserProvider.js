import React, { useState, useContext, createContext } from 'react';
import { API } from 'api/API';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (credentials) => {
    try {
      const response = await API.signIn(credentials);
      setUser({
        username: credentials.username,
        roles: credentials.roles,
        jwt: `Bearer ${response.data.token}`
      });
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await API.logOut();
      setUser(null); // Reset user state
    } catch (error) {
      console.error("Failed to log out:", error);
    }
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
