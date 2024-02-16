import React, { useState } from 'react';
import './App.css';
import { Drawer } from './components/Drawer';
import { TabscComponent } from './components/TabscComponent';
import TextInput from './components/TextInput';
import axios from 'axios';
import AxiosRequest from './components/AxiosRequest'; // Import the AxiosRequest component


function App() {
  const [responseData, setResponseData] = useState(null);

  const handleAxiosSuccess = (data) => {
    setResponseData(data);
  };

  const handleAxiosError = (error) => {
    console.error('Error during the request to the server:', error);
    // Handle errors here
  };

  const sendRequest = (formData) => {
    axios.post('http://localhost:5000/get_tables', formData)
      .then(response => {
        handleAxiosSuccess(response.data);
      })
      .catch(error => {
        handleAxiosError(error);
      }); 
  };

  return (
    <div className="App">
      <Drawer />
      <TabscComponent />
      <TextInput onSendRequest={sendRequest} />
      {responseData && <pre>{JSON.stringify(responseData, null, 2)}</pre>}
    </div>
  );
}

export default App;
