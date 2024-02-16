import { useState } from 'react';
import axios from 'axios';

const AxiosRequest = (props) => {
  const [responseData, setResponseData] = useState(null);

  axios.post('http://localhost:5000/get_tables', props.formData)
    .then(response => {
      // call function to app
      setResponseData(response.data); // Fixing this line to set the response data to state
    })
    .catch(error => {
      setResponseData(error); // Fixing this line to set the error to state
    }); 
  
  return null; // Non restituiamo nulla poiché questo componente si occupa solo di fare la richiesta
};

export default AxiosRequest;
