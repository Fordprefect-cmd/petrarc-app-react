// ImputPage.js 

import TextInput from './TextInput';

function ImputPage({ onResponse, inputText, onInputChange }) {
  
  const handleResponse = (responseData) => {
    console.log('responseData', responseData);
    onResponse(responseData); // Call the function passed from parent
  };

  return (
    <div>
      <TextInput onResponse={handleResponse} inputText={inputText} onInputChange={onInputChange} />
    </div>
  );
}

export default ImputPage;
