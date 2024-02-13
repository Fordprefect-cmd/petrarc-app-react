import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Drawer } from './components/Drawer';
import { TabscComponent } from './components/TabscComponent';
import { TextInput } from './components/TextInput';


function App() {
  return (
    <div className="App">
            <Drawer />
            <TabscComponent />
            <TextInput />
    </div>
  );
}

export default App;
