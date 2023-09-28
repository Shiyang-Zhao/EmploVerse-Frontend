import styles from "components/User/css/UserList.module.scss";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { CSVLink } from "react-csv";
import { formatPath } from "config";
import { API } from "api/API";

export default function UserList({ state }) {

    const navigate = useNavigate();
    const [allUsersList, setAllUsersList] = useState([]);

    useEffect(() => {
        getAllUsersList();
    }, []);

    const getAllUsersList = async () => {
        try {
            const response = await API.getAllUsers();
            setAllUsersList(response.data);
        } catch (error) {
            console.log(error);
        }
    };
    const handleUserClick = (userId) => {
        navigate(`user/${userId}`);
    };

    return (
        <main>
            <div className={styles.container}>
                <div className={styles.searchBar}>
                    <i className={`fa-solid fa-magnifying-glass fa-xl ${styles.searchIcon}`}></i>
                    <input type="text" placeholder="Search users..." />
                </div>

                <CSVLink
                    data={allUsersList}
                    filename={"user_list.csv"}
                    className={styles.exportButton}
                >
                    Export User List to CSV
                </CSVLink>

                <div className={styles.userList}>
                    {allUsersList.map((user) => (
                        <div key={user.id} className={styles.userCard} onClick={() => handleUserClick(user.id)}>
                            <div>
                                <img src={formatPath(user.profileImage)} alt={`Avatar of ${user.name}`}/>
                            </div>
                            <div className={styles.userInfo}>
                                <p>Name: {user.firstName} {user.lastName}</p>
                                <p>Username: {user.username}</p>
                                <p>Email: {user.email}</p>
                                <p>Phone Number: {user.phoneNumber}</p>

                            </div>
                        </div>
                    ))}
                </div>

                <ReactPaginate
                    className={styles.pagination}
                    previousLabel={"Previous"}
                    nextLabel={"Next"}
                    breakLabel={"..."}
                    pageCount={10}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={(selectedPage) => {
                    }}
                    containerClassName={styles.paginationContainer}
                    activeClassName={styles.paginationActive}
                />
            </div>
        </main>
    );
}