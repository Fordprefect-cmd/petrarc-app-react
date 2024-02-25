// AxiosRequest.js
import axios from 'axios';

async function AxiosRequest(formData, onResponse) {
  axios.post('http://petrarcapp.pythonanywhere.com/get_tables', formData)
    .then(response => {
      console.log('response.data:',response.data);
      onResponse(response.data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

export default AxiosRequest;
