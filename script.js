// Fetch JSON data from input.json
async function fetchJsonData() {
    const response = await fetch('input.json');
    const data = await response.json();
    return data;
  }
  
  // Generate the message for a given language
  function generateMessage(language, data) {
    let message = '';
  
    if (language === 'af') {
      message = data.banner_message;
    } else {
      // You can add more cases for different languages here
      message = 'Language not supported.';
    }
  
    return message;
  }
  
  // Main function to output the message for the 'af' language
  async function displayAfrikaansMessage() {
    const data = await fetchJsonData();
    const message = generateMessage('af', data);
  
    // Display the message in the console (you can replace this with your desired output method)
    console.log(message);
  }
  
  // Run the function to display the message
  displayAfrikaansMessage();
  