//import "App.css";
import styles from 'components/Authentication/css/SignIn.module.css';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from 'config';

export default function SignIn({ setCookie }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    selectedRole: ['ROLE_USER']
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    const parsedValue = name === 'selectedRole' ? JSON.parse(value) : value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: parsedValue,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/users/authenticate`, {
        usernameOrEmail: formData.username,
        password: formData.password,
        roles: formData.selectedRole,
      });

      setCookie("jwt", `Bearer ${response.data.token}`);
      setCookie("selectedRole", response.data.roles);
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>Welcome Back</h1>
          <p>Sign in to your account</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className={styles.inputContainer}>
            <label htmlFor="username">Username/Email</label>
            <input
              type="username"
              id="username"
              name="username"
              placeholder="Username"
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.buttonContainer}>
            <div className={styles.roleContainer}>
              <label htmlFor="ROLE_ADMIN">
                <input
                  type="radio"
                  id="ROLE_ADMIN"
                  name="selectedRole"
                  value={JSON.stringify(['ROLE_ADMIN'])}
                  onChange={handleChange}
                />
                <span>Administrator</span>
              </label>
              <label htmlFor="ROLE_MANAGER">
                <input
                  type="radio"
                  id="ROLE_MANAGER"
                  name="selectedRole"
                  value={JSON.stringify(['ROLE_MANAGER'])}
                  onChange={handleChange}
                />
                <span>Manager</span>
              </label>
              <label htmlFor="ROLE_USER">
                <input
                  type="radio"
                  id="ROLE_USER"
                  name="selectedRole"
                  value={JSON.stringify(['ROLE_USER'])}
                  onChange={handleChange}
                />
                <span>User</span>
              </label>
            </div>
            <div className={styles.buttonContainer}>
              <button type="submit">Sign In</button>
            </div>
          </div>
          <div className={styles.linkContainer}>
            <p>
              Don't have an account? <Link to="signup"><u>Sign Up</u></Link>
            </p>
          </div>
        </form>
      </div>
    </main>
  );
}