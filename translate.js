// Fetch JSON data from the file with the given name
async function fetchJsonData(language) {
    const fileName = `input-${language}.json`;
    const response = await fetch(fileName);
    const data = await response.json();
    return data;
  }
  
  // Main function to output the message for the given language
  async function displayMessage(language) {
    const data = await fetchJsonData(language);
    // Display the message in the console (you can replace this with your desired output method)
    console.log(data.banner_message);
  }
  
  // Run the function to display the message for the 'af' language
  displayMessage('af');
  