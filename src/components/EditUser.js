import "../../src/App.css";
import styles from "./css/EditUser.module.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL, inputTypes, formatLabel } from "../config";

export default function EditUser({ state }) {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [formData, setFormData] = useState({});
  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/user/getUserByEmail/${state.cookies.email}`,
          {
            headers: {
              Authorization: state.cookies.jwt,
            },
          }
        );
        const { id, roles, ...formData } = response.data;
        setUser(response.data);
        setFormData(formData);
      } catch (error) {
        console.log(error);
      }
    };

    getUser();
  }, [state.cookies.email, state.cookies.jwt]);

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
      const updatedUser = { ...user, ...formData };
      await axios.post(
        `${API_URL}/user/updateUserByEmail/${user.email}`,
        updatedUser,
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
        <form className={styles.editUserForm} onSubmit={handleSubmit}>
          {Object.entries(formData).map(([name, value]) => (
            <div className={styles["input-container"]} key={name}>
              <label htmlFor={`user-${name}`}>{formatLabel(name)}{name !== 'address2' && name !== 'endDate' ? <text className="requiredText">*</text> : ''}</label>
              <input
                id={`user-${name}`}
                name={name}
                type={inputTypes[name] || inputTypes.default}
                placeholder={formatLabel(name)}
                value={value}
                onChange={handleChange}
                required={name !== "address2" && name !== "endDate"}
              />
            </div>
          ))}
          <button type="submit">Save</button>
        </form>
      </div>
    </main>
  );
}
