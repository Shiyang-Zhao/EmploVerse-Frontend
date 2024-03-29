import styles from "components/Employee/css/EmployeeList.module.scss";
import Footer from "components/Others/js/Footer";
import React, { useState, useEffect, useCallback, useContext } from "react";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { CSVLink } from "react-csv";
import { API } from 'api/API';
import UserContext from "components/Authentication/js/UserProvider";

export default function EmployeeList({ state }) {
  const navigate = useNavigate();
  const { auth } = useContext(UserContext);
  const [allEmployeesList, setAllEmployeesList] = useState([]);

  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    pageSize: 5,
    sortField: 'id',
    sortDir: 'asc',
    employeeList: []
  })

  const [search, setSearch] = useState({
    keyword: '',
    searchField: 'id',
    searchResult: []
  })

  useEffect(() => {
    getPaginatedEmployeesList();
  }, [pagination.currentPage, pagination.sortField, pagination.sortDir]);

  useEffect(() => {
    getAllEmployeesList();
  }, []);

  // Update the pagination state
  const changePagination = (changes) => {
    setPagination((prevPagination) => ({
      ...prevPagination,
      ...changes
    }));
  };

  // Update the search state
  const changeSearch = (changes) => {
    setSearch((prevSearch) => ({
      ...prevSearch,
      ...changes
    }));
  };

  //Handle page change
  const handlePageChange = ({ selected: selectedPage }) => {
    changePagination({ 'currentPage': selectedPage + 1 });
  };

  //Toggle sort direction
  const handleSort = async (event) => {
    try {
      changePagination({
        sortField: event.target.className,
        sortDir: pagination.sortDir === 'asc' ? 'desc' : 'asc'
      })
    } catch (error) {
      console.error("Error fetching pagination:", error);
    }
  };

  //Get all employees
  const getAllEmployeesList = async () => {
    try {
      const response = await API.getAllEmployees();
      setAllEmployeesList(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  //Get paginated employees
  const getPaginatedEmployeesList = async () => {
    try {
      const response = await API.getPaginatedEmployees(pagination);
      console.log(response.data);
      changePagination({
        'totalPages': response.data.totalPages,
        'totalItems': response.data.totalItems,
        'employeeList': response.data.employeeList
      });

    } catch (error) {
      console.error("Error fetching pagination:", error);
    }
  };

  //Handle search function
  const getSearchResult = async () => {
    try {
      const response = await API.searchEmployees(search);
      changeSearch({ 'searchResult': response.data });
      console.log(response.data)
    } catch (error) {
      console.error("Error fetching all employee list:", error);
    }
  };

  const addCurrentUserToEmployees = async () => {
    try {
      const response = await API.addCurrentUserToEmployee();
      getPaginatedEmployeesList();
    } catch (error) {
      console.error("Failto add current user to employees:", error);
    }
  };

  //Handle edit employees
  const editEmployee = (employee, event) => {
    event.stopPropagation();
    try {
      navigate(`employee/${employee.id}/edit`);
    } catch (error) {
      console.error("Error editing employee:", error);
    }
  };

  //Handle delete employee
  const deleteEmployee = useCallback(async (employee, event) => {
    event.stopPropagation();
    try {
      const response = await API.deleteEmployeeById(employee.id);
      getPaginatedEmployeesList();
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  }, []);

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.filter}>
          <div className={styles.searchBar}>
            <input
              type="text"
              placeholder="Search"
              defaultValue=""
              className={styles.searchInput}
              onChange={(event) => {
                changeSearch({ 'keyword': event.target.value });
              }}
            />
          </div>
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
            <option value="email">Email</option>
            <option value="phoneNumber">Phone Number</option>
            <option value="jobTitles">Job Titles</option>
            <option value="department">Department</option>
            <option value="supervisor">Supervisor</option>
            <option value="status">Status</option>
            <option value="degree">Degree</option>
            <option value="major">Major</option>
          </select>
          <i className={`fa-solid fa-magnifying-glass fa-xl ${styles.searchIcon}`} onClick={getSearchResult}></i>
        </div>

        <div className={styles.addExport}>
          {!auth.isAdmin && !auth.isManager ? (<button className={styles.addButton} onClick={addCurrentUserToEmployees}>Join</button>) : (<button className={styles.addButton} onClick={() => navigate("add")}>Add</button>)}
          <button key="export-button" className={styles.exportButton}>
            <CSVLink
              className={styles.exportLink}
              onClick={getAllEmployeesList}
              data={allEmployeesList}
              filename="Employees.csv"
              target="_blank"
            >
              Export
            </CSVLink>
          </button>
        </div>

        <table className={styles.EmployeeListTable}>
          <thead>
            <tr>
              <th>
                <span className="id" onClick={(event) => handleSort(event)}>
                  ID
                </span>
              </th>
              <th>
                <span className="profileImage">
                  {/* Employee */}
                </span>
              </th>
              <th><span className="firstName" onClick={(event) => handleSort(event)}>First Name</span></th>
              <th><span className="lastName" onClick={(event) => handleSort(event)}>Last Name</span></th>
              <th><span className="username" onClick={(event) => handleSort(event)}>Username</span></th>
              <th><span className="email" onClick={(event) => handleSort(event)}>Email</span></th>
              <th><span className="phoneNumber" onClick={(event) => handleSort(event)}>Phone Number</span></th>
              <th>Actions</th>
              <th><span className="department" onClick={(event) => handleSort(event)}>Department</span></th>
              <th><span className="jobTitles" onClick={(event) => handleSort(event)}>Job Titles</span></th>
            </tr>
          </thead>
          <tbody>
            {pagination.employeeList &&
              pagination.employeeList.map((employee) => (
                <React.Fragment key={employee.id}>
                  <tr
                    className={styles.information}
                    key={employee.id}
                    onClick={() => {
                      navigate(`employee/${employee.id}`);
                    }}
                  >
                    <td>{employee.id}</td>
                    <td><img src={employee.user.profileImage} className={`rounded-circle img-fluid img-thumbnail ${styles.employeeImage}`} /></td>
                    <td>{employee.user.firstName}</td>
                    <td>{employee.user.lastName}</td>
                    <td>{employee.user.username}</td>
                    <td>{employee.user.email}</td>
                    <td>{employee.user.phoneNumber}</td>
                    <td>
                      <i className={`${styles['Edit']} fas fa-edit fa-xl`} onClick={(event) => editEmployee(employee, event)}></i>
                      <i className={`${styles['Delete']} fa-solid fa-trash fa-xl`} onClick={(event) => deleteEmployee(employee, event)}></i>
                    </td>
                    <td>{employee.employeeInfo.department}</td>
                    <td>{employee.employeeInfo.jobTitles}</td>
                  </tr>
                </React.Fragment>
              ))}
          </tbody>
        </table>
        <ReactPaginate
          className={styles.pagination}
          breakLabel="..."
          nextLabel={"Next"}
          onPageChange={handlePageChange}
          pageRangeDisplayed={5}
          pageCount={pagination.totalPages}
          previousLabel={"Previous"}
          pageClassName={styles.page}
          renderOnZeroPageCount={null}
        />
      </div>
      <Footer />
    </main>
  );
}
