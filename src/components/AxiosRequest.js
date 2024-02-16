// AxiosRequest.js
import axios from 'axios';

function AxiosRequest(formData, onResponse) {
  axios.post('http://localhost:5000/get_tables', formData)
    .then(response => {
      console.log(response.data);
      onResponse(response.data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

export default AxiosRequest;
