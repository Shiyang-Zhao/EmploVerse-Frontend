////import "App.css";
import styles from 'components/Employee/css/AddEmployee.module.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL, formatLabel, inputTypes, formatPath } from 'config';
import { useEffect } from "react";

export default function AddEmployee({ state }) {
  const navigate = useNavigate();
  const [targetUser, setTargetUser] = useState({});
  const [profileImageFile, setProfileImageFile] = useState('');
  const [search, setSearch] = useState({
    keyword: '',
    searchField: 'id',
    searchResult: []
  })

  const [personalInfo, setPersonalInfo] = useState({
    gender: '',
    birthday: null,
    citizenship: '',
    ssn: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
  });
  const [employeeInfo, setEmployeeInfo] = useState({
    startDate: null,
    endDate: null,
    employmentType: '',
    department: '',
    manager: '',
    jobTitles: '',
    workLocation: '',
    workSchedule: '',
    status: '',
    salaryInfo: {
    }
  });
  const [educationInfo, setEducationInfo] = useState({
    university: '',
    degree: '',
    major: '',
    gpa: ''
  });

  const [activeSection, setActiveSection] = useState(personalInfo);

  useEffect(() => {
    // Load profile images for search results
    search.searchResult.forEach((user) => {
      setProfileImageFile(formatPath(user.profileImage));
    });
  }, [search.searchResult]);

  const switchSection = (section) => {
    setActiveSection(section);
    console.log(activeSection)
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setActiveSection((prevActiveSection) => ({
      ...prevActiveSection,
      [name]: value,
    }));
  };

  // Update the search state
  const changeSearch = (changes) => {
    setSearch((prevSearch) => ({
      ...prevSearch,
      ...changes
    }));
  };

  //Handle search function
  const getSearchResult = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/user/searchUsers?keyword=${search.keyword}&searchField=${search.searchField}`,
        {
          headers: {
            'Authorization': state.cookies.jwt,
          },
        }
      );
      changeSearch({ 'searchResult': response.data });
    } catch (error) {
      console.error("Error fetching all user list:", error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({ 'user': targetUser, 'personalInfo': personalInfo, 'employeeInfo': employeeInfo, 'educationInfo': educationInfo })
    const response = axios.post(`${API_URL}/employees/createEmployee`, { 'user': targetUser }, {
      headers: {
        'Authorization': state.cookies.jwt
      }
    })
      .then(() => {
        navigate('/employees');
      });
  };

  return (
    <main>
      <div className={styles.container}>
        <h2>Employee Details</h2>
        <button className={styles['link-account-btn']}>Link an account</button>
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search user"
            className={styles.searchInput}
            onChange={(event) => {
              changeSearch({ 'keyword': event.target.value });
            }}
          />
          <select
            className={styles.searchField}
            defaultValue="id"
            onChange={(event) => {
              changeSearch({ 'searchField': event.target.value });
            }}
          >
            <option value="id">ID</option>
            <option value="firstName">First Name</option>
            <option value="lastName">Last Name</option>
            <option value="username">Username</option>
            <option value="email">Email</option>
            <option value="phoneNumber">Phone Number</option>
          </select>
          <i className={`fa-solid fa-magnifying-glass fa-xl ${styles.searchIcon}`} onClick={getSearchResult}></i>
        </div>
        <div className={styles.searchResultsContainer}>
          {search.searchResult && search.searchResult.map((user) => (
            <button className={styles.searchResult} key={user.id} onClick={() => setTargetUser(user)}>
              <img src={profileImageFile} alt="Profile" />
              <div className={styles.userInfo}>
                <p>ID: {user.id}</p>
                <p>Username: {user.username}</p>
                <p>Email: {user.email}</p>
              </div>
            </button>
          ))}
        </div>


        <div className={styles['nav-bar']}>
          <button className={`${styles['nav-btn']} ${styles.personalInfo}`} onClick={() => switchSection(personalInfo)}>Personal Infomation</button>
          <button className={`${styles['nav-btn']} ${styles.employeeInfo}`} onClick={() => switchSection(employeeInfo)}>Employee Infomation</button>
          <button className={`${styles['nav-btn']} ${styles.educationInfo}`} onClick={() => switchSection(educationInfo)}>Education Infomation</button>
        </div>



        <form className={styles.addEmployeeForm} onSubmit={handleSubmit}>
          {Object.entries(activeSection).map(([name, value]) => (
            <div className={styles['input-container']} key={name}>
              <label htmlFor={`employee-${name}`}>{name === 'ssn' || name === 'gpa' ? name.toUpperCase() : formatLabel(name)}</label>
              <input
                id={`employee-${name}`}
                name={name}
                type={inputTypes[name] || inputTypes.default}
                placeholder={formatLabel(name)}
                value={value}
                onChange={handleChange}
              />
            </div>
          ))}
          <button type="submit">Save</button>
        </form>
      </div>
    </main>
  );
}

