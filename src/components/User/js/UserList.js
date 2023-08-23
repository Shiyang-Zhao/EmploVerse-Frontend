//import "App.css";
import styles from "components/User/css/UserList.module.css";
import Footer from "components/Others/js/Footer";
import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import axios from "axios";
import { CSVLink } from "react-csv";
import { API_URL } from "config";

export default function UserList({ state }) {
    const navigate = useNavigate();
    const [allUsersList, setAllUsersList] = useState([]);

    useEffect(() => {
        getAllUsersList();
    }, []);

    const getAllUsersList = async () => {
        try {
            const response = await axios.get(`${API_URL}/users/`, {
                headers: {
                    Authorization: state.cookies.jwt,
                },
            });
            setAllUsersList(response.data);
        } catch (error) {
            console.log(error);
        }
    };
    const handleUserClick = (userId) => {
        // Handle navigation to user details page when a user is clicked
        navigate(`/user/${userId}`);
    };

    return (
        <div className={styles.userListContainer}>
            {/* Add a search bar if necessary */}
            <div className={styles.searchBar}>
                <i className={`fa-solid fa-magnifying-glass fa-xl ${styles.searchIcon}`}></i>
                <input type="text" placeholder="Search users..." />
            </div>

            {/* Render the user list */}
            <div className={styles.userList}>
                {allUsersList.map((user) => (
                    <div
                        key={user.id}
                        className={styles.userCard}
                        onClick={() => handleUserClick(user.id)}
                    >
                        <div className={styles.userAvatar}>
                            {/* Display user avatar or profile picture */}
                            <img src={user.avatar} alt={`Avatar of ${user.name}`} />
                        </div>
                        <div className={styles.userInfo}>
                            <h3>{user.name}</h3>
                            <p>Email: {user.email}</p>
                            {/* Add any other user information you want to display */}
                        </div>
                    </div>
                ))}
            </div>

            {/* Add pagination if necessary */}
            <ReactPaginate
                previousLabel={"Previous"}
                nextLabel={"Next"}
                breakLabel={"..."}
                pageCount={10} // Example: Replace with the actual number of pages
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={(selectedPage) => {
                    // Handle pagination change here
                }}
                containerClassName={styles.paginationContainer}
                activeClassName={styles.paginationActive}
            />

            {/* Add a CSV export button if necessary */}
            <CSVLink
                data={allUsersList}
                filename={"user_list.csv"}
                className={styles.exportButton}
            >
                Export User List to CSV
            </CSVLink>

            {/* Add the footer component */}
            <Footer />
        </div>
    );
}