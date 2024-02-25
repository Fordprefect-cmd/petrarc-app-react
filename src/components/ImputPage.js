// ImputPage.js 

import TextInput from './TextInput';
import { useState } from 'react';


function ImputPage({ onResponse, inputText, onInputChange }) {
  const [responseData, setResponseData] = useState(null);
  const handleResponse = (responseData) => {
    console.log('responseData', responseData);
    onResponse(responseData); // Call the function passed from parent
    setResponseData(responseData);
  
  };

  return (
    <div>
      <TextInput onResponse={handleResponse} axiosdata={responseData} inputText={inputText} onInputChange={onInputChange} />
    </div>
  );
}

export default ImputPage;
