import "../../src/App.css";
import { searchIcon } from "../config";
import styles from "./css/EmployeeList.module.css";
import Footer from "./Footer";
import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import axios from "axios";
import { CSVLink } from "react-csv";
import { API_URL, ScrollToTop } from "../config";

export default function EmployeeList({ state }) {
  ScrollToTop();
  const navigate = useNavigate();
  const [allEmployeesList, setAllEmployeesList] = useState([]);

  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    sortField: 'id',
    sortDir: 'asc',
    employeeList: []
  })

  const [search, setSearch] = useState({
    keyword: '',
    searchField: 'id',
    searchResult: []
  })

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

  useEffect(() => {
    getPaginatedEmployeesList();
  }, [pagination.currentPage, pagination.totalItems, pagination.sortField, pagination.sortDir]);

  useEffect(() => {
    getAllEmployeesList();
  }, []);

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
      const response = await axios.get(`${API_URL}/employees/`, {
        headers: {
          Authorization: state.cookies.jwt,
        },
      });
      setAllEmployeesList(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  //Get paginated employees
  const getPaginatedEmployeesList = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/employees/page/${pagination.currentPage}?sortField=${pagination.sortField}&sortDir=${pagination.sortDir}`,
        {
          headers: {
            Authorization: state.cookies.jwt,
          },
        }
      );
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
      const response = await axios.get(
        `${API_URL}/employees/searchEmployees?keyword=${search.keyword}&searchField=${search.searchField}`,
        {
          headers: {
            Authorization: state.cookies.jwt,
          },
        }
      );
      changeSearch({ 'searchResult': response.data });
    } catch (error) {
      console.error("Error fetching all employee list:", error);
    }
  };

  //Handle edit employees
  const editEmployee = (employee, event) => {
    event.stopPropagation();
    try {
      sessionStorage.setItem("selectedEmployeeId", employee.id);
      if (
        state.cookies.selectedRole[0] !== "ROLE_ADMIN" &&
        state.cookies.selectedRole[0] !== "ROLE_MANAGER"
      ) {
        alert("You don't have the privileges to edit employees");
      } else {
        navigate("editemployee");
      }
    } catch (error) {
      console.error("Error editing employee:", error);
    }
  };

  //Handle delete employee
  const deleteEmployee = useCallback(async (employee, event) => {
    event.stopPropagation();
    try {
      if (
        state.cookies.selectedRole[0] !== "ROLE_ADMIN" &&
        state.cookies.selectedRole[0] !== "ROLE_MANAGER"
      ) {
        alert("You don't have the priviledges to delete employees");
      } else {
        await axios.post(
          `${API_URL}/employees/deleteEmployeeById/${employee.id}`,
          null,
          {
            headers: {
              Authorization: state.cookies.jwt,
            },
          }
        );
        changePagination({ totalItems: pagination.totalItems - 1 })
      }
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  }, []);

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h2>Employee List</h2>
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
          <img
            className={styles.searchIcon}
            src={searchIcon}
            onClick={getSearchResult}
          ></img>
        </div>

        <div className={styles.addExport}>
          <button
            className={styles.addButton}
            onClick={() => {
              if (
                state.cookies.selectedRole[0] !== "ROLE_ADMIN" &&
                state.cookies.selectedRole[0] !== "ROLE_MANAGER"
              ) {
                alert("You don't have the priviledges to add employees");
              } else {
                navigate("addemployee");
              }
            }}
          >
            Add
          </button>
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
                <span
                  className="firstName"
                  onClick={(event) => handleSort(event)}
                >
                  First Name
                </span>
              </th>
              <th>
                <span
                  className="lastName"
                  onClick={(event) => handleSort(event)}
                >
                  Last Name
                </span>
              </th>
              <th>
                <span className="email" onClick={(event) => handleSort(event)}>
                  Email
                </span>
              </th>
              <th>
                <span
                  className="phoneNumber"
                  onClick={(event) => handleSort(event)}
                >
                  Phone Number
                </span>
              </th>
              <th>Actions</th>
              <th>
                <span
                  className="jobTitles"
                  onClick={(event) => handleSort(event)}
                >
                  Job Titles
                </span>
              </th>
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
                      sessionStorage.setItem("selectedEmployeeId", employee.id);
                      navigate("employeeProfile");
                    }}
                  >
                    <td>{employee.id}</td>
                    <td>{employee.firstName}</td>
                    <td>{employee.lastName}</td>
                    <td>{employee.email}</td>
                    <td>{employee.phoneNumber}</td>
                    <td>
                      <button
                        className={styles.Edit}
                        onClick={(event) => editEmployee(employee, event)}
                      >
                        Edit
                      </button>
                      |
                      <button
                        className={styles.Delete}
                        onClick={(event) => deleteEmployee(employee, event)}
                      >
                        Delete
                      </button>
                    </td>
                    <td>{employee.jobTitles}</td>
                  </tr>
                </React.Fragment>
              ))}
          </tbody>
        </table>
        <ReactPaginate
          className={styles.pagination}
          breakLabel="..."
          nextLabel=">"
          onPageChange={handlePageChange}
          pageRangeDisplayed={5}
          pageCount={pagination.totalPages}
          previousLabel="<"
          pageClassName={styles.page}
          renderOnZeroPageCount={null}
        />
      </div>
      <Footer />
    </main>
  );
}
