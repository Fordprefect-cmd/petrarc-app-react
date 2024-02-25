import React, { useState, useEffect } from 'react';
import AxiosRequest from './AxiosRequest';
import Button from '@mui/material/Button';
import Quill from 'quill'; // Import Quill
import 'quill/dist/quill.snow.css'; // Import Quill styles

function TextInput({ onResponse, axiosdata, inputText, onInputChange, responseData }) {
  const [quill, setQuill] = useState(null); // State to hold the Quill instance
  const [formattedText, setFormattedText] = useState(); // State to hold the formatted text

  const handleInputChange = async  (delta, oldDelta, source) => {
    if (source === 'user' && quill)  {
      const text = await quill.getText();
      const formattedText = text.trim(); // Trim extra whitespace
      console.log('Formatted Text: in handle iputchange', formattedText);
      setFormattedText(formattedText); // Update the formattedText state

      onInputChange(formattedText);
    }
  };

  const handleSubmit = () => {
    const text = quill.getText();

    const formData = {
      multiline_input: text   //assegna qua formattedText content
     };
     console.log("formData in handlesubmit:", formData )
    AxiosRequest(formData, onResponse);
  };

  const handleSubmitHighlight = () => {
    console.log('responseHighlight:', axiosdata);
    const table1Data = [];
    const table2Data = [];

    // Extract data for Table 1
    axiosdata.ajaxResponses.forEach(response => {
              response.response.table1.forEach(row => {
                  table1Data.push(row);
              });
          });
  
          // Extract data for Table 2
          axiosdata.ajaxResponses.forEach(response => {
              response.response.table2.forEach(row => {
                  table2Data.push(row);
              });
          });
  
    console.log('TabelleHighlight:', table1Data, table2Data);
    
        // Filter words with Trovata === true
        const trovataTrueWords = table1Data.filter(row => row.Trovata === true)
        .map(row => row.Parola);
console.log('Words with Trovata === true:', trovataTrueWords);
    
  }

  // Initialize Quill when component mounts
  useEffect(() => {
    console.log("useEffect called");
    if (!quill) {
      console.log("Initializing Quill");
      const editor = new Quill('#editor', {
        theme: 'snow', // or 'bubble'
      });
      editor.on('text-change', handleInputChange);
      setQuill(editor);
    }
  }, [quill, handleInputChange]);

  // Effect to attach event listener after Quill initialization
useEffect(() => {
  if (quill) {
    const handler = (delta, oldDelta, source) => {
      if (source === 'user') {
        const text = quill.getText();
        const formattedText = text.trim(); // Trim extra whitespace
        console.log('Formatted Text:', formattedText);
        //onInputChange(formattedText);
      }
    };

    quill.on('text-change', handler);

    // Cleanup function to remove event listener when component unmounts
    return () => {
      quill.off('text-change', handler);
    };
  }
}, [quill]);

  return (
    <div className='poesia_imput_bottone'>
      <div id="editor" className='poesia-imput'></div>
      <div>
        <Button className='bottone_invia_poesia' variant="contained" onClick={handleSubmit}>Invia</Button>
        <Button className='bottone_invia_highlight' variant="contained" onClick={handleSubmitHighlight}>highlight</Button>
      </div>
    </div>
  );
}

export default TextInput;
