import './components.css';
import img from '../videos/photo.jpg';
import styles from './css/User.module.css';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../config';

export default function User({ state }) {
  const [user, setUser] = useState({});

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get(`${API_URL}/user/getUserByEmail/${state.cookies.email}`,
          {
            headers: {
              'Authorization': state.cookies.jwt
            }
          });
        console.log(response.data);
        setUser(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [state.cookies.email]);

  return (
    <main>
      <div className={styles.container}>
        <div className={styles['user-photo']}><img src={img} alt="User" /></div>
        <Link to="edituser" className={styles.button}>Edit Profile</Link>
        <div className={styles['user-info']}>
          <h1 className={styles['user-name']}>{user.firstName} {user.lastName}</h1>
          <section className={`${styles['personal-info']} ${styles['grid-section']}`}>
            <h2 className={styles['section-title']}>Personal Information</h2>
            <div className={styles['section-content']}>
              <div className={styles['grid-item']}>
                <strong>Email</strong>
                <p>{user.email}</p>
              </div>
              <div className={styles['grid-item']}>
                <strong>Phone</strong>
                <p>{user.phoneNumber}</p>
              </div>
              <div className={styles['grid-item']}>
                <strong>Birthday</strong>
                <p>{user.birthday}</p>
              </div>
              <div className={styles['grid-item']}>
                <strong>Address</strong>
                <p>
                  {user.address1} {user.address2 ?? ''}, {user.city}, {user.state} {user.zipCode}, {user.country}
                </p>
              </div>
            </div>
          </section>

          <section className={`${styles['employment-info']} ${styles['grid-section']}`}>
            <h2 className={styles['section-title']}>Employment Information</h2>
            <div className={styles['section-content']}>
              <div className={styles['grid-item']}>
                <strong>Company</strong>
                <p>{user.company}</p>
              </div>
              <div className={styles['grid-item']}>
                <strong>Start Date</strong>
                <p>{user.startDate}</p>
              </div>
              <div className={styles['grid-item']}>
                <strong>End Date</strong>
                <p>{user.endDate}</p>
              </div>
              <div className={styles['grid-item']}>
                <strong>Department</strong>
                <p>{user.department}</p>
              </div>
              <div className={styles['grid-item']}>
                <strong>Supervisor</strong>
                <p>{user.supervisor}</p>
              </div>
              <div className={styles['grid-item']}>
                <strong>Job Titles</strong>
                <p>{user.jobTitles}</p>
              </div>
              <div className={styles['grid-item']}>
                <strong>Work Schedule</strong>
                <p>{user.workSchedule}</p>
              </div>
              <div className={styles['grid-item']}>
                <strong>Status</strong>
                <p>{user.status}</p>
              </div>
            </div>
          </section>

          <section className={`${styles['education-info']} ${styles['grid-section']}`}>
            <h2 className={styles['section-title']}>Education Information</h2>
            <div className={styles['section-content']}>
              <div className={styles['grid-item']}>
                <strong>University</strong>
                <p>{user.university}</p>
              </div>
              <div className={styles['grid-item']}>
                <strong>Degree</strong>
                <p>{user.degree}</p>
              </div>
              <div className={styles['grid-item']}>
                <strong>Major</strong>
                <p>{user.major}</p>
              </div>
            </div>
          </section>


        </div>
      </div>
    </main>
  );
}
