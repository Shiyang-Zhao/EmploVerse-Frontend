import styles from "components/User/css/UserList.module.css";
import Footer from "components/Others/js/Footer";
import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { CSVLink } from "react-csv";
import { API_URL, SOCK_URL, formatPath } from "config";
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs'
import { API } from "api/API";

export default function UserList({ state }) {

    var sock = new SockJS(SOCK_URL);
    let stompClient = Stomp.over(sock);

    sock.onopen = function () {
        console.log('open');
    }

    // Function to handle incoming message
    const handleMessage = (message) => {
        console.log('Handling message:', message);
    }

    stompClient.connect({ 'Authorization': state.cookies.jwt }, function (frame) {
        stompClient.subscribe('/toClient/greetings', function (greeting) {
            handleMessage(greeting.body);
        });
    });

    const sendMessageToServer = () => {
        stompClient.send('/toServer/hello', { 'Authorization': state.cookies.jwt }, "state.cookies.jwt");
    }



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
        // Handle navigation to user details page when a user is clicked
        navigate('user');
    };

    return (

        <div className={styles.userListContainer}>
            <div>
                <button onClick={sendMessageToServer} className={styles.ws}>Send Message to Server</button>
            </div>
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