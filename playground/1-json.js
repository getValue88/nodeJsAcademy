const fs = require('fs');
/* 
const book = {
    title: 'Ego is the Enemy',
    author: 'Ryan Holiday'
};

const bookJSON = JSON.stringify(book);
fs.writeFileSync('1-json.json', bookJSON);
 */

/* 
const dataBuffer = fs.readFileSync('1-json.json');
const dataJSON = dataBuffer.toString();
const data = JSON.parse(dataJSON);
console.log(data.title);
 */


//CHALLENGE

const dataBuffer = fs.readFileSync('1-json.json'); //read from file -> returns a buffer
const dataJSON = dataBuffer.toString(); // parse buffer into string
const data = JSON.parse(dataJSON); // parse string into json

//override json
data.name = 'Francisco';
data.age = 31;

const newDataJSON = JSON.stringify(data); //parse json into string
fs.writeFileSync('1-json.json', newDataJSON); //override file with the new data