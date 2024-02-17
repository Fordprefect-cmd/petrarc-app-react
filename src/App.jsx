// App.js
import { useState } from 'react';
import './App.css';
import  Drawer  from './components/Drawer';
import  TabscComponent  from './components/TabscComponent';



function App() {
  const setResponse = useState('');

  return (
    <div>

        <Drawer />
        <TabscComponent />
        
    </div>
  );
}

export default App;
