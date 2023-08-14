import "../../src/App.css";
import styles from './css/SignUp.module.css';
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import imageCompression from 'browser-image-compression';
import { API_URL, inputTypes, formatLabel } from '../config';

export default function SignUp({ setCookie }) {
  const MAX_FILE_SIZE = 1048576;
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password1: '',
    password2: '',
    phoneNumber: '',
    profileImage: {}
  });

  const [roles, setRoles] = useState(["ROLE_USER"]);
  const [selectedRole, setSelectedRole] = useState(["ROLE_USER"]);

  const handleChange = async (event) => {
    const { name, value, files } = event.target;
    // If the input type is 'file', update the formData with the selected file if it's within the size limit
    if (event.target.type === 'file' && files.length > 0) {
      const file = files[0];
      // Check if the file size exceeds the maximum allowed size
      if (file.size > MAX_FILE_SIZE) {
        try {
          // Compress the image using browser-image-compression
          const compressedBlob = await imageCompression(file, {
            maxSizeMB: 1, // Set the target file size in MB after compression
          });
          const compressedFile = new File([compressedBlob], file.name, { type: file.type });
          setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: compressedFile,
          }));
        } catch (error) {
          console.error('Error compressing image:', error);
        }
      } else {
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: file,
        }));
      }
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const handleRoleChange = (event) => {
    const parsedRoles = JSON.parse(event.target.value);
    setRoles(parsedRoles);
    setSelectedRole([parsedRoles[0]]); // Set the selectedRole to the first element of the parsedRoles array
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (formData.password1 !== formData.password2) {
        console.log(formData.password1);
        console.log(formData.password2);

        return console.error("Password does not match"); // Return an error message
      }

      const registerResponse = await axios.post(
        `${API_URL}/user/register`,
        { ...formData, roles }, {
        headers: {
          'Content-Type': 'multipart/form-data', // Set the correct Content-Type for multipart form data
        }
      });

      const authenticateResponse = await axios.post(
        `${API_URL}/user/authenticate`,
        {
          usernameOrEmail: formData.username,
          password: formData.password1,
          roles: selectedRole,
        }
      );
      setCookie("jwt", `Bearer ${authenticateResponse.data.token}`);
      setCookie("selectedRole", authenticateResponse.data.roles);
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>Welcome Back</h1>
          <p>Sign up</p>
        </div>
        <form className={styles.signUpForm} onSubmit={handleSubmit}>
          {Object.entries(formData).map(([name, value]) => (
            <div className={styles.inputContainer}>
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
          <div className={styles.inputContainer} key="roles">
            <label htmlFor="user-roles">Role</label>
            <select id="roles" name="roles" defaultValue={JSON.stringify(['ROLE_USER'])} onChange={handleRoleChange}>
              <option value={JSON.stringify(['ROLE_ADMIN', 'ROLE_MANAGER', 'ROLE_USER'])}>Administrator</option>
              <option value={JSON.stringify(['ROLE_MANAGER', 'ROLE_USER'])}>Manager</option>
              <option value={JSON.stringify(['ROLE_USER'])}>User</option>
            </select>
          </div>
          <div className={styles.buttonContainer}>
            <button type="submit">Sign Up</button>
          </div>
        </form>
      </div>
    </main>
  );
}