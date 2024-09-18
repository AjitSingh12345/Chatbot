import axios from 'axios';

/*
API service that interacts with chatbot backend 
- uses axios to make HTTP requests
- communicates with FastAPI backend (running on URL)
*/

const API_URL = 'http://127.0.0.1:8000';

// defines structure of Message object
export interface Message {
  id: number;
  user_message: string;
  bot_response: string;
  timestamp: string;
}

/*
makes GET request to /messages/ endpoint 
- retrieves all messages from backend
- return promise that resolves to array of Message objects
*/
 export const fetchMessages = async (): Promise<Message[]> => {
  const response = await axios.get(`${API_URL}/messages/`);
  return response.data;
};

/*
makes POST request to /messages/ endpoint
- sends new user message to backend where bot returns a response
- returns promise that resolves to a Message object 
*/
export const sendMessage = async (user_message: string): Promise<Message> => {
  const response = await axios.post(`${API_URL}/messages/`, { user_message });
  return response.data;
};

/*
makes PUT request to /messages/{id}/ endpoint where id is of message you want to edit
- sends updated user message to modify existing message
- returns promise that resolves to updated Message object 
*/
export const editMessage = async (id: number, user_message: string): Promise<Message> => {
  const response = await axios.put(`${API_URL}/messages/${id}/`, { user_message });
  return response.data;
};

/*
makes DELETE request to /messages/{id}/ endpoint where id is of message you want to delete
- void return type 
*/
export const deleteMessage = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/messages/${id}/`);
};
