const NotesClient = require('./notesClient');

require('jest-fetch-mock').enableMocks()

describe('NotesClient class', () => {
  it('calls fetch and loads note', (done) => {
    const client = new NotesClient();
    fetch.mockResponseOnce(JSON.stringify({
      notes: 'This is a note'
    }));

    client.loadNotes((returnedDataFromApi) => {
      expect(returnedDataFromApi.notes).toBe('This is a note');

      done();
    });
  });

  // it('adds a new note and loads all notes', (done) => {
  //   const client = new NotesClient();
  //   fetch.mockResponseOnce(JSON.stringify({
  //     content: 'This is a note'
  //   }));

  //   client.createNote('This is a new note')
   
  //   client.loadNotes((returnedDataFromApi) => {
  //     expect(returnedDataFromApi.notes).toEqual('This is a note');

  //     done();
  //   });
  // });
})