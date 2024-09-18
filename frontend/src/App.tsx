import React from 'react';
import ChatWidget from './components/ChatWidget';
import './App.css';

/*
App component definition
Entry point of application

- App is a container for chat widget component
- renders chat widget on page
*/

const App: React.FC = () => {
  return (
    <div className="flex justify-center mt-10">
      <ChatWidget />
    </div>
  );
}

export default App;
