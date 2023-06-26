import './components.css';
import img from '../videos/photo.jpg';
import styles from './css/Employee.module.css';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../config';

export default function Employee({ state }) {
  const navigate = useNavigate();
  const [employee, setEmployee] = useState({});
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
        setEmployee(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    getEmployee();
  }, [selectedEmployeeId]);

  return (
    <main>
      <div className={styles.container}>
        <div className={styles['employee-photo']}>
          <img src={img} alt='Employee Photo' />
        </div>
        <div className={styles['employee-info']}>
          <h1 className={styles['employee-name']}>{employee.firstName} {employee.lastName}</h1>

          <div className={`${styles['info-section']} ${styles['personal-info']}`}>
            <h2>Personal Information</h2>
            <div className={styles['info-grid']}>
              <div className={styles['info-item']}>
                <p><strong>Employee ID:</strong></p>
                <p>{employee.id}</p>
              </div>
              <div className={styles['info-item']}>
                <p><strong>Email:</strong></p>
                <p>{employee.email}</p>
              </div>
              <div className={styles['info-item']}>
                <p><strong>Phone:</strong></p>
                <p>{employee.phoneNumber}</p>
              </div>
              <div className={styles['info-item']}>
                <p><strong>Birthday:</strong></p>
                <p>{employee.birthday}</p>
              </div>
              <div className={styles['info-item']}>
                <p><strong>Address:</strong></p>
                <p>{employee.address1} {employee.address2 ?? ''}, {employee.city}, {employee.state} {employee.zipCode}, {employee.country}</p>
              </div>
            </div>
          </div>

          <div className={`${styles['info-section']} ${styles['company-info']}`}>
            <h2>Company Information</h2>
            <div className={styles['info-grid']}>
              <div className={styles['info-item']}>
                <p><strong>Company:</strong></p>
                <p>{employee.company}</p>
              </div>
              <div className={styles['info-item']}>
                <p><strong>Start Date:</strong></p>
                <p>{employee.startDate}</p>
              </div>
              <div className={styles['info-item']}>
                <p><strong>End Date:</strong></p>
                <p>{employee.endDate}</p>
              </div>
              <div className={styles['info-item']}>
                <p><strong>Department:</strong></p>
                <p>{employee.department}</p>
              </div>
              <div className={styles['info-item']}>
                <p><strong>Supervisor:</strong></p>
                <p>{employee.supervisor}</p>
              </div>
              <div className={styles['info-item']}>
                <p><strong>Job Titles:</strong></p>
                <p>{employee.jobTitles}</p>
              </div>
              <div className={styles['info-item']}>
                <p><strong>Work Schedule:</strong></p>
                <p>{employee.workSchedule}</p>
              </div>
              <div className={styles['info-item']}>
                <p><strong>Status:</strong></p>
                <p>{employee.status}</p>
              </div>
            </div>
          </div>

          <div className={`${styles['info-section']} ${styles['education-info']}`}>
            <h2>Education Information</h2>
            <div className={styles['info-grid']}>
              <div className={styles['info-item']}>
                <p><strong>University:</strong></p>
                <p>{employee.university}</p>
              </div>
              <div className={styles['info-item']}>
                <p><strong>Degree:</strong></p>
                <p>{employee.degree}</p>
              </div>
              <div className={styles['info-item']}>
                <p><strong>Major:</strong></p>
                <p>{employee.major}</p>
              </div>
            </div>
          </div>

          <button className={styles.button} onClick={() => {
            if (state.cookies.selectedRole[0] !== 'ROLE_ADMIN' && state.cookies.selectedRole[0] !== 'ROLE_MANAGER') {
              alert("You don't have the privileges to edit employees");
            } else {
              navigate('/employees/editemployee');
            }
          }}>Edit</button>
        </div>
      </div>
    </main>
  );
}
