import styles from "components/User/css/UserList.module.scss";
import Footer from "components/Others/js/Footer";
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

        <div className={styles.userListContainer}>

            {/* <div>
                <button onClick={sendMessageToServer} className={styles.ws}>Send Message to Server</button>
                <div>
                    <h2>Received Messages</h2>
                    <ul>
                        {messages.map((message, index) => (
                            <li key={index}>{message}</li>
                        ))}
                    </ul>
                </div>
            </div> */}
            <div className={styles.searchBar}>
                <i className={`fa-solid fa-magnifying-glass fa-xl ${styles.searchIcon}`}></i>
                <input type="text" placeholder="Search users..." />
            </div>

            <div className={styles.userList}>
                {allUsersList.map((user) => (
                    <div
                        key={user.id}
                        className={styles.userCard}
                        onClick={() => handleUserClick(user.id)}
                    >
                        <div>
                            <img src={formatPath(user.profileImage)} alt={`Avatar of ${user.name}`} className='rounded-circle img-fluid img-thumbnail' />
                        </div>
                        <div className={styles.userInfo}>
                            <h3>{user.name}</h3>
                            <p>Email: {user.email}</p>
                        </div>
                    </div>
                ))}
            </div>

            <ReactPaginate
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

            <CSVLink
                data={allUsersList}
                filename={"user_list.csv"}
                className={styles.exportButton}
            >
                Export User List to CSV
            </CSVLink>

            <Footer />
        </div>
    );
}