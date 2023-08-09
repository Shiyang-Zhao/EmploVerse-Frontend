import "../../src/App.css";
import styles from './css/User.module.css';
import React, { useState, useEffect, lazy } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { API_URL, ScrollToTop, formatPath } from '../config';

export default function User({ state }) {
  ScrollToTop();
  const [user, setUser] = useState({});
  const [profileImageFile, setProfileImageFile] = useState();

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get(`${API_URL}/user/getCurrentUser`,
          {
            headers: {
              'Authorization': state.cookies.jwt
            }
          });
        setUser(response.data);
        console.log(response.data);
        const imagePath = response.data.profileImagePath;
        import(`../${formatPath(imagePath)}`).then(imageModule => {
          setProfileImageFile(imageModule.default)
        })
      } catch (error) {
        console.log(error);
      }
    };
    getUser();


  }, [state.cookies.username]);


  return (
    <main>
      <div className={styles.container}>
        <div className={styles['user-photo']}><img src={profileImageFile} alt='User Profile Image' /></div>
        <Link to="edituser" className={styles.button}>Edit Profile</Link>
        <div className={styles['user-info']}>
          <h1 className={styles['user-name']}>{user.firstName} {user.lastName}</h1>
          <section className={`${styles['personal-info']} ${styles['grid-section']}`}>
            <h2 className={styles['section-title']}>Personal Information</h2>
            <div className={styles['section-content']}>
              <div className={styles['grid-item']}>
                <strong>User ID</strong>
                <p>{user.id}</p>
              </div>
              <div className={styles['grid-item']}>
                <strong>Username</strong>
                <p>{user.username}</p>
              </div>
              <div className={styles['grid-item']}>
                <strong>Email</strong>
                <p>{user.email}</p>
              </div>
              <div className={styles['grid-item']}>
                <strong>Phone Number</strong>
                <p>{user.phoneNumber}</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
