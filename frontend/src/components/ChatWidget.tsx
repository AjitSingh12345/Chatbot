import React, { useEffect, useState } from 'react';
import { fetchMessages, sendMessage, editMessage, deleteMessage, Message } from '../services/api';
import MessageList from './MessageList';
import InputBar from './InputBar';

/*
Interface for interacting with chatbot 
*/

const ChatWidget: React.FC = () => {
    // save current list of messages (conversation) in components local state
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    
    // useEffect to fetch data everytime component loads
    useEffect(() => {
        loadMessages();
    }, []);

    // fetch messages from backend & update local state
    const loadMessages = async () => {
        setLoading(true);
        const msgs = await fetchMessages();
        setMessages(msgs);
        setLoading(false);
    };

    // called when user sends new message
    // uses api to send users msg to backend & updates msgs state
    const handleSend = async (text: string) => {
        const newMessage = await sendMessage(text);
        setMessages([...messages, newMessage]);
    };

    // called when user edits existing message
    // uses api to get updated msg from backend & update state
    const handleEdit = async (id: number, text: string) => {
        const updatedMessage = await editMessage(id, text);
        setMessages(messages.map(msg => (msg.id === id ? updatedMessage : msg)));
    };

    // called when user deletes a message
    // calls services/api to delete msg & updates local state
    const handleDelete = async (id: number) => {
        await deleteMessage(id);
        setMessages(messages.filter(msg => msg.id !== id));
    };

    /*
    - if in loading state, display loading msg else render MessageList component
    - MessageList component takes in edit and delete handlers
    - display InputBar at bottom (where users type) which takes a send handler prop
    - changes to local state are immediately reflected in UI
    */
    return (
        <div className="chat-widget">
            <h2>Chatbot</h2>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <MessageList messages={messages} onEdit={handleEdit} onDelete={handleDelete} />
            )}
            <InputBar onSend={handleSend} />
        </div>
    );
};

export default ChatWidget;
