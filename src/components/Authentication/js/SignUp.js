import styles from 'components/Authentication/css/SignUp.module.scss';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { inputTypes, formatLabel, compressImage } from 'config';
import UserContext from './UserProvider';

export default function SignUp() {
  const navigate = useNavigate();
  const { signup } = useContext(UserContext);
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
    if (event.target.type === 'file' && files.length > 0) {
      const file = await compressImage(files[0], 1);
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: file,
      }));
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
        return console.error("Password does not match"); // Return an error message
      }
      console.log(formData)
      await signup({ ...formData, roles });
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