import { useState, useEffect } from 'react';
import { useSocket } from '../context/SocketContext';
import { useAuth } from '../context/AuthContext';
import ChatWindow from '../components/ChatWindow';
import api from '../utils/api';

const Chat = () => {
    const { socket } = useSocket();
    const { user } = useAuth();
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchMessages();
    }, []);

    useEffect(() => {
        if (!socket || !user) return;

        // Join user-specific room
        socket.emit('join', user._id);

        socket.on('message', (message) => {
            console.log('Chat received message:', message);
            setMessages((prev) => [...prev, message]);
        });

        return () => {
            socket.off('message');
        };
    }, [socket, user]);

    useEffect(() => {
        console.log("Current messages state:", messages);
    }, [messages]);

    const fetchMessages = async () => {
        try {
            const res = await api.get('/api/chat/messages');
            setMessages(res.data);
        } catch (error) {
            console.error("Error fetching messages", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSendMessage = (text) => {
        if (!socket) return;

        console.log("Sending message:", text, "from User:", user._id);

        // Emit message to server
        // Server should handle saving to DB and broadcasting to admin
        socket.emit('sendMessage', {
            sender: user._id,
            receiver: 'admin', // Assuming 'admin' or finding an available admin
            text
        });
    };

    return (
        <div className="bg-gray-50 min-h-screen py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Support Chat</h1>
                <ChatWindow
                    messages={messages}
                    onSendMessage={handleSendMessage}
                    loading={loading}
                    currentUserId={user?._id}
                />
            </div>
        </div>
    );
};

export default Chat;
