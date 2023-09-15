import styles from "components/User/css/EditUser.module.scss";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { inputTypes, formatLabel } from "config";
import { API } from 'api/API';

export default function EditUser() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const getFormData = async () => {
      const response = await API.getCurrentUser();
      const { id, roles, profileImage, ...FormData } = response.data;
      setFormData(FormData);
    }
    getFormData();
  }, [])

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
      const response = await API.updateCurrentUser(formData);
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
                value={value}
                onChange={handleChange}
                required
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
