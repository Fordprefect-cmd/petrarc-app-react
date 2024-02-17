// App.js
import { useState } from 'react';
import './App.css';
import  Drawer  from './components/Drawer';
import  TabscComponent  from './components/TabscComponent';
import TextInput from './components/TextInput';
import RenderTables from './components/RenderTables';


function App() {
  const [response, setResponse] = useState('');

  const handleResponse = (responseData) => {
    console.log('responseData - App level:', responseData);
    setResponse(responseData);
  };

  return (
    <div>
        <Drawer />
        <TabscComponent />
        <TextInput onResponse={handleResponse} />
        <RenderTables  response={response}  />
        
    </div>
  );
}

export default App;
