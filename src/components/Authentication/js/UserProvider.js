import React, { useState, createContext } from 'react';
import { API } from 'api/API';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const isSignedIn = () => user !== null;

  const isAdmin = () => user.selectedRole === 'ROLE_ADMIN';

  const isUser = () => user.selectedRole === 'ROLE_USER';

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
      setUser({
        usernameOrEmail: credentials.usernameOrEmail,
        jwt: `Bearer ${response.data.token}`,
        selectedRole: credentials.selectedRole,
      });
      return response;
    } catch (error) {
      throw new Error("Failed to sign in");
    }
  };

  const logout = async () => {
    try {
      await API.logOut();
      setUser(null);
    } catch (error) {
      throw new Error("Failed to log out");
    }
  };

  return (
    <UserContext.Provider value={{ user, signup, signin, logout, isSignedIn, isAdmin, isUser}}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
