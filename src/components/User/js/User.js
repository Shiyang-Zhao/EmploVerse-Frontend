import styles from 'components/User/css/User.module.scss';
import React, { useState, useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { formatPath, compressImage } from 'config';
import { API } from 'api/API';

export default function User({ state }) {
  const { id } = useParams();
  const imageInputRef = useRef();
  const [user, setUser] = useState(null);
  const [profileImageFile, setProfileImageFile] = useState(null);
  const [newProfileImageFile, setNewProfileImageFile] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      let response;
      if (state.cookies.selectedRole[0] === 'ROLE_ADMIN' && id) {
        response = await API.getUserById(id);
      } else {
        response = await API.getCurrentUser();
      }
      setUser(response.data);
      setProfileImageFile(formatPath(response.data.profileImage));
    }
    getUser();
  }, [])

  const handleProfileImageChange = async (event) => {
    const { files } = event.target;
    if (event.target.type === 'file' && files.length > 0) {
      const file = await compressImage(files[0], 1);
      setNewProfileImageFile(file);
      setProfileImageFile(URL.createObjectURL(file));
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (newProfileImageFile) {
        const Response = await API.updateCurrentUserProfileIamge({ 'newProfileImage': newProfileImageFile });
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <main>
      {user && <div className={styles.container}>
        <div className={`${styles['user-photo']} ${isLoaded ? styles.loaded : ''}`} onLoad={() => setIsLoaded(true)}>
          <img src={profileImageFile} alt='User Profile' loading="lazy" onClick={() => imageInputRef.current.click()} />
        </div>

        <form className={styles.profileImageForm} onSubmit={handleSubmit}>
          <input ref={imageInputRef} className={styles['image-input']} type="file" accept="image/*" onChange={handleProfileImageChange} />
          {newProfileImageFile ? <button type="submit" className={`${styles['update-profile-image-btn']} ${styles['slide-in']}`}><i className="fa-solid fa-upload"></i> Upload</button> : null}
        </form>
        <Link to="edit" className={styles['edit-user-btn']}><i className="fa-regular fa-pen-to-square"></i> Edit Profile</Link>
        <div className={styles['user-info']}>
          <h1 className={styles['user-name']}>{user.firstName} {user.lastName}</h1>
          <section className={`${styles['personal-info']} ${styles['grid-section']}`}>
            <h2 className={styles['section-title']}>Personal Information</h2>
            <div className={styles['section-content']}>
              <div className={styles['grid-item']} title={user.id}>
                <strong>User ID</strong>
                <p>{user.id}</p>
              </div>
              <div className={styles['grid-item']} title={user.username}>
                <strong>Username</strong>
                <p>{user.username}</p>
              </div>
              <div className={styles['grid-item']} title={user.email}>
                <strong>Email</strong>
                <p>{user.email}</p>
              </div>
              <div className={styles['grid-item']} title={user.phoneNumber}>
                <strong>Phone Number</strong>
                <p>{user.phoneNumber}</p>
              </div>
            </div>
          </section>
        </div>
      </div>}
    </main>
  );
}
