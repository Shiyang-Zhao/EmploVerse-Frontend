import './components.css';
import styles from './css/AddEmployee.module.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL, formatLabel, inputTypes } from '../config';

export default function AddEmployee({ state }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
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
    major: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post(`${API_URL}/employees/saveEmployee`, formData, {
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
        <form className={styles.addEmployeeForm} onSubmit={handleSubmit}>
          {Object.entries(formData).map(([name, value]) => (
            <div className={styles['input-container']} key={name}>
              <label htmlFor={`employee-${name}`}>{formatLabel(name)}{name !== 'address2' && name !== 'endDate' ? <text className="requiredText">*</text> : ''}</label>
              <input
                id={`employee-${name}`}
                name={name}
                type={inputTypes[name] || inputTypes.default}
                placeholder={formatLabel(name)}
                value={value}
                onChange={handleChange}
                required={name !== "address2" && name !== "endDate"}
              />
            </div>
          ))}
          <button type="submit">Save</button>
        </form>
      </div>
    </main>
  );
}

