import styles from 'components/Employee/css/Employee.module.scss';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { formatPath, formatLabel, inputTypes } from 'config';
import { API } from 'api/API';

export default function Employee({ state }) {
  const { employeeId } = useParams();
  const [employee, setEmployee] = useState(null);
  // const selectedEmployeeId = sessionStorage.getItem('selectedEmployeeId');
  const [profileImageFile, setProfileImageFile] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeSection, setActiveSection] = useState(null);
  useEffect(() => {
    const getEmployee = async () => {
      try {
        let response;
        if (employeeId) {
          response = await API.getEmployeeById(employeeId);
        } else {
          response = await API.getCurrentEmployee();
        }
        setEmployee(response.data);
        setActiveSection(response.data.personalInfo);
      } catch (error) {
        console.log(error);
      }
    }
    getEmployee();
  }, [employeeId]);

  useEffect(() => {
    if (employee) {
      setProfileImageFile(formatPath(employee.user.profileImage));
    }
  }, [employee]);

  const switchSection = (section) => {
    setActiveSection(section);
  };

  return (
    <main>
      <div className={styles.container}>
        <div className={`${styles['employee-photo']} ${isLoaded ? styles.loaded : ''}`} onLoad={() => setIsLoaded(true)}>
          <img src={profileImageFile} alt='Employee Profile' loading="lazy" />
        </div>
        <Link to="edit" className={styles['edit-employee-btn']}><i className="fa-regular fa-pen-to-square"></i> Edit Employee</Link>

        {employee && (<div className={styles['employee-info']}>
          <h1 className={styles['employee-name']}>{employee.user.firstName} {employee.user.lastName}</h1>
          <div className={styles['nav-bar']}>
            <button className={`${styles['nav-btn']}`} onClick={() => switchSection(employee.personalInfo)}>Personal Infomation</button>
            <button className={`${styles['nav-btn']}`} onClick={() => switchSection(employee.employeeInfo)}>Employee Infomation</button>
            <button className={`${styles['nav-btn']}`} onClick={() => switchSection(employee.educationInfo)}>Education Infomation</button>
          </div>

          {Object.entries(activeSection).map(([name, value]) => (
            name !== 'id' && (
              <div className={`${styles['input-container']} ${styles['active']}`} key={name}>
                <label htmlFor={`employee-${name}`}>
                  {name === 'ssn' || name === 'gpa' ? name.toUpperCase() : formatLabel(name)}
                </label>
                {name !== 'salaryInfo' && <p>{value}</p>}
              </div>
            )
          ))}
        </div>)}
      </div>
    </main>
  );
}
