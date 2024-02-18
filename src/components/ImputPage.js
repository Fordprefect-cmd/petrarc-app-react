import TextInput from './TextInput';


function ImputPage() {
  
  const handleResponse = (responseData) => {

    console.log('responseData', responseData);

    
  };

  return (
    <div>
        
        <TextInput onResponse={handleResponse} />
        
    </div>
  );
}

export default ImputPage;
