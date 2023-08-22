import "App.css";
import styles from 'components/Employee/css/EditEmployee.module.css';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL, inputTypes, formatLabel } from 'config';

export default function EditEmployee({ state }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const selectedEmployeeId = sessionStorage.getItem('selectedEmployeeId');

  useEffect(() => {
    const getEmployee = async () => {
      try {
        console.log("Selected Employee ID:", selectedEmployeeId);
        const response = await axios.get(`${API_URL}/employees/getEmployeeById/${selectedEmployeeId}`, {
          headers: {
            'Authorization': state.cookies.jwt
          }
        });
        setFormData(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    getEmployee();
  }, [selectedEmployeeId]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const updatedEmployee = formData;
      await axios.post(`${API_URL}/employees/updateEmployeeById/${selectedEmployeeId}`, updatedEmployee, {
        headers: {
          'Authorization': state.cookies.jwt
        }
      });
      navigate('/employees');
    } catch (error) {
      console.error('Error updating employee:', error);
    }
  };

  return (
    <main>
      <div className={styles.container}>
        <h2>Employee Details</h2>
        <form className={styles.editEmployeeForm} onSubmit={handleSubmit}>
          {Object.entries(formData).map(([sectionName, sectionData]) => (
            Object.entries(sectionData).map(([name, value]) => (
              name !== 'id' && name !== 'roles' && name !== 'profileImage' && (
                <div className={styles['input-container']} key={name}>
                  <label htmlFor={`employee-${name}`}>{formatLabel(name)}</label>
                  <input
                    id={`employee-${name}`}
                    name={name}
                    type={inputTypes[name] || inputTypes.default}
                    placeholder={formatLabel(name)}
                    value={value}
                    onChange={handleChange}
                  />
                </div>
              )
            ))
          ))}
          <button type="submit">Save</button>
        </form>
      </div>
    </main>
  );
}