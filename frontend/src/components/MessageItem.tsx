import React, { useState } from 'react';
import { Message } from '../services/api';

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

    /*
    Rendered component:
        - when isEditing, message is shown in editable input field
        where user can modify editText
        - else, msg shown as plain text
        - handleSave will make isEditing false and 
        call parent edit handler with updated text

        - while isEditing, display save and cancel buttons
        - else, display edit and delete buttons
    */

    return (
        <div className="message-item">
            <div>
                <strong>User:</strong>{' '}
                {isEditing ? (
                <input
                    type="text"
                    value={editText}
                    onChange={e => setEditText(e.target.value)}
                />
                ) : (
                message.user_message
                )}
            </div>
            <div>
                <strong>Bot:</strong> {message.bot_response}
            </div>
            <div className="actions">
                {isEditing ? (
                <>
                    <button onClick={handleSave}>Save</button>
                    <button onClick={() => setIsEditing(false)}>Cancel</button>
                </>
                ) : (
                <>
                    <button onClick={() => setIsEditing(true)}>Edit</button>
                    <button onClick={() => onDelete(message.id)}>Delete</button>
                </>
                )}
            </div>
        </div>
    );
};

export default MessageItem;
