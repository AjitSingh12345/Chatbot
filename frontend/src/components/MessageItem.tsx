import React, { useState } from 'react';
import { Message } from '../services/api';
import { FaEdit, FaTrash, FaSave, FaTimes } from 'react-icons/fa';  // Import FaRobot along with others
import '../styles/MessageItem.css';

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
            {/* user Message - aligned to the right */}
            <div className="flex justify-end mb-4 items-center">
                <div className="p-4 bg-purple-500 text-white rounded-lg max-w-xs break-words text-lg">
                    {isEditing ? (
                    <div className="flex items-center space-x-2">
                        <input
                            value={editText}
                            onChange={(e) => setEditText(e.target.value)}
                            className="border p-2 rounded-md bg-gray-100 text-black text-lg"
                        />
                    </div>
                    ) : (
                    <>
                        <p className="text-xl">{message.user_message}</p>
                    </>
                    )}
                </div>
            </div>

            {/* edit/delete or save/cancel buttons - positioned below message with a white background */}
            <div className="flex justify-end space-x-4 mt-1 bg-white p-2 rounded-lg">
                {isEditing ? (
                    <>
                        <button onClick={handleSave} className="text-green-500 hover:text-green-700 text-xl">
                            <FaSave />
                        </button>
                        <button onClick={handleCancel} className="text-red-500 hover:text-red-700 text-xl">
                            <FaTimes />
                        </button>
                    </>
                ) : (
                    <>
                        <button onClick={() => setIsEditing(true)} className="text-blue-500 hover:text-blue-700 text-xl">
                            <FaEdit />
                        </button>
                        <button onClick={() => onDelete(message.id)} className="text-red-500 hover:text-red-700 text-xl">
                            <FaTrash />
                        </button>
                    </>
                )}
            </div>

            {/* bot response - aligned to the left */}
            <div className="flex justify-start mb-4 items-center">
                <img src="/images/Avatar_UI.jpg" className="w-12 h-12 rounded-full" alt="Avatar" />
                <div className="p-4 bg-gray-100 text-black rounded-lg max-w-xs break-words text-lg">
                    <p className="text-xl">{message.bot_response}</p>
                </div>
            </div>
        </div>
    );
};

export default MessageItem;
