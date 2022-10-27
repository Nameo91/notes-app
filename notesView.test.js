/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const NotesModel = require('./notesModel');
const NotesView = require('./notesView');
const NotesClient = require('./notesClient');

require('jest-fetch-mock').enableMocks()

describe('Page view', () => {
  beforeEach(() => {
    document.body.innerHTML = fs.readFileSync('./index.html');
    fetch.resetMocks();
  });

  it('displays each note in <div>', () => {  
    const model = new NotesModel();
    const view = new NotesView(model);

    model.addNote('This is a note');
    view.displayNotes();
      
    expect(document.querySelectorAll('div.note').length).toBe(1);
  })
  
  xit('clears the previous notes when new note added', () => {
    const model = new NotesModel();
    const view = new NotesView(model);

    model.addNote('This is a new note');
    model.addNote('This is another note');
    view.displayNotes();
    view.displayNotes();
  
    expect(document.querySelectorAll('div.note').length).toBe(2);
  
  })

  xit('clicks the add note button and displays the note', () => {
    const model = new NotesModel();
    const mockedClient = {
      createNote: (cb) => { 
        cb('A new note created!') 
      }
    }
    const view = new NotesView(model, mockedClient);

    const inputEl = document.querySelector('#note-input');
    inputEl.value = 'A new note created!';

    const buttonEl = document.querySelector('#add-note-button');
    buttonEl.click();
    
    expect(document.querySelectorAll('div.note').length).toBe(1);
    expect(document.querySelectorAll('div.note')[0].textContent).toBe('This is a new note from API'); 
  })
  
  xit('adds notes from API data', () => {
    const mockedClient = {
      loadNotes: (cb) => {
        const mockedData = ['This is a new note'] 
        cb(mockedData);
      }
    } 
    const model = new NotesModel();
    const view = new NotesView(model, mockedClient);

    view.displayNotesFromApi();

    expect(document.querySelectorAll('div.note').length).toEqual(1);
  })

  xit('displays an error message', () =>  {
    const model = new NotesModel();
    const view = new NotesView(model);
    view.displayError();

    expect(document.querySelector('.error').textContent).toBe('Oops, something went wrong!');
  });
})