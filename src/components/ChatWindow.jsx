import { useState, useEffect, useRef } from 'react';
import { Send } from 'lucide-react';
import MessageBubble from './MessageBubble';

const ChatWindow = ({ messages, onSendMessage, loading, currentUserId }) => {
    const [newMessage, setNewMessage] = useState('');
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        onSendMessage(newMessage);
        setNewMessage('');
    };

    return (
        <div className="flex flex-col h-[600px] bg-gray-50 rounded-xl shadow-lg border border-gray-200 overflow-hidden">
            <div className="bg-white p-4 border-b border-gray-200 flex justify-between items-center">
                <h3 className="font-semibold text-gray-800">Live Support</h3>
                <span className="text-xs text-green-500 flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
                    Online
                </span>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {loading ? (
                    <div className="flex justify-center items-center h-full text-gray-400">
                        Loading chat history...
                    </div>
                ) : messages.length === 0 ? (
                    <div className="flex justify-center items-center h-full text-gray-400 text-sm">
                        No messages yet. Start a conversation!
                    </div>
                ) : (
                    messages.map((msg, index) => (
                        <MessageBubble
                            key={msg._id || index}
                            message={msg}
                            isOwn={String(msg.sender?._id || msg.sender) === String(currentUserId)}
                        />
                    ))
                )}
                <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSubmit} className="p-4 bg-white border-t border-gray-200">
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type your message..."
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-solar-500 focus:border-transparent"
                    />
                    <button
                        type="submit"
                        disabled={!newMessage.trim()}
                        className="bg-solar-500 text-white p-2 rounded-full hover:bg-solar-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Send className="h-5 w-5" />
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ChatWindow;
