import styles from 'components/Employee/css/Employee.module.scss';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { formatPath } from 'config';
import { API } from 'api/API';

export default function Employee({ state }) {
  const { employeeId } = useParams();
  const [employee, setEmployee] = useState(null);
  // const selectedEmployeeId = sessionStorage.getItem('selectedEmployeeId');
  const [profileImageFile, setProfileImageFile] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    const getEmployee = async () => {
      let response;
      if (state.cookies.selectedRole[0] === 'ROLE_ADMIN' && employeeId) {
        response = await API.getEmployeeById(employeeId);
      } else {
        response = await API.getCurrentEmployee();
      }
      setEmployee(response.data);
    }
    getEmployee();
  }, [employeeId]);

  useEffect(() => {
    if (employee) {
      setProfileImageFile(formatPath(employee.user.profileImage));
    }
  }, [employee]);

  return (
    <main>
      <div className={styles.container}>
        <div className={`${styles['employee-photo']} ${isLoaded ? styles.loaded : ''}`} onLoad={() => setIsLoaded(true)}>
          <img src={profileImageFile} alt='Employee Profile' loading="lazy" />
        </div>
        <Link to="/employees/edit_employee" className={styles['edit-employee-btn']}><i className="fa-regular fa-pen-to-square"></i> Edit Employee</Link>

        <div className={styles['nav-bar']}>
          <button className={`${styles['nav-btn']} ${styles.personalInfo}`} >Personal Infomation</button>
          <button className={`${styles['nav-btn']} ${styles.employeeInfo}`} >Employee Infomation</button>
          <button className={`${styles['nav-btn']} ${styles.educationInfo}`} >Education Infomation</button>
        </div>

        {employee && (<div className={styles['employee-info']}>
          <h1 className={styles['employee-name']}>{employee.user.firstName} {employee.user.lastName}</h1>

          <div className={`${styles['info-section']} ${styles['personal-info']}`}>
            <h2>Personal Information</h2>
            <div className={styles['info-grid']}>
              <div className={styles['info-item']}>
                <p><strong>User ID</strong></p>
                <p>{employee.user.id}</p>
              </div>
              <div className={styles['info-item']}>
                <p><strong>Employee ID</strong></p>
                <p>{employee.id}</p>
              </div>
              <div className={styles['info-item']}>
                <p><strong>Email</strong></p>
                <p>{employee.user.email}</p>
              </div>
              <div className={styles['info-item']}>
                <p><strong>Phone</strong></p>
                <p>{employee.user.phoneNumber}</p>
              </div>
              <div className={styles['info-item']}>
                <p><strong>Birthday</strong></p>
                <p>{employee.personalInfo.birthday}</p>
              </div>
              <div className={styles['info-item']}>
                <p><strong>Address</strong></p>
                <p>{employee.personalInfo.address1} {employee.personalInfo.address2 ?? ''}, {employee.personalInfo.city}, {employee.personalInfo.state} {employee.personalInfo.zipCode}, {employee.personalInfo.country}</p>
              </div>
            </div>
          </div>

          <div className={`${styles['info-section']} ${styles['company-info']}`}>
            <h2>Company Information</h2>
            <div className={styles['info-grid']}>
              <div className={styles['info-item']}>
                <p><strong>Start Date</strong></p>
                <p>{employee.employeeInfo.startDate}</p>
              </div>
              <div className={styles['info-item']}>
                <p><strong>End Date</strong></p>
                <p>{employee.employeeInfo.endDate}</p>
              </div>
              <div className={styles['info-item']}>
                <p><strong>Department</strong></p>
                <p>{employee.employeeInfo.department}</p>
              </div>
              <div className={styles['info-item']}>
                <p><strong>Supervisor</strong></p>
                <p>{employee.employeeInfo.manager}</p>
              </div>
              <div className={styles['info-item']}>
                <p><strong>Job Titles</strong></p>
                <p>{employee.employeeInfo.jobTitles}</p>
              </div>
              <div className={styles['info-item']}>
                <p><strong>Work Schedule</strong></p>
                <p>{employee.employeeInfo.workSchedule}</p>
              </div>
              <div className={styles['info-item']}>
                <p><strong>Status</strong></p>
                <p>{employee.employeeInfo.status}</p>
              </div>
            </div>
          </div>

          <div className={`${styles['info-section']} ${styles['education-info']}`}>
            <h2>Education Information</h2>
            <div className={styles['info-grid']}>
              <div className={styles['info-item']}>
                <p><strong>University</strong></p>
                <p>{employee.educationInfo.university}</p>
              </div>
              <div className={styles['info-item']}>
                <p><strong>Degree</strong></p>
                <p>{employee.educationInfo.degree}</p>
              </div>
              <div className={styles['info-item']}>
                <p><strong>Major</strong></p>
                <p>{employee.educationInfo.major}</p>
              </div>
            </div>
          </div>
        </div>)}
      </div>
    </main>
  );
}
