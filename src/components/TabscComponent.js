import React, { useState } from 'react'; // Import useState

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

export const TabscComponent = () => {
  // Declare state for value
  const [value, setValue] = useState(0); // Initialize with an initial value (e.g., 0)

  // Handle tab change
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
        <Tab label="Item One" />
        <Tab label="Item Two" />
        <Tab label="Item Three" />
      </Tabs>
    </div>
  );
};

export default TabscComponent;
