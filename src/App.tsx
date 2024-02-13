import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Drawer } from './components/Drawer';
import { TabscComponent } from './components/TabscComponent';

function App() {
  return (
    <div className="App">
            <Drawer />
            <TabscComponent />

    </div>
  );
}

export default App;
