import { useState, useEffect } from 'react';
import AxiosRequest from './AxiosRequest';
import Button from '@mui/material/Button';

function TextInput({ onResponse, axiosdata}) {
  const [content, setContent] = useState(''); // State to hold the content of the content editable div
  const [highlightWords, setHighlightWords] = useState([]);

  const handleInputChange = (event) => {
    const text = event.target.innerText;
    setContent(text);
  };

  const handleSubmit = () => {
    const formData = {
      multiline_input: content
    };
    console.log("testo inviato:",content)
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

    setHighlightWords(trovataTrueWords);
  }

  useEffect(() => {
    const editor = document.getElementById('editor');
    editor.addEventListener('input', handleInputChange);
    return () => {
      editor.removeEventListener('input', handleInputChange);
    };
  }, []);

  useEffect(() => {
    const editor = document.getElementById('editor');
    let text = editor.innerText;

    // Reset the innerHTML
    editor.innerHTML = text;

    // Highlight the words
    highlightWords.forEach(word => {
      const regex = new RegExp(`\\b${word}\\b`, 'gi');
      text = text.replace(regex, `<span style="background-color: yellow;">${word}</span>`);
    });

    editor.innerHTML = text;
  }, [highlightWords]);

  return (
    <div className='poesia_imput_bottone'>
      <div id="editor" className='poesia-imput' contentEditable={true}></div>
      <div>
        <Button className='bottone_invia_poesia' variant="contained" onClick={handleSubmit}>Invia</Button>
        <Button className='bottone_invia_highlight' variant="contained" onClick={handleSubmitHighlight}>highlight</Button>
      </div>
    </div>
  );
}

export default TextInput;
