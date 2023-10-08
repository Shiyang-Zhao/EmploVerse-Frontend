import styles from 'components/Authentication/css/SignIn.module.scss';
import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserContext from './UserProvider';

export default function SignIn() {
  const navigate = useNavigate();
  const { signin } = useContext(UserContext);

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    selectedRoles: ['ROLE_USER']
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    const parsedValue = name === 'selectedRoles' ? JSON.parse(value) : value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: parsedValue,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await signin({
        usernameOrEmail: formData.username,
        password: formData.password,
        selectedRoles: formData.selectedRoles,
      });
      navigate('/');
    } catch (error) {
      console.log(error.message);
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
                  name="selectedRoles"
                  value={JSON.stringify(['ROLE_ADMIN'])}
                  onChange={handleChange}
                />
                <span>Administrator</span>
              </label>
              <label htmlFor="ROLE_MANAGER">
                <input
                  type="radio"
                  id="ROLE_MANAGER"
                  name="selectedRoles"
                  value={JSON.stringify(['ROLE_MANAGER'])}
                  onChange={handleChange}
                />
                <span>Manager</span>
              </label>
              <label htmlFor="ROLE_USER">
                <input
                  type="radio"
                  id="ROLE_USER"
                  name="selectedRoles"
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
              Don't have an account? <Link to="/signup"><u>Sign Up</u></Link>
            </p>
          </div>
        </form>
      </div>
    </main>
  );
}