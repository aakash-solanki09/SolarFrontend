import { useState, useEffect } from 'react';
import { useSocket } from '../../context/SocketContext';
import { useAuth } from '../../context/AuthContext';
import ChatWindow from '../../components/ChatWindow';
import api from '../../utils/api';

const AdminChat = () => {
    const { socket } = useSocket();
    const { user } = useAuth();
    const [activeChatUser, setActiveChatUser] = useState(null);
    const [users, setUsers] = useState([]); // List of users with chat history
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchChatUsers();
    }, []);

    useEffect(() => {
        if (!socket || !user) return;

        // Join admin's own room
        socket.emit('join', user._id);
        // Join generic admin room
        socket.emit('join', 'admin');

        socket.on('message', (message) => {


            // 1. Update messages if this conversation is active
            if (activeChatUser && (message.sender === activeChatUser._id || message.receiver === activeChatUser._id)) {
                setMessages((prev) => [...prev, message]);
            }

            // 2. Update user list (move active user to top) locally without API call
            setUsers(prevUsers => {
                // Determine the ID of the user on the other end
                // If I am sender, the other is receiver. If I am receiver, other is sender.
                const otherUserId = message.sender === user._id ? message.receiver : message.sender;
                
                const userIndex = prevUsers.findIndex(u => u._id === otherUserId);
                
                if (userIndex > -1) {
                    const newUsers = [...prevUsers];
                    const [movedUser] = newUsers.splice(userIndex, 1);
                    // Could also update a "lastMessage" property here if we had one
                    return [movedUser, ...newUsers];
                }
                // If user not found (new conversation), we might still need to fetch, 
                // but let's stick to local update for existing ones to satisfy "no api call" request.
                return prevUsers;
            });
        });

        return () => {
            socket.off('message');
        };
    }, [socket, user, activeChatUser]);

    const fetchChatUsers = async () => {
        try {
            // Endpoint to get users who have chatted
            const res = await api.get('/api/admin/chat-users');
            setUsers(res.data);
        } catch (error) {
            console.error("Error fetching chat users", error);
        }
    };

    const selectUser = async (user) => {
        setActiveChatUser(user);
        setLoading(true);
        try {
            const res = await api.get(`/api/chat/messages/${user._id}`);
            setMessages(res.data);
        } catch (error) {
            console.error("Error fetching messages", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSendMessage = (text) => {
        if (!socket || !activeChatUser) return;

        socket.emit('sendMessage', {
            sender: user._id,
            receiver: activeChatUser._id,
            text
        });
    };

    return (
        <div className="min-h-screen p-8">
            <div className="max-w-6xl mx-auto h-[calc(100vh-8rem)] bg-white rounded-xl shadow-lg overflow-hidden flex">
                {/* Sidebar - User List */}
                <div className="w-1/3 border-r border-gray-200 flex flex-col">
                    <div className="p-4 border-b border-gray-200 bg-gray-50">
                        <h2 className="font-bold text-gray-800">Conversations</h2>
                    </div>
                    <div className="flex-1 overflow-y-auto">
                        {users.map((u) => (
                            <div
                                key={u._id}
                                onClick={() => selectUser(u)}
                                className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${activeChatUser?._id === u._id ? 'bg-blue-50' : ''}`}
                            >
                                <div className="flex items-center">
                                    <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-bold">
                                        {u.name.charAt(0)}
                                    </div>
                                    <div className="ml-3">
                                        <p className="font-semibold text-gray-900">{u.name}</p>
                                        <p className="text-xs text-gray-500">Click to chat</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Chat Area */}
                <div className="w-2/3 flex flex-col">
                    {activeChatUser ? (
                        <>
                            <div className="p-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
                                <h3 className="font-bold text-gray-800">{activeChatUser.name}</h3>
                                <span className="text-xs text-gray-500">{activeChatUser.email}</span>
                            </div>
                            <div className="flex-1 overflow-hidden p-4">
                                <ChatWindow
                                    messages={messages}
                                    onSendMessage={handleSendMessage}
                                    loading={loading}
                                    currentUserId={user?._id}
                                />
                            </div>
                        </>
                    ) : (
                        <div className="flex-1 flex items-center justify-center text-gray-400">
                            Select a user to start chatting
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminChat;
