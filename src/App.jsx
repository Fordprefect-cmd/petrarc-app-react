// App.js
import { useState } from 'react';
import  Drawer  from './components/Drawer';
import  TabscComponent  from './components/TabscComponent';
import TextInput from './components/TextInput';

function App() {
  const [response, setResponse] = useState('');

  const handleResponse = (responseData) => {
    setResponse(responseData);
  };

  return (
    <div>
        <Drawer />
        <TabscComponent />
      <TextInput onResponse={handleResponse} />
    </div>
  );
}

export default App;
