import styles from 'components/Employee/css/EditEmployee.module.scss';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { inputTypes, formatLabel, formatDateFromArray } from 'config';
import { API } from 'api/API';

export default function EditEmployee({ state }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const selectedEmployeeId = sessionStorage.getItem('selectedEmployeeId');

  useEffect(() => {
    const getEmployee = async () => {
      try {
        console.log("Selected Employee ID:", selectedEmployeeId);
        const response = await API.getEmployeeById(selectedEmployeeId);
        const { id, ...FormData } = response.data;
        setFormData(FormData);
        console.log(FormData)
      } catch (error) {
        console.log(error);
      }
    }
    getEmployee();
  }, [selectedEmployeeId]);

  const handleChange = (event, sectionName, name) => {
    const { value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [sectionName]: {
        ...prevFormData[sectionName],
        [name]: value,
      },
    }));
    console.log(value)
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await API.updateEmployeeById(selectedEmployeeId, formData);
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
                    value={inputTypes[name] === 'date' ? formatDateFromArray(value) : value}
                    onChange={(event) => handleChange(event, sectionName, name)}
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