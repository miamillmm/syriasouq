import axios from "axios";
import { useEffect, useState } from "react";
import { FiSend } from "react-icons/fi";
import { io } from "socket.io-client";

// const socket = io(import.meta.env.VITE_API_URL);
const socket = io("http://localhost:5001");

const Inbox = () => {
  const [user, setUser] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [image, setImage] = useState(null);
  const [audio, setAudio] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("SyriaSouq-auth"));
    if (storedUser) {
      console.log("Stored User:", storedUser);

      setUser(storedUser);
      fetchConversations(storedUser._id, storedUser.jwt);
      fetchUsers();
      socket.emit("join", storedUser._id);
    }
  }, []);

  useEffect(() => {
    if (selectedChat) {
      socket.emit("joinConversation", selectedChat._id);
    }
  }, [selectedChat]);

  useEffect(() => {
    socket.on("newMessage", (message) => {
      console.log("New message received:", message);

      // Check if the message belongs to the selected chat
      if (selectedChat && message.conversation === selectedChat._id) {
        setMessages((prevMessages) => [...prevMessages, message]);
      }
    });

    return () => {
      socket.off("newMessage");
    };
  }, [selectedChat]);

  // const fetchConversations = async (userId) => {
  //   try {
  //     const response = await axios.get(
  //       `${import.meta.env.VITE_API_URL}/conversations/${userId}`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${user.jwt}`,
  //         },
  //       }
  //     );
  //     console.log(response.data);
  //     setConversations(response.data);
  //   } catch (error) {
  //     console.error("Error fetching conversations", error);
  //   }
  // };

  const fetchConversations = async (userId, jwt) => {
    try {
      console.log("Fetching conversations for:", userId);
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/conversations/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      console.log("Fetched conversations:", response.data); // ✅ Debugging
      setConversations(response.data);
    } catch (error) {
      console.error("Error fetching conversations", error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/users`);
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users", error);
    }
  };

  useEffect(() => {
    if (selectedChat) {
      fetchMessages(selectedChat._id);
    }
  }, [selectedChat]);

  const fetchMessages = async (conversationId) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/messages/${conversationId}`,
        {
          headers: {
            Authorization: `Bearer ${user.jwt}`,
          },
        }
      );
      setMessages(response.data);

      // ✅ Mark messages as read
      await axios.put(
        `${import.meta.env.VITE_API_URL}/messages/${conversationId}/read`,
        {},
        { headers: { Authorization: `Bearer ${user.jwt}` } }
      );
    } catch (error) {
      console.error("Error fetching messages", error);
    }
  };

  const startNewChat = async (receiver) => {
    try {
      let conversation = conversations.find((c) =>
        c.participants.includes(receiver.id)
      );

      if (!conversation) {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/conversations`,
          {
            recipientId: receiver._id, // ✅ Changed "receiverId" to "recipientId"
          },
          {
            headers: {
              Authorization: `Bearer ${user.jwt}`, // ✅ Send JWT in headers
            },
          }
        );

        conversation = response.data;
        setConversations([conversation, ...conversations]);
      }

      setSelectedChat(conversation);
      fetchMessages(conversation.id);
    } catch (error) {
      console.error("Error starting new chat", error);
    }
  };

  const handleTyping = () => {
    if (!selectedChat) return;

    socket.emit("typing", {
      conversationId: selectedChat._id,
      sender: user._id,
    });

    // Reset typing after 2 seconds
    setTimeout(() => {
      socket.emit("stopTyping", {
        conversationId: selectedChat._id,
        sender: user._id,
      });
    }, 2000);
  };

  useEffect(() => {
    socket.on("typing", ({ sender }) => {
      if (selectedChat && sender !== user._id) {
        setIsTyping(true);
      }
    });

    socket.on("stopTyping", ({ sender }) => {
      if (selectedChat && sender !== user._id) {
        setIsTyping(false);
      }
    });

    return () => {
      socket.off("typing");
      socket.off("stopTyping");
    };
  }, [selectedChat]);

  const sendMessage = async () => {
    if (!newMessage.trim() && !image && !audio) return;

    console.log(newMessage, selectedChat, user);

    const formData = new FormData();
    formData.append("message", newMessage);
    formData.append("conversationId", selectedChat._id);
    formData.append("sender", user._id);
    if (image) formData.append("image", image);
    if (audio) formData.append("audio", audio);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/messages`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${user.jwt}`,
          },
        }
      );
      socket.emit("sendMessage", response.data);
      setMessages([...messages, response.data]);
      setNewMessage("");
      setImage(null);
      setAudio(null);
    } catch (error) {
      console.error("Error sending message", error);
    }
  };

  return (
    <div className="flex h-[65vh] bg-gray-100">
      {/* Sidebar */}
      <div className="w-1/3 bg-white shadow-lg rounded-lg p-4 overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Messages 💬
        </h2>

        {/* Search Bar */}
        {/* <div className="flex items-center mb-4 bg-gray-200 p-2 rounded-lg">
          <FiSearch className="text-gray-600 mr-2" />
          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent w-full outline-none"
          />
        </div> */}

        {/* List of Conversations */}
        <h3 className="text-lg font-semibold text-gray-800">Recent Chats</h3>
        {conversations.map((chat) => (
          <div
            key={chat.id}
            onClick={() => setSelectedChat(chat)}
            className={`flex items-center gap-4 p-3 rounded-lg cursor-pointer hover:bg-gray-100 transition ${
              selectedChat?.id === chat.id ? "bg-red-100" : ""
            }`}
          >
            {/* <img
              src={chat.avatar || "/default-avatar.png"}
              className="w-12 h-12 rounded-full"
              alt="avatar"
            /> */}
            <div className="w-12 h-12 rounded-full bg-red-300 text-center flex items-center justify-center font-bold text-xl">
              {(() => {
                const participant = chat?.participants?.find(
                  (u) => u._id !== user._id
                );
                const firstLetter =
                  participant?.username?.charAt(0).toUpperCase() || "?";
                return firstLetter;
              })()}
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-medium text-gray-900">
                {chat.participants.find((u) => u._id !== user._id).username}
              </h3>
              <p className="text-sm text-gray-500">
                {chat.lastMessage || "No messages yet"}
              </p>
            </div>
          </div>
        ))}

        {/* Start New Chat */}
        {/* <h3 className="mt-6 text-lg font-semibold text-gray-800">
          Start New Chat
        </h3>
        {users
          .filter(
            (u) =>
              u._id !== user._id &&
              u.username.toLowerCase().includes(search.toLowerCase())
          )
          .map((u) => (
            <div
              key={u._id}
              onClick={() => startNewChat(u)}
              className="p-3 rounded-lg cursor-pointer hover:bg-gray-100 flex items-center gap-3"
            >
              <img
                src={u.avatar || "/default-avatar.png"}
                className="w-10 h-10 rounded-full"
              />
              <span className="flex-1">{u.name}</span>
              <FiUserPlus className="text-red-500" />
            </div>
          ))} */}
      </div>

      {/* Chat Window */}
      <div className="w-2/3 flex flex-col bg-white shadow-md rounded-lg">
        {selectedChat ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b flex items-center justify-between">
              <h3 className="text-xl font-semibold text-gray-900">
                {
                  selectedChat.participants.find((u) => u._id !== user._id)
                    .username
                }
                {console.log("From Inside", selectedChat)}
              </h3>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, index) => (
                <>
                  <div
                    key={index}
                    className={`p-3 rounded-lg max-w-xs ${
                      (msg.sender._id || msg.sender) === user._id
                        ? "bg-red-500 text-white ml-auto"
                        : "bg-gray-200 text-gray-800"
                    }`}
                  >
                    <p>{msg.message}</p>
                    {msg.sender._id === user._id && (
                      <span className="text-sm">
                        {msg.read ? "✓✓ Read" : "✓ Sent"}{" "}
                        {/* ✅ Show read status */}
                      </span>
                    )}
                  </div>
                </>
              ))}
              {isTyping && <p className="text-gray-500">User is typing...</p>}
            </div>

            {/* Chat Input */}
            <div className="p-4 border-t flex items-center gap-3 bg-gray-50">
              <input
                type="text"
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => {
                  setNewMessage(e.target.value);
                  handleTyping(); // ✅ Call handleTyping() here
                }}
                className="w-full p-3 rounded-lg border border-gray-300"
              />
              <button
                onClick={sendMessage}
                className="bg-red-500 text-white p-3 rounded-lg hover:bg-red-600"
              >
                <FiSend size={24} />
              </button>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500 text-lg">
            Select a conversation to start chatting 💬
          </div>
        )}
      </div>
    </div>
  );
};

export default Inbox;
