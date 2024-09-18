import React, { useEffect, useState } from 'react';
import { fetchMessages, sendMessage, editMessage, deleteMessage, Message } from '../services/api';

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

    return (
        <div className="chat-widget">
            <h2>Chatbot</h2>
        </div>
    );
};

export default ChatWidget;
