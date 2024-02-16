// TextInputWithButton.js
import { useState } from 'react';
import AxiosRequest from './AxiosRequest';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function TextInput({ onResponse }) {
  const [inputText, setInputText] = useState('');

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleSubmit = () => {
    const formData = {
      multiline_input: inputText
    };
    AxiosRequest(formData, onResponse);



  };

  return (
    <div className='poesia_imput_bottone'>
      <div className='poesia-imput'>
        <TextField
          id="standard-multiline-flexible"
          label=""
          multiline
          placeholder="Scrivi qui il tuo testo, vai a capo per un nuovo verso"
          variant="standard"
          style={{ width: '70%' }}
          inputProps={{ style: { color: 'white' } }}
          value={inputText}
          onChange={handleInputChange}
        />
      </div>
      <div className='bottone_invia_poesia'>
        <Button variant="contained" onClick={handleSubmit}>Invia</Button>
      </div>
    </div>
  );
}

export default TextInput;


 
