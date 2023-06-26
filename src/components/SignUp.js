import './components.css';
import styles from './css/SignUp.module.css';
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../config';

export default function SignUp({ setCookie }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    birthday: '',
    phoneNumber: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    company: '',
    startDate: '',
    endDate: '',
    department: '',
    supervisor: '',
    jobTitles: '',
    workSchedule: '',
    status: '',
    university: '',
    degree: '',
    major: '',
    roles: []
  });

  const [selectedRole, setSelectedRole] = useState(["ROLE_USER"]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const registerResponse = await axios.post(
        `${API_URL}/user/register`,
        formData
      );

      const authenticateResponse = await axios.post(
        `${API_URL}/user/authenticate`,
        {
          email: formData.email,
          password: formData.password,
          roles: selectedRole,
        }
      );
      setCookie("email", formData.email);
      setCookie("jwt", `Bearer ${authenticateResponse.data.token}`);
      setCookie("selectedRole", selectedRole);
      navigate('/');

    } catch (error) {
      console.log(formData.email)
      console.log(formData.password)
      console.log(selectedRole)
      console.log(error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleRoleChange = (event) => {
    const selectedRole = [event.target.value];
    setSelectedRole(selectedRole);

    let roles = ["ROLE_USER"];
    if (selectedRole[0] === "ROLE_ADMIN") {
      roles = ["ROLE_ADMIN", "ROLE_MANAGER", "ROLE_USER"];
    } else if (selectedRole[0] === "ROLE_MANAGER") {
      roles = ["ROLE_MANAGER", "ROLE_USER"];
    }

    setFormData((prevFormData) => ({
      ...prevFormData,
      roles,
    }));
  };

  return (
    <main>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>Welcome Back</h1>
          <p>Sign up</p>
        </div>
        <form className={styles.signUpForm} onSubmit={handleSubmit}>
          <div className={styles.inputContainer}>
            <label htmlFor="firstName">First Name <text className={styles.requiredText}>*</text></label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              placeholder="First Name"
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="lastName">Last Name <text className={styles.requiredText}>*</text></label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Last Name"
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="email">Email <text className={styles.requiredText}>*</text></label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="password">Password <text className={styles.requiredText}>*</text></label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="birthday">Birthday <text className={styles.requiredText}>*</text></label>
            <input
              type="date"
              id="birthday"
              name="birthday"
              pattern="\d{1,2}/\d{1,2}/\d{4}"
              placeholder="Birthday"
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="phoneNumber">Phone Number <text className={styles.requiredText}>*</text></label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              placeholder="Phone Number"
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="address1">Address Line 1 <text className={styles.requiredText}>*</text></label>
            <input
              type="text"
              id="address1"
              name="address1"
              placeholder="Address Line 1"
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="address2">Address Line 2</label>
            <input
              type="text"
              id="address2"
              name="address2"
              placeholder="Address Line 2"
              onChange={handleChange}
            />
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="city">City <text className={styles.requiredText}>*</text></label>
            <input
              type="text"
              id="city"
              name="city"
              placeholder="City"
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="state">State <text className={styles.requiredText}>*</text></label>
            <input
              type="text"
              id="state"
              name="state"
              placeholder="State"
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="zipcode">Zip Code <text className={styles.requiredText}>*</text></label>
            <input
              type="text"
              id="zipcode"
              name="zipcode"
              pattern="[0-9]{5}"
              placeholder="Zip Code"
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="country">Country <text className={styles.requiredText}>*</text></label>
            <input
              type="text"
              id="country"
              name="country"
              placeholder="Country"
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="company">Company <text className={styles.requiredText}>*</text></label>
            <input
              type="text"
              id="company"
              name="company"
              placeholder="Company"
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="startDate">Start Date <text className={styles.requiredText}>*</text></label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              pattern="\d{1,2}/\d{1,2}/\d{4}"
              placeholder="Start Date"
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="endDate">End Date</label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              pattern="\d{1,2}/\d{1,2}/\d{4}"
              placeholder="End Date"
              onChange={handleChange}
            />
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="department">Department <text className={styles.requiredText}>*</text></label>
            <input
              type="text"
              id="department"
              name="department"
              placeholder="Department"
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="supervisor">Supervisor <text className={styles.requiredText}>*</text></label>
            <input
              type="text"
              id="supervisor"
              name="supervisor"
              placeholder="Supervisor"
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="jobTitles">Job Titles <text className={styles.requiredText}>*</text></label>
            <input
              type="text"
              id="jobTitles"
              name="jobTitles"
              placeholder="Job Titles"
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="workSchedule">Work Schedule <text className={styles.requiredText}>*</text></label>
            <input
              type="text"
              id="workSchedule"
              name="workSchedule"
              placeholder="Work Schedule"
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="status">Status <text className={styles.requiredText}>*</text></label>
            <input
              type="text"
              id="status"
              name="status"
              placeholder="Status"
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="university">University <text className={styles.requiredText}>*</text></label>
            <input
              type="text"
              id="university"
              name="university"
              placeholder="University"
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="degree">Degree <text className={styles.requiredText}>*</text></label>
            <input
              type="text"
              id="degree"
              name="degree"
              placeholder="Degree"
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="major">Major <text className={styles.requiredText}>*</text></label>
            <input
              type="text"
              id="major"
              name="major"
              placeholder="Major"
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="role">Role <text className={styles.requiredText}>*</text></label>
            <select id="roles" name="roles" defaultValue='ROLE_USER' onChange={handleRoleChange}>
              <option value="ROLE_ADMIN" >Administrator</option>
              <option value="ROLE_MANAGER" >Manager</option>
              <option value="ROLE_USER" >User</option>
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