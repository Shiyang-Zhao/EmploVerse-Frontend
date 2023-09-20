import styles from "components/User/css/Chat.module.scss";
import { useState } from "react";
import { SOCK_URL } from "config";
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs'

export default function Chat() {
    const [messages, setMessages] = useState([]);
    const [currentMessage, setCurrentMessage] = useState('');

    // const [messages, setMessages] = useState([]);
    // var sock = new SockJS(SOCK_URL);
    // let stompClient = Stomp.over(sock);

    // sock.onopen = function () {
    //     console.log('open');
    // }

    // // Function to handle incoming message
    // const handleMessage = (message) => {
    //     console.log('Handling message:', message);
    //     setMessages(prevMessages => [...prevMessages, message]);
    // }

    // stompClient.connect({ 'Authorization': state.cookies.jwt }, function (frame) {
    //     stompClient.subscribe("/toClient/greetings", function (greeting) {
    //         handleMessage(greeting.body);
    //     }, { 'Authorization': state.cookies.jwt });
    // });

    // const sendMessageToServer = () => {
    //     stompClient.send('/toServer/hello', { 'Authorization': state.cookies.jwt }, "state.cookies.jwt");
    // }

    // // Cleanup WebSocket connection on component unmount
    // useEffect(() => {
    //     return () => {
    //         stompClient.disconnect();
    //     }
    // }, [stompClient]);

    const sendMessage = () => {
        if (currentMessage.trim() !== '') {
            setMessages([...messages, currentMessage]);
            setCurrentMessage('');
        }
    };

    return (
        <main>
            <div className={styles['chat-room']}>
                <div className={styles['friends-list']}>
                    <h2>Friends List</h2>
                    {/* Add your list of friends here */}
                    <ul>
                        <li>Friend 1</li>
                        <li>Friend 2</li>
                        <li>Friend 3</li>
                    </ul>
                </div>
                <div className={styles['chat-area']}>
                    <h2>Chat with Friend</h2>
                    <div className={styles['message-display']}>
                        {messages.map((message, index) => (
                            <div key={index} className="message">{message}</div>
                        ))}
                    </div>
                    <div className={styles['message-input']}>
                        <input
                            type="text"
                            value={currentMessage}
                            onChange={(e) => setCurrentMessage(e.target.value)}
                            placeholder="Type your message here..."
                        />
                        <button onClick={sendMessage}>Send</button>
                    </div>
                </div>
            </div>
        </main>
    );
}