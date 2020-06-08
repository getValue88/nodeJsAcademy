const yargs = require('yargs');
const notes = require('./notes');

//Customize yargs version
yargs.version('1.1.0');

//Create add command
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note body',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        const { title, body } = argv;
        notes.addNote(title, body);
    }
});


//Create remove command
yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        const { title } = argv;
        notes.removeNote(title);
    }
});


//Create list command
yargs.command({
    command: 'list',
    describe: 'List notes',
    handler() {
        notes.listNotes();
    }
});


//Create read command
yargs.command({
    command: 'read',
    describe: 'Read a note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        const { title } = argv;
        notes.readNote(title);
    }
});


yargs.parse();