const notes = require('./notes.js');
const chalk = require('chalk');
const yargs = require('yargs');
const { demandOption } = require('yargs');

// Customize yargs version
yargs.version('1.1.0');

// Create add command
yargs.command({
  command: 'add',
  describe: 'add new note',
  builder: {
    title: {
      describe: 'note title',
      demandOption: true,
      type: 'string',
    },
    body: {
      describe: 'note body',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    notes.addNote(argv.title, argv.body);
  },
});

// Create remove command
yargs.command({
  command: 'remove',
  describe: 'remove a note',
  builder: {
    title: {
      describe: 'note title',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    notes.removeNote(argv.title);
  },
});

// list all notes
yargs.command({
  command: 'list',
  describe: 'list out all notes',
  handler() {
    notes.listNotes();
  },
});

// read
yargs.command({
  command: 'read',
  describe: 'read note',
  builder: {
    title: {
      describe: 'title of note',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    notes.readNote(argv.title);
  },
});

yargs.parse();
