// require('fs') is a Node.js module that allows you to interact with the file system
const fs = require('fs');
// require('path') is a Node.js module that allows you to work with file and directory paths
const path = require('path');

// Get a list of all input files starting with input and ending with json in the current directory
// but sort the English file first because that will be the default language
// default language goes at the top of the output files
// store the list of files in a variable called inputFiles

const inputFiles = fs.readdirSync('.')
  .filter(filename => filename.startsWith('input-') && filename.endsWith('.json'))
  .sort((a, b) => {
    if (a === 'input-en.json') {
      return -1;
    } else if (b === 'input-en.json') {
      return 1;
    } else {
      return 0;
    }
  });

// Process each input file
// Error handling: if the input file is missing banner_title or banner_message, throw an error
inputFiles.forEach((inputFile, index) => {
  try {
    // Extract the language code from the input file name
    const languageCode = path.basename(inputFile, '.json').split('-')[1];

    // Read the input file
    const input = fs.readFileSync(inputFile);
    const data = JSON.parse(input);

    // Ensure input JSON has banner_title and banner_message
    if (!data.banner_title || !data.banner_message) {
      throw new Error(`Input file ${inputFile} is missing banner_title or banner_message`);
    }

    // Generate the output-message.html file
    let outputMessage = '';
    if (languageCode === 'en') {
      outputMessage = `{% if $\{language\} == 'en' %}\n${data.banner_message}\n`;

      // Add the default message block at the end of the output-message.html file
      defaultMessage = `{% else %}\n${data.banner_message}\n{% endif %}`;
    } else {
      outputMessage = `{% elsif $\{language\} == '${languageCode}' %\}\n${data.banner_message}\n`;
    }
    fs.appendFileSync('output-message.html', outputMessage);

    // Generate the output-title.html file
    let outputTitle = '';
    if (languageCode === 'en') {
      outputTitle = `{% if $\{language\} == 'en' %}\n${data.banner_title}\n`;

      //adds the default title to the end of the output-title.html file
        defaultTitle = `{% else %}\n${data.banner_title}\n{% endif %}`;
    } else {
      outputTitle = `{% elsif $\{language\} == '${languageCode}' %\}\n${data.banner_title}\n`;
    }
    fs.appendFileSync('output-title.html', outputTitle);

    // Add the specified block at the end of the output-title.html file
    if (index === inputFiles.length - 1) {
      fs.appendFileSync('output-message.html', defaultMessage);

      fs.appendFileSync('output-title.html', defaultTitle);
    }
  } catch (error) {
    // catch error message and print it to the console
    console.error(`Error processing ${inputFile}: ${error.message}`);
  }
});
