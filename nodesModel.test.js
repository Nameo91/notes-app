const NotesModel = require('./notesModel')

describe("model",() => {
  it("returns an empty arry", () => {
    const model = new NotesModel();

    expect(model.getNotes()).toEqual([]);
  })

  it("adds some notes and return them", () => {
    const model = new NotesModel();

    model.addNote('Buy milk');
    model.addNote('Go to the gym');

    expect(model.getNotes()).toEqual(['Buy milk', 'Go to the gym']);
  })

  it("resets the list of notes", () => {
    const model = new NotesModel();

    model.addNote('Buy milk');
    model.addNote('Go to the gym');
    model.reset();

    expect(model.getNotes()).toEqual([]);
  })
})