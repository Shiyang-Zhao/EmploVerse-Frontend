////import "App.scss";
import styles from 'components/Employee/css/Employee.module.scss';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { formatPath } from 'config';
import { API } from 'api/API';

export default function Employee({ state }) {
    const navigate = useNavigate();
    const [employee, setEmployee] = useState(null);
    const [currentEmployee, setCurrentEmployee] = useState(null);
    const [profileImageFile, setProfileImageFile] = useState();
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const getEmployee = async () => {
            try {
                const response = await API.getCurrentEmployee();
                setEmployee(response.data);
                console.log(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        getEmployee();
    }, [state]);

    useEffect(() => {
        const getCurrentEmployee = async () => {
            try {
                if (employee) {
                    console.log(employee.id)
                    const response = await API.getEmployeeById(employee.id);
                    setCurrentEmployee(response.data)
                    setProfileImageFile(formatPath(response.data.user.profileImage))
                    console.log(response.data);
                }
            } catch (error) {
                console.log(error);
            }
        }
        getCurrentEmployee();
    }, [employee]);

    return (
        <main>
            <div className={styles.container}>
                {currentEmployee && (<React.Fragment>
                    <div className={`${styles['employee-photo']} ${isLoaded ? styles.loaded : ''}`} onLoad={() => setIsLoaded(true)}>
                        <img src={profileImageFile} alt='Employee Profile' loading="lazy" />
                    </div>
                    <Link to="/employees/editemployee" className={styles['edit-employee-btn']}>
                        <i className="fa-regular fa-pen-to-square"></i> Edit Employee
                    </Link>
                    <div className={styles['nav-bar']}>
                        <button className={`${styles['nav-btn']} ${styles.personalInfo}`}>Personal Information</button>
                        <button className={`${styles['nav-btn']} ${styles.employeeInfo}`}>Employee Information</button>
                        <button className={`${styles['nav-btn']} ${styles.educationInfo}`}>Education Information</button>
                    </div>


                    <div className={styles['employee-info']}>
                        <h1 className={styles['employee-name']}>{currentEmployee.user.firstName} {currentEmployee.user.lastName}</h1>

                        <div className={`${styles['info-section']} ${styles['personal-info']}`}>
                            <h2>Personal Information</h2>
                            <div className={styles['info-grid']}>
                                <div className={styles['info-item']}>
                                    <p><strong>Employee ID</strong></p>
                                    <p>{currentEmployee.id}</p>
                                </div>
                                <div className={styles['info-item']}>
                                    <p><strong>Username</strong></p>
                                    <p>{currentEmployee.user.username}</p>
                                </div>
                                <div className={styles['info-item']}>
                                    <p><strong>Email</strong></p>
                                    <p>{currentEmployee.user.email}</p>
                                </div>
                                <div className={styles['info-item']}>
                                    <p><strong>Phone</strong></p>
                                    <p>{currentEmployee.user.phoneNumber}</p>
                                </div>
                                <div className={styles['info-item']}>
                                    <p><strong>Birthday</strong></p>
                                    <p>{currentEmployee.personalInfo.birthday}</p>
                                </div>
                                <div className={styles['info-item']}>
                                    <p><strong>Address</strong></p>
                                    <p>{currentEmployee.personalInfo.address1} {currentEmployee.personalInfo.address2 ?? ''}, {currentEmployee.personalInfo.city}, {currentEmployee.personalInfo.state} {currentEmployee.personalInfo.zipCode}, {currentEmployee.personalInfo.country}</p>
                                </div>
                            </div>
                        </div>

                        <div className={`${styles['info-section']} ${styles['company-info']}`}>
                            <h2>Company Information</h2>
                            <div className={styles['info-grid']}>
                                <div className={styles['info-item']}>
                                    <p><strong>Start Date</strong></p>
                                    <p>{currentEmployee.employeeInfo.startDate}</p>
                                </div>
                                <div className={styles['info-item']}>
                                    <p><strong>End Date</strong></p>
                                    <p>{currentEmployee.employeeInfo.endDate}</p>
                                </div>
                                <div className={styles['info-item']}>
                                    <p><strong>Department</strong></p>
                                    <p>{currentEmployee.employeeInfo.department}</p>
                                </div>
                                <div className={styles['info-item']}>
                                    <p><strong>Supervisor</strong></p>
                                    <p>{currentEmployee.employeeInfo.manager}</p>
                                </div>
                                <div className={styles['info-item']}>
                                    <p><strong>Job Titles</strong></p>
                                    <p>{currentEmployee.employeeInfo.jobTitles}</p>
                                </div>
                                <div className={styles['info-item']}>
                                    <p><strong>Work Schedule</strong></p>
                                    <p>{currentEmployee.employeeInfo.workSchedule}</p>
                                </div>
                                <div className={styles['info-item']}>
                                    <p><strong>Status</strong></p>
                                    <p>{currentEmployee.employeeInfo.status}</p>
                                </div>
                            </div>
                        </div>

                        <div className={`${styles['info-section']} ${styles['education-info']}`}>
                            <h2>Education Information</h2>
                            <div className={styles['info-grid']}>
                                <div className={styles['info-item']}>
                                    <p><strong>University</strong></p>
                                    <p>{currentEmployee.educationInfo.university}</p>
                                </div>
                                <div className={styles['info-item']}>
                                    <p><strong>Degree</strong></p>
                                    <p>{currentEmployee.educationInfo.degree}</p>
                                </div>
                                <div className={styles['info-item']}>
                                    <p><strong>Major</strong></p>
                                    <p>{currentEmployee.educationInfo.major}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </React.Fragment>)}
            </div>
        </main>
    );
}
