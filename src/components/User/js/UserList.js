import styles from "components/User/css/UserList.module.scss";
import Footer from "components/Others/js/Footer";
import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { CSVLink } from "react-csv";
import { SOCK_URL, formatPath } from "config";
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs'
import { API } from "api/API";

export default function UserList({ state }) {
    const [messages, setMessages] = useState([]);
    var sock = new SockJS(SOCK_URL);
    let stompClient = Stomp.over(sock);

    sock.onopen = function () {
        console.log('open');
    }

    // Function to handle incoming message
    const handleMessage = (message) => {
        console.log('Handling message:', message);
        setMessages(prevMessages => [...prevMessages, message]);
    }

    stompClient.connect({ 'Authorization': state.cookies.jwt }, function (frame) {
        stompClient.subscribe("/toClient/greetings", function (greeting) {
            handleMessage(greeting.body);
        }, { 'Authorization': state.cookies.jwt });
    });

    const sendMessageToServer = () => {
        stompClient.send('/toServer/hello', { 'Authorization': state.cookies.jwt }, "state.cookies.jwt");
    }

    // Cleanup WebSocket connection on component unmount
    useEffect(() => {
        return () => {
            stompClient.disconnect();
        }
    }, [stompClient]);




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
        navigate(`/user/${userId}`);
    };

    return (

        <div className={styles.userListContainer}>

            <div>
                <button onClick={sendMessageToServer} className={styles.ws}>Send Message to Server</button>
                <div>
                    <h2>Received Messages</h2>
                    <ul>
                        {messages.map((message, index) => (
                            <li key={index}>{message}</li>
                        ))}
                    </ul>
                </div>
            </div>
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
                pageCount={10} // Example: Replace with the actual number of pages
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