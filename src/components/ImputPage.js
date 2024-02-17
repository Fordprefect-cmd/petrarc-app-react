import { useState } from 'react';
import TextInput from './TextInput';


function ImputPage() {
  const [response, setResponse] = useState('');

  const handleResponse = (responseData) => {
    console.log('responseData', responseData);
    setResponse(responseData);
    
  };

  return (
    <div>
        
        <TextInput onResponse={handleResponse} />
        
    </div>
  );
}

export default ImputPage;
