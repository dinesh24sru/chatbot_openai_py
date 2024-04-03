import React, { useState, useEffect } from "react";
import "./Chatbot.css"; // Create a corresponding CSS file for styling
import botimg from "./robot.png";
import userimg from "./user.png";
// import { Chatbot } from "chatbotaienabled";

const ChatbotComponent = () => {
  const [collapsed, setCollapsed] = useState(true);
  const [messages, setMessages] = useState([
    {
      text: "Hello there! I am here to assist you! Ask me anything that I can help you with.",
      user: false,
    },
  ]);
  const [userMessage, setUserMessage] = useState("");

  const toggleChatbot = () => {
    setCollapsed(!collapsed);
  };

  const handleUserMessage = (e) => {
    setUserMessage(e.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };

  // const handleSendMessage = () => {
  //   if (userMessage.trim() !== "") {
  //     // Handle user message and chatbot responses here
  //     setMessages([...messages, { text: userMessage, user: true }]);
  //     setUserMessage("");
  //   }
  // };

  // const [messages, setMessages] = useState([]);
  // const [inputValue, setInputValue] = useState("");
  const [ws, setWs] = useState(null);

  useEffect(() => {
    // Establish WebSocket connection
    const socket = new WebSocket("ws://localhost:8000/ws");
    setWs(socket);

    // WebSocket event listeners
    socket.onopen = () => {
      console.log("Connected to WebSocket");
    };

    socket.onmessage = (event) => {
      const message = event.data;
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: message, user: false },
      ]);
    };

    return () => {
      // Cleanup on unmount or WebSocket close
      socket.close();
    };
  }, []);

  const sendMessage = () => {
    if (ws) {
      ws.send(userMessage);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: userMessage, user: true },
      ]);
      setUserMessage("");
    }
  };

  // const handleChange = (e) => {
  //   setInputValue(e.target.value);
  // };

  return (
    <React.Fragment>
      {/* <Chatbot /> */}
      <div
        className={
          collapsed ? "chatbot-container collapsed" : "chatbot-container"
        }
      >
        <div className="chatbot-header" onClick={toggleChatbot}>
          Chatbot
        </div>
        <div className="chatbot-messages">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`message ${message.user ? "user" : "bot"}`}
            >
              <span style={{ padding: "20px" }}>
                <img
                  src={message.user ? userimg : botimg}
                  alt="Bot"
                  height={20}
                />
              </span>

              {message.text}
            </div>
          ))}
        </div>
        <div className="chatbot-input">
          <input
            type="text"
            placeholder="Type your message..."
            value={userMessage}
            onChange={handleUserMessage}
            onKeyDown={handleKeyPress}
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ChatbotComponent;
