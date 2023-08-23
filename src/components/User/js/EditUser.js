//import "App.css";
import styles from "components/User/css/EditUser.module.css";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL, inputTypes, formatLabel } from "config";

export default function EditUser({ state }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    const { id, roles, profileImage, ...FormData } = user;
    setFormData(FormData);
  }, []);

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
      await axios.post(
        `${API_URL}/user/updateCurrentUser`,
        formData,
        {
          headers: {
            Authorization: state.cookies.jwt,
          },
        }
      );
      navigate("/user");
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <main>
      <div className={styles.container}>
        <h2>User Details</h2>
        <form className={styles.inputContainer} onSubmit={handleSubmit}>
          {Object.entries(formData).map(([name, value]) => (
            <div className={styles["input-container"]} key={name}>
              <label htmlFor={`user-${name}`}>{formatLabel(name)}</label>
              <input
                id={`user-${name}`}
                name={name}
                type={inputTypes[name] || inputTypes.default}
                placeholder={formatLabel(name)}
                {...(inputTypes[name] === 'file' ? { accept: "image/*" } : '')}
                {...(inputTypes[name] === 'file' ? '' : { value: value })}
                onChange={handleChange}
                {...(inputTypes[name] === 'file' ? '' : { required: true })}
              />
            </div>
          ))}
          <div className={styles.buttonContainer}>
            <button type="submit">Save</button>
          </div>
        </form>
      </div>
    </main>
  );
}
