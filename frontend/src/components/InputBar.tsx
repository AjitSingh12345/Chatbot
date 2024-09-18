import React, { useState } from 'react';

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
    - prevent default form submission behavior 
    - if text isnt empty, call onSend (from parent component)
      & clear input field by updating state to empty 
     */
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (text.trim()) {
            onSend(text);
            setText('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="input-bar">
            <input
                type="text"
                value={text}
                onChange={e => setText(e.target.value)}
                placeholder="Type your message..."
            />
            <button type="submit">Send</button>
        </form>
    );
};

export default InputBar;
