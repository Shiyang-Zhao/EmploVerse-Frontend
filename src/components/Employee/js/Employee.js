import styles from 'components/Employee/css/Employee.module.scss';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { formatLabel } from 'config';
import { API } from 'api/API';

export default function Employee() {
  const { employeeId } = useParams();
  const [employee, setEmployee] = useState(null);
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

  const switchSection = (section) => {
    setActiveSection(section);
  };

  return (
    <main>
      <div className={styles.container}>
        {employee ? (<React.Fragment>
          <div className={`${styles['employee-photo']} ${isLoaded ? styles.loaded : ''}`} onLoad={() => setIsLoaded(true)}>
            <img src={employee.user.profileImage} alt='Employee Profile' loading="lazy" />
          </div>
          <Link to="edit" className={styles['edit-employee-btn']}><i className="fa-regular fa-pen-to-square"></i> Edit Employee</Link>

          <div className={styles['employee-info']}>
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
          </div>
        </React.Fragment>) : (<React.Fragment>Current user is not in the employee system. Join now at <Link to='/emplyees'></Link></React.Fragment>)}
      </div>
    </main>
  );
}
