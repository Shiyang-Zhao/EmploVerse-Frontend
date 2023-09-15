import styles from "components/User/css/EditUser.module.scss";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { inputTypes, formatLabel } from "config";
import { API } from 'api/API';

export default function EditUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const getFormData = async () => {
      let response;
      if (id) {
        response = await API.getUserById(id);
      } else {
        response = await API.getCurrentUser();
      }
      const { id, roles, profileImage, ...FormData } = response.data;
      setFormData(FormData);
    }
    getFormData();
  }, [id])

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let response;
    if (id) {
      response = await API.updateUserById(id, formData);
      navigate(`users/user/${id}`);
    } else {
      response = await API.updateCurrentUser(formData);
      navigate("current_user");
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
