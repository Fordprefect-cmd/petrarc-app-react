import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios'; // Importa axios per fare richieste AJAX

export const TextInput = () => {
  const [text, setText] = useState('');

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const handleSubmit = () => {
    // Crea un oggetto con la struttura richiesta
    const formData = {
      multiline_input: text
    };

    // Effettua una richiesta POST al backend Flask con i dati del modulo
    axios.post('http://localhost:5000/get_tables', formData)
      .then(response => {
        // Gestisci la risposta del server qui se necessario
        console.log(response);
      })
      .catch(error => {
        // Gestisci eventuali errori qui
        console.error('Errore durante la richiesta al server:', error);
      });
      
    // Log the data being sent to the server
    console.log('Data sent to server:', formData);
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
        <Button variant="contained" onClick={handleSubmit}>Invia</Button>
      </div>
    </div>
  );
};

export default TextInput;
