import { format } from 'date-fns'; // I might need date-fns, or just use native Date

const MessageBubble = ({ message, isOwn }) => {
    const timeString = new Date(message.createdAt || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    return (
        <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'} mb-4`}>
            <div
                className={`max-w-[70%] rounded-lg px-4 py-2 shadow-sm ${isOwn
                        ? 'bg-blue-100 text-gray-900 rounded-br-none'
                        : 'bg-white text-gray-900 rounded-bl-none border border-gray-200'
                    }`}
            >
                <p className="text-sm font-medium">{message.text}</p>
                <div className={`text-xs mt-1 text-right ${isOwn ? 'text-blue-500' : 'text-gray-400'}`}>
                    {timeString}
                </div>
            </div>
        </div>
    );
};

export default MessageBubble;
