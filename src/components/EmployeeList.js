import searchIcon from "../icons/search.svg";
import "./components.css";
import styles from "./css/EmployeeList.module.css";
import Footer from "./Footer";
import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import axios from "axios";
import { CSVLink } from "react-csv";
import { API_URL } from "../config";

export default function EmployeeList({ state }) {
  const navigate = useNavigate();
  const [allEmployeesList, setAllEmployeesList] = useState([]);

  const [employeesList, setEmployeesList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [filteredEmployeesList, setFilteredEmployeesList] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [sortField, setSortField] = useState("id");
  const [sortDir, setSortDir] = useState("asc");
  const [searchField, setSearchField] = useState("id");
  const [searchDir, setSearchDir] = useState("asc");

  useEffect(() => {
    getEmployeesList();
  }, [currentPage, sortField, sortDir]);

  useEffect(() => {
    getAllEmployeesList();
  }, []);

  //Handle page change
  const handlePageChange = ({ selected: selectedPage }) => {
    setCurrentPage(selectedPage + 1);
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
  const getEmployeesList = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/employees/page/${currentPage}?sortField=${sortField}&sortDir=${sortDir}`,
        {
          headers: {
            Authorization: state.cookies.jwt,
          },
        }
      );
      setTotalPages(response.data.totalPages);
      setEmployeesList(response.data.listEmployees);
    } catch (error) {
      console.error("Error fetching pagination:", error);
    }
  };

  //Toggle sort direction
  const handleSort = async (event) => {
    try {
      setSortField(event.target.className);
      if (sortDir === "asc") {
        setSortDir("desc");
      } else {
        setSortDir("asc");
      }
    } catch (error) {
      console.error("Error fetching pagination:", error);
    }
  };

  //Handle search function
  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/employees/searchEmployees?keyword=${keyword}&sortField=${searchField}&sortDir=${searchDir}`,
        {
          headers: {
            Authorization: state.cookies.jwt,
          },
        }
      );
      setFilteredEmployeesList(response.data);
    } catch (error) {
      console.error("Error fetching all employee list:", error);
    }
  };

  //Handle edit employees (Optimized)
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
        getEmployeesList();
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
              onChange={async (event) => {
                setKeyword(event.target.value);
              }}
            />
          </div>
          <select
            className={styles.searchField}
            defaultValue="id"
            onChange={async (event) => {
              setSearchField(event.target.value);
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
          <select
            className={styles.searchDir}
            defaultValue="asc"
            onChange={async (event) => {
              setSearchDir(event.target.value);
            }}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
          <img
            className={styles.searchIcon}
            src={searchIcon}
            onClick={handleSearch}
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
            {employeesList &&
              employeesList.map((employee) => (
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
          pageCount={totalPages}
          previousLabel="<"
          pageClassName={styles.page}
          renderOnZeroPageCount={null}
        />


        <h3>Search Result</h3>
        <table className={styles.EmployeeListTable}>
          <thead>
            <tr>
              <th>
                ID
              </th>
              <th>
                First Name
              </th>
              <th>
                Last Name
              </th>
              <th>
                Email
              </th>
              <th>
                Phone Number
              </th>
              <th>
                Actions
              </th>
              <th>
                Job Titles
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployeesList &&
              filteredEmployeesList.map((employee) => (
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
                        onClick={(event) => deleteEmployee(employee.id, event)}
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
      </div>
      <Footer />
    </main>
  );
}
