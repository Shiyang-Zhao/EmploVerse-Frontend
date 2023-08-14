import "../../src/App.css";
import styles from './css/AddEmployee.module.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL, formatLabel, inputTypes } from '../config';

export default function AddEmployee({ state }) {
  const navigate = useNavigate();

  const [user, setUser] = useState({});
  const [personalInfo, setPersonalInfo] = useState({
    gender: '',
    birthday: null,
    citizenship: '',
    ssn: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
  });
  const [employeeInfo, setEmployeeInfo] = useState({
    startDate: null,
    endDate: null,
    employmentType: '',
    department: '',
    manager: '',
    jobTitles: '',
    workLocation: '',
    workSchedule: '',
    status: '',
    salaryInfo: {
    }
  });
  const [educationInfo, setEducationInfo] = useState({
    university: '',
    degree: '',
    major: '',
    gpa: ''
  });
  const [activeSection, setActiveSection] = useState(personalInfo);

  const switchSection = (section) => {
    setActiveSection(section);
    console.log(activeSection)
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setActiveSection((prevActiveSection) => ({
      ...prevActiveSection,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post(`${API_URL}/employees/saveEmployee`, activeSection, {
      headers: {
        'Authorization': state.cookies.jwt
      }
    })
      .then(() => {
        navigate('/employees');
      });
  };

  return (
    <main>
      <div className={styles.container}>
        <h2>Employee Details</h2>
        <button className={styles['link-account-btn']}>Link an account</button>
        <div className={styles['nav-bar']}>
          <button className={`${styles['nav-btn']} ${styles.personalInfo}`} onClick={() => switchSection(personalInfo)}>Personal Infomation</button>
          <button className={`${styles['nav-btn']} ${styles.employeeInfo}`} onClick={() => switchSection(employeeInfo)}>Employee Infomation</button>
          <button className={`${styles['nav-btn']} ${styles.educationInfo}`} onClick={() => switchSection(educationInfo)}>Education Infomation</button>
        </div>

        <form className={styles.addEmployeeForm} onSubmit={handleSubmit}>
          {Object.entries(activeSection).map(([name, value]) => (
            <div className={styles['input-container']} key={name}>
              <label htmlFor={`employee-${name}`}>{formatLabel(name)}</label>
              <input
                id={`employee-${name}`}
                name={name}
                type={inputTypes[name] || inputTypes.default}
                placeholder={formatLabel(name)}
                value={value}
                onCanPlay={handleChange}
                required
              />
            </div>
          ))}
          <button type="submit">Save</button>
        </form>
      </div>
    </main>
  );
}

