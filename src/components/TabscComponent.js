// TabscComponent.js

import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ImputPage from './ImputPage';
import RenderTables from './RenderTables';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div className='tabPanel'
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);
  const [responseData, setResponseData] = React.useState(null); // State to hold responseData
  const [inputText, setInputText] = React.useState(''); // State to hold input text

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Function to handle response data from child component
  const handleChildResponse = (data) => {
    setResponseData(data);
    console.log('responseData from TabscComponent:', data); // Logging responseData in parent component
  };

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" centered>
          <Tab label="Item One" {...a11yProps(0)} />
          <Tab label="Item Two" {...a11yProps(1)} />
          <Tab label="Item Three" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        Item One
        {/* Pass handleChildResponse and inputText as props */}
        <ImputPage onResponse={handleChildResponse} inputText={inputText} onInputChange={handleInputChange} />
      </CustomTabPanel>
      
      <CustomTabPanel className='tablePanel' value={value} index={1}>
        Item Two
        <RenderTables responseData={responseData} /> {/* Pass responseData as prop */}
      </CustomTabPanel>
      
      <CustomTabPanel value={value} index={2}>
        Item Three
      </CustomTabPanel>
    </Box>
  );
}
