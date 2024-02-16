// App.js
import { useState } from 'react';
import TextInput from './components/TextInput';

function App() {
  const [response, setResponse] = useState('');

  const handleResponse = (responseData) => {
    setResponse(responseData);
  };

  return (
    <div>
      <TextInput onResponse={handleResponse} />
    </div>
  );
}

export default App;
