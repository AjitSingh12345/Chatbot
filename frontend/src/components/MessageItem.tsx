import React, { useState } from 'react';
import { Message } from '../services/api';
import { FaEdit, FaTrash, FaSave, FaTimes, FaRobot } from 'react-icons/fa';  // Import FaRobot along with others

/*
Represents individual message in chat interface
Allows users to view, edit, and delete messages

Properties inherited:
- single Message object (modeled after API interface)
- edit and delete handlers

States owned:
- bool if user is currently editing msg
- string which stores current state of text being edited in 
  input field (initially the og message)
*/

interface Props {
    message: Message;
    onEdit: (id: number, text: string) => void;
    onDelete: (id: number) => void;
}

const MessageItem: React.FC<Props> = ({ message, onEdit, onDelete }) => {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [editText, setEditText] = useState<string>(message.user_message);

    const handleSave = () => {
        onEdit(message.id, editText);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setIsEditing(false);                // exit editing mode without saving changes
        setEditText(message.user_message);  // reset text to original
    };    

    /*
    Rendered component:
        - when isEditing, message is shown in editable input field
        where user can modify editText
        - else, msg shown as plain text
        - handleSave will make isEditing false and 
        call parent edit handler with updated text

        - while isEditing, display save and cancel buttons
        - else, display edit and delete buttons

        - user message aligned to right, bot msg to left
    */
    return (
        <div>
            {/* User message - aligned to right */}
            <div className="flex justify-end mb-4">
                <div className="p-4 rounded-lg bg-purple-500 text-white max-w-xs text-lg">
                    {isEditing ? (
                        <div className="flex items-center space-x-2">
                            <input
                                value={editText}
                                onChange={(e) => setEditText(e.target.value)}
                                className="border p-2 rounded-md bg-gray-100 text-black text-lg"
                            />
                            
                            <button onClick={handleSave} className="text-green-500 hover:text-green-700 text-xl">
                                <FaSave /> {/* Save icon */}
                            </button>

                            <button onClick={handleCancel} className="text-red-500 hover:text-red-700 text-xl">
                                <FaTimes /> {/* Cancel icon */}
                            </button>
                        </div>
                    ) : (
                        <>
                            <p>{message.user_message}</p>
                            <div className="flex space-x-4 mt-2">
                                <button onClick={() => setIsEditing(true)} className="text-blue-500 hover:text-blue-700 text-xl">
                                    <FaEdit /> {/* Edit icon */}
                                </button>
                                
                                <button onClick={() => onDelete(message.id)} className="text-red-500 hover:text-red-700 text-xl">
                                    <FaTrash /> {/* Delete icon */}
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        
            {/* Bot response - aligned to the left */}
            <div className="flex justify-start mb-4">
                <div className="p-4 rounded-lg bg-gray-100 text-black max-w-xs text-lg">
                    <div className="flex items-start">
                        <FaRobot className="w-8 h-8 text-purple-500 mr-2" />
                        <p>{message.bot_response}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MessageItem;
