import React from 'react';
import ChatWidget from './components/ChatWidget';
import './App.css';

/*
App component definition
Entry point of application

- App is a container for chat widget component
- renders chat widget on page
- App.css file styles layout
*/

function App() {
  return (
    <div className="App">
      <ChatWidget />
    </div>
  );
}

export default App;
