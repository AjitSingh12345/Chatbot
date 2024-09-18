import React, { useState } from 'react';
import { FaPaperPlane } from 'react-icons/fa'; 


/*
Defines InputBar compoent where users can type and send messages
- comprised of text input field & submit button

Properties inherited:
- onSend handler called when user submits a message
*/

interface Props {
    onSend: (text: string) => void;
}

const InputBar: React.FC<Props> = ({ onSend }) => {
    // state of current text in input field
    const [text, setText] = useState<string>('');

    /*
    if text isnt empty, call onSend (from parent component)
      & clear input field by updating state to empty 
     */
    const handleSubmit = () => {
        if (text.trim()) {
            onSend(text);
            setText('');
        }
    };

    return (
        <div className="p-4 flex items-center space-x-4 border-t border-gray-200">
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Your question..."
                className="flex-grow p-3 border rounded-lg text-lg"
            />
            <button onClick={handleSubmit} className="text-black p-3 rounded-lg text-lg hover:bg-gray-100">
                <FaPaperPlane /> 
            </button>
        </div>
    );
};

export default InputBar;
