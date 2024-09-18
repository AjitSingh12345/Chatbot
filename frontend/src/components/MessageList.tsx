import React from 'react';
import { Message } from '../services/api';
import MessageItem from './MessageItem';

/*
Renders list of all messages in the chat bot (conversation history)

Expected properties to be passed to this component:
- Array of Message objects (according to interface in api)
- handler triggered when user wants to edit a message
- handler triggered when user wants to delete a message

*/

interface Props {
  messages: Message[];
  onEdit: (id: number, text: string) => void;
  onDelete: (id: number) => void;
}

/*
Renders list of messages using map function to render MessageItem component for each indiv msg
- MessageItem takes edit and delete handlers as props
- MessageItem needs unqiue key so React can detect changes in components rendered
*/

const MessageList: React.FC<Props> = ({ messages, onEdit, onDelete }) => {
  return (
    <div className="p-4 flex flex-col space-y-4">
      {messages.map(msg => (
        <MessageItem key={msg.id} message={msg} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default MessageList;
