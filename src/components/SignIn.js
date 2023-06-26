import './components.css';
import styles from './css/SignIn.module.css';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../config';

export default function SignIn({ setCookie }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    selectedRole: ['ROLE_USER']
  });

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  const handleRoleChange = (event) => {
    setFormData({
      ...formData,
      selectedRole: [event.target.value]
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/user/authenticate`, {
        email: formData.email,
        password: formData.password,
        roles: formData.selectedRole
      });

      setCookie("email", formData.email);
      setCookie("jwt", `Bearer ${response.data.token}`);
      setCookie("selectedRole", formData.selectedRole);
      navigate("/");
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
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              onChange={handleInputChange}
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
              onChange={handleInputChange}
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
                  value={["ROLE_ADMIN"]}
                  onChange={handleRoleChange}
                />
                <span>Administrator</span>
              </label>
              <label htmlFor="ROLE_MANAGER">
                <input
                  type="radio"
                  id="ROLE_MANAGER"
                  name="selectedRole"
                  value={["ROLE_MANAGER"]}
                  onChange={handleRoleChange}
                />
                <span>Manager</span>
              </label>
              <label htmlFor="ROLE_USER">
                <input
                  type="radio"
                  id="ROLE_USER"
                  name="selectedRole"
                  value={["ROLE_USER"]}
                  onChange={handleRoleChange}
                />
                <span>User</span>
              </label>
            </div>
            <button type="submit">Sign In</button>
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