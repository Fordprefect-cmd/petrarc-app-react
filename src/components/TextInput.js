// TextInput.js

import { useState } from 'react';
import AxiosRequest from './AxiosRequest';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function TextInput({ onResponse, axiosdata, inputText, onInputChange, responseData }) {

  
  const handleInputChange = (event) => {

    onInputChange(event);
  };

  const AxiosRequestHandler = async () => {
    
  }

  const handleSubmit =  () => {
    const formData = {
      multiline_input: inputText
    };
    
  AxiosRequest(formData, onResponse);
   
    
    //formatText(response)

  };

  // Function to add CSS class to words based on "Trovata" column in responseData
  const highlightWords = (word) => {
    if (responseData) {
      for (const response of responseData) {
        for (const table of response.response.table1) {
          if (table.Trovata && table.Parola === word) {
            console.log(word)
            return 'highlighted-word';
          }
        }
      }
    }
    return '';
  };

  const handleSubmitHighlight = () => {
    
    console.log('responseHighlight:', axiosdata);
    
    
  }

  // Function to split input text into words and apply CSS classes
  const formatText = (inputText) => {
    console.log(inputText);

   // return inputText.split(' ').map((word, index) => (
    //  <span key={index} className={highlightWords}>
    //    {word}{' '}
   //   </span>
  //  ));
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
      <div>
        <Button className='bottone_invia_poesia' variant="contained" onClick={handleSubmit}>Invia</Button>
        <Button className='bottone_invia_highlight' variant="contained" onClick={handleSubmitHighlight}>highlight</Button>
  
      
    </div>
    </div>
  );
}

export default TextInput;
