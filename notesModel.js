class NotesModel{
  constructor() {
    this.notes = [];
  }

  getNotes() {
    return this.notes;
  }

  setNotes(notes) {
    notes.forEach((note) => {
      this.notes.push(note);
    })
    console.log(this.notes);
  }

  addNote(note) {
   this.notes.push(note);
  }

  reset(){
    this.notes = [];
  }
}

module.exports = NotesModel;