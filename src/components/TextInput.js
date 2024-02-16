import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const TextInput = ({ onSendRequest }) => {
  const [text, setText] = useState('');

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const handleButtonClick = () => {
    const formData = {
      multiline_input: text
    };
    onSendRequest(formData); // Call the onSendRequest function with the form data
  };

  return (
    <div className='poesia-imput+bottone'>
      <div className='poesia-imput'>
        <TextField
          id="standard-multiline-flexible"
          label=""
          multiline
          placeholder="Scrivi qui il tuo testo, vai a capo per un nuovo verso"
          variant="standard"
          style={{ width: '70%' }}
          inputProps={{ style: { color: 'white' } }}
          value={text}
          onChange={handleChange}
        />
      </div>
      <div className='bottone-invia-poesia'>
        <Button variant="contained" onClick={handleButtonClick}>Invia</Button>
      </div>
    </div>
  );
};

export default TextInput;
