// TextInputWithButton.js
import React, { useState } from 'react';
import AxiosRequest from './AxiosRequest';

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
    setInputText('');



  };

  return (
    <div>
      <input type="text" value={inputText} onChange={handleInputChange} />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default TextInput;
