import { useState } from "react";

export default function Chat() {
    const [messages, setMessages] = useState([]);
    const [currentMessage, setCurrentMessage] = useState('');

    const sendMessage = () => {
        if (currentMessage.trim() !== '') {
            setMessages([...messages, currentMessage]);
            setCurrentMessage('');
        }
    };

    return (
        <main>
            <div className="chat-room">
                <div className="friends-list">
                    <h2>Friends List</h2>
                    {/* Add your list of friends here */}
                    <ul>
                        <li>Friend 1</li>
                        <li>Friend 2</li>
                        <li>Friend 3</li>
                    </ul>
                </div>
                <div className="chat-area">
                    <h2>Chat with Friend</h2>
                    <div className="message-display">
                        {messages.map((message, index) => (
                            <div key={index} className="message">{message}</div>
                        ))}
                    </div>
                    <div className="message-input">
                        <input
                            type="text"
                            value={currentMessage}
                            onChange={(e) => setCurrentMessage(e.target.value)}
                            placeholder="Type your message..."
                        />
                        <button onClick={sendMessage}>Send</button>
                    </div>
                </div>
            </div>
        </main>
    );
}