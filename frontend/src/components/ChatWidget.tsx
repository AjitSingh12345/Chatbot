import React, { useEffect, useState } from 'react';
import { fetchMessages, sendMessage, editMessage, deleteMessage, Message } from '../services/api';
import MessageList from './MessageList';
import InputBar from './InputBar';
import ChatHeader from './ChatHeader';

/*
Interface for interacting with chatbot 
*/

const ChatWidget: React.FC = () => {
    // save current list of messages (conversation) in components local state
    const [messages, setMessages] = useState<Message[]>([]);
    
    // useEffect to fetch data everytime component loads
    // fetch messages from backend & update local state
    useEffect(() => {
        const loadMessages = async () => {
            try {
                const fetchedMessages = await fetchMessages(); // Use the fetchMessages API call
                setMessages(fetchedMessages);
            } catch (error) {
                console.error(error);
            }
        };

        loadMessages();
    }, []);    

    // called when user sends new message
    // uses api to send users msg to backend & updates msgs state
    const handleSend = async (text: string) => {
        try {
            const newMessage = await sendMessage(text); // Use the sendMessage API call
            setMessages([...messages, newMessage]);
        } catch (error) {
            console.error(error);
        }
    };

    // called when user edits existing message
    // uses api to get updated msg from backend & update state
    const handleEdit = async (id: number, text: string) => {
        try {
            const updatedMessage = await editMessage(id, text); // Use the editMessage API call
            setMessages(messages.map(msg => (msg.id === id ? updatedMessage : msg)));
        } catch (error) {
            console.error(error);
        }
    };

    // called when user deletes a message
    // calls services/api to delete msg & updates local state
    const handleDelete = async (id: number) => {
        try {
            await deleteMessage(id); // Use the deleteMessage API call
            setMessages(messages.filter(msg => msg.id !== id));
        } catch (error) {
            console.error(error);
        }    
    };

    /*
    - if in loading state, display loading msg else render MessageList component
    - MessageList component takes in edit and delete handlers
    - display InputBar at bottom (where users type) which takes a send handler prop
    - changes to local state are immediately reflected in UI
    */
    return (
        <div className="w-full md:w-2/3 lg:w-1/2 h-screen bg-white shadow-lg rounded-lg mx-auto mt-10">
            <div className="h-full flex flex-col">
                <ChatHeader />

                <div className="flex-grow overflow-y-auto">
                    <MessageList messages={messages} onEdit={handleEdit} onDelete={handleDelete} />
                </div>
            
                <div className="p-4 border-t">
                    <InputBar onSend={handleSend} />
                </div>
            </div>
        </div>
    );
};

export default ChatWidget;
