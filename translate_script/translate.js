// require('fs') is a Node.js module that allows you to interact with the file system
const fs = require('fs');
// require('path') is a Node.js module that allows you to work with file and directory paths
const path = require('path');

// Get a list of all input files starting with input and ending with json in the current directory
// but sort the English file first because that will be the default language
// default language goes at the top of the output files
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
inputFiles.forEach(inputFile => {
  // Extract the language code from the input file name
  const languageCode = path.basename(inputFile, '.json').split('-')[1];

  // Read the input file
  const input = fs.readFileSync(inputFile);
  const data = JSON.parse(input);

  // Generate the output-message.html file
  let outputMessage = '';
  // en stands for English and is the default language
  // always check to see if the language code is 'en' first
  if (languageCode === 'en') {
    outputMessage = `{% if $\{language\} == 'en' %}\n${data.banner_message}\n`;
  } else {
    outputMessage = `{% elsif $\{language\} == '${languageCode}' %\}\n${data.banner_message}\n`;
  }
  // use appendFileSync to append the outputMessage to the output-message.html file so that the file isn't overwritten each time
  fs.appendFileSync('output-message.html', outputMessage);

  // Generate the output-title.html file
  let outputTitle = '';
  if (languageCode === 'en') {
    outputTitle = `{% if $\{language\} == 'en' %}\n${data.banner_title}\n`;
  } else {
    outputTitle = `{% elsif $\{language\} == '${languageCode}' %\}\n${data.banner_title}\n`;
  }
  // use appendFileSync to append the outputTitle to the output-title.html file so that the file isn't overwritten each time
  fs.appendFileSync('output-title.html', outputTitle);
});
