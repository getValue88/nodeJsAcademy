const fs = require('fs');
const chalk = require('chalk');

const addNote = (title, body) => {
    //load existing notes
    const notes = loadNotes();

    //check for duplicate title note
    const duplicateNote = notes.find(note => note.title === title);

    //if there isn't a note with the incoming title
    if (!duplicateNote) {
        //create a new note object
        const newNote = { title, body };

        //push the new note into notes array
        notes.push(newNote);

        //persist data
        saveNotes(notes);

        console.log(chalk.bgGreen(`New note added! (${newNote.title}).`));

        //return the new note
        return duplicateNote;
    }

    //if there is a duplicated title
    console.log(chalk.bgRed('Note title taken!'));
};


const removeNote = title => {
    //load existing notes
    const notes = loadNotes();

    //filter notes with same title that the incoming parameter
    const updatedNotes = notes.filter(note => note.title !== title);

    //if there is a note title that matches with the incoming parameter
    if (notes.length !== updatedNotes.length) {
        saveNotes(updatedNotes);
        console.log(chalk.bgGreen(`The note was deleted (${title})`));
        return;
    }

    //if there isn't a note with same title that the incoming parameter
    console.log(chalk.bgRed('Note not found'));
};



const listNotes = () => {
    //load existing notes
    const notes = loadNotes();

    console.log(chalk.bold.underline.cyanBright('Your notes...'));

    //print all notes title
    notes.forEach(note => console.log(note.title));
}


const readNote = title => {
    //load existing notes
    const notes = loadNotes();

    //find note by title
    const note = notes.find(note => note.title === title);

    //if note was found
    if (note) {
        console.log(chalk.cyanBright.bold.underline(note.title) + '\n' + note.body);
        return note;
    }

    //if note wasn't found
    console.log(chalk.bgRed('Note not found.'));
}


const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json'); //read from file -> returns a buffer
        const dataJSON = dataBuffer.toString(); //parse buffer into a string
        return JSON.parse(dataJSON); //parse string into json

    } catch (err) {
        return []; // if the file doesn't exists, return an empty array
    }
};


const saveNotes = notes => {
    const notesJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', notesJSON);
}


module.exports = {
    addNote,
    removeNote,
    listNotes,
    readNote
}