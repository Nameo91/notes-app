const NotesModel = require('./notesModel');
const View = require('./notesView');
const Notesclient = require('./notesClient');

const client = new Notesclient();
const model = new NotesModel();
const view = new View(model, client);

client.loadNotes((notes) => {
  model.setNotes(notes);
  view.displayNotes();
}, () => {

  view.displayError();
});
