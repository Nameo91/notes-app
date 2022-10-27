const NotesClient = require('./notesClient');

require('jest-fetch-mock').enableMocks()

describe('NotesClient class', () => {
  beforeEach(() => {
    fetch.resetMocks()
  })

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

  it('adds a new note and loads all notes', (done) => {
    const client = new NotesClient();

    fetch.mockResponseOnce(JSON.stringify({
      content: "This is a note"
    }));
    
    let newNoteFromAPI = 'This is a note'
    client.createNote(newNoteFromAPI, (returnedDataFromApi) => {
      expect(returnedDataFromApi).toEqual({
        content: "This is a note"
      });

      done();
    })
  });
})