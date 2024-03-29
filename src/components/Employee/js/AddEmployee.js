import styles from 'components/Employee/css/AddEmployee.module.scss';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { formatLabel, inputTypes } from 'config';
import { API } from 'api/API';

export default function AddEmployee({ state }) {
  const navigate = useNavigate();
  const [targetUser, setTargetUser] = useState({});
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

  const [salaryInfo, setSalaryInfo] = useState({
    amount: null,
    payFrequency: '',
    bonus: null,
    taxDeduction: null,
    overtimeHours: null,
    overtimeRate: null,
    deductions: '',
    insuranceCoverage: '',
  });

  const [activeSection, setActiveSection] = useState(personalInfo);

  const switchSection = (section) => {
    setActiveSection(section);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setActiveSection((prevActiveSection) => ({
      ...prevActiveSection,
      [name]: value,
    }));
  };

  const changeSearch = (changes) => {
    setSearch((prevSearch) => ({
      ...prevSearch,
      ...changes
    }));
  };

  const getSearchResult = async () => {
    try {
      const response = await API.searchUsers(search);
      changeSearch({ 'searchResult': response.data });
    } catch (error) {
      console.error("Error fetching all user list:", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log({ 'user': targetUser, 'personalInfo': personalInfo, 'employeeInfo': employeeInfo, 'educationInfo': educationInfo, 'salaryInfo': salaryInfo })
      const response = await API.createEmployee({ 'user': targetUser, 'personalInfo': personalInfo, 'employeeInfo': employeeInfo, 'educationInfo': educationInfo, 'salaryInfo': salaryInfo });
      navigate('/employees');
    } catch (error) {
      console.error("Error adding the employee:", error);
    }
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
              <img src={user.profileImage} alt="Profile" />
              <div className={styles.userInfo}>
                <p>ID: {user.id}</p>
                <p>Username: {user.username}</p>
                <p>Email: {user.email}</p>
              </div>
            </button>
          ))}
        </div>

        <div className={styles['nav-bar']}>
          <button className={`${styles['nav-btn']} ${styles.personalInfo}`} onClick={() => switchSection(personalInfo)}>Personal</button>
          <button className={`${styles['nav-btn']} ${styles.employeeInfo}`} onClick={() => switchSection(employeeInfo)}>Employee</button>
          <button className={`${styles['nav-btn']} ${styles.educationInfo}`} onClick={() => switchSection(educationInfo)}>Education</button>
          <button className={`${styles['nav-btn']} ${styles.salaryInfo}`} onClick={() => switchSection(salaryInfo)}>Salary</button>
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

