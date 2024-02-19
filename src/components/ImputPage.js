import TextInput from './TextInput';

function ImputPage({ onResponse }) {
  
  const handleResponse = (responseData) => {
    console.log('responseData', responseData);
    onResponse(responseData); // Call the function passed from parent
  };

  return (
    <div>
      <TextInput onResponse={handleResponse} />
    </div>
  );
}

export default ImputPage;
