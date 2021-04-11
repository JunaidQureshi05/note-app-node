const fs = require('fs');
const chalk = require('chalk');

const listNotes = () => {
  console.log(chalk.bgWhite.black('Yours Notes...'));
  const notes = loadNotes();
  notes.forEach((note, idx) => console.log(`${idx + 1}.${note.title}`));
};

const addNote = (title, body) => {
  const notes = loadNotes();
  const duplicateNotes = notes.find((note) => note.title === title);
  if (duplicateNotes) {
    console.log(chalk.bgRed('Note title already taken...'));
  } else {
    notes.push({
      title: title,
      body: body,
    });
    saveNotes(notes);
    console.log(chalk.green('Note added...'));
  }
};

const loadNotes = () => {
  try {
    const bufferData = fs.readFileSync('./notes.json');
    const jsonData = bufferData.toString();
    const notes = JSON.parse(jsonData);
    return notes;
  } catch (e) {
    return [];
  }
};

const saveNotes = (notes) => {
  const data = JSON.stringify(notes);
  fs.writeFileSync('./notes.json', data);
};
const removeNote = (title) => {
  const notes = loadNotes();
  const NotesToKeep = notes.filter((note) => note.title != title);
  if (NotesToKeep.length === notes.length) {
    console.log(chalk.bgRed('No note found!'));
  } else {
    saveNotes(NotesToKeep);
    console.log(chalk.bgGreen('Note removed !'));
  }
};

const readNote = (title) => {
  const notes = loadNotes();
  const note = notes.find((note) => note.title === title);
  if (note) {
    console.log(chalk.bgMagenta.white(note.title));
    console.log(note.body);
  } else {
    console.log(chalk.red('Note not found...'));
  }
};

module.exports = {
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNote: readNote,
};
