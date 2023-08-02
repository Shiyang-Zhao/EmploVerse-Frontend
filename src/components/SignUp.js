import './components.css';
import styles from './css/SignUp.module.css';
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_URL, inputTypes, formatLabel } from '../config';

export default function SignUp({ setCookie }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    phoneNumber: '',
    profileImage: ''
  });

  const [roles, setRoles] = useState(["ROLE_USER"]);
  const [selectedRole, setSelectedRole] = useState(["ROLE_USER"]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleRoleChange = (event) => {
    setRoles(event.target.value);
    setSelectedRole([event.target.value[0]]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const registerResponse = await axios.post(
        `${API_URL}/user/register`,
        { ...formData, roles }
      );

      if (registerResponse.ok) {
        const authenticateResponse = await axios.post(
          `${API_URL}/user/authenticate`,
          {
            username: formData.username,
            password: formData.password,
            roles: selectedRole,
          }
        );
        setCookie("id", authenticateResponse.data.id);
        setCookie("username", authenticateResponse.data.username);
        setCookie("email", authenticateResponse.data.email);
        setCookie("jwt", `Bearer ${authenticateResponse.data.token}`);
        setCookie("selectedRole", authenticateResponse.data.roles);
        navigate('/');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>Welcome Back</h1>
          <p>Sign up</p>
        </div>
        <form className={styles.signUpForm} onSubmit={handleSubmit}>
          {Object.entries(formData).map(([name, value]) => (
            <div className={styles.inputContainer}>
              <label htmlFor={`user-${name}`}>{formatLabel(name)}</label>
              <input
                id={`user-${name}`}
                name={name}
                type={inputTypes[name] || inputTypes.default}
                placeholder={formatLabel(name)}
                value={value}
                onChange={handleChange}
                required
              />
            </div>
          ))}
          <div className={styles.inputContainer} key="roles">
            <label htmlFor="user-roles">Role</label>
            <select id="roles" name="roles" defaultValue={formData.roles} onChange={handleRoleChange}>
              <option value={["ROLE_ADMIN", "ROLE_MANAGER", "ROLE_USER"]}>Administrator</option>
              <option value={["ROLE_MANAGER", "ROLE_USER"]}>Manager</option>
              <option value={["ROLE_USER"]}>User</option>
            </select>
          </div>
          <div className={styles.buttonContainer}>
            <button type="submit">Sign Up</button>
          </div>
        </form>
      </div>
    </main>
  );
}