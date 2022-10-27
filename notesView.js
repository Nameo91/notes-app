class NotesView {
  constructor(model, client) {
    this.model = model;
    this.client = client;
    this.mainContainerEl = document.querySelector('#main-container');
    
    this.buttonAddEl = document.querySelector('#add-note-button');
    this.buttonResetEl = document.querySelector('#reset-button');

    this.buttonAddEl.addEventListener('click', () => {
      const newNote = document.querySelector('#note-input').value;
      this.client.createNote((newNote), () => {
        this.addNewNote(newNote);
        this.displayNotes();
      });
    });

    this.buttonResetEl.addEventListener('click', () => {
      this.client.resetNotes(() => {
        this.model.reset();
        this.resetNote();
      })
    })
  }
  
  addNewNote(newNote) {
    this.model.addNote(newNote);
  }

  displayNotes() {
    const notes = this.model.getNotes();

    this.resetNote();
    
    notes.forEach(note => {
      this.client.getEmojis(note, (emojifiedNote) => {
        const noteEl = document.createElement('div');
        noteEl.textContent = emojifiedNote;
        noteEl.className = 'note';


        document.querySelector('#note-input').value = '';
        this.mainContainerEl.append(noteEl);
      })
    })
  }

  resetNote() {
    const notesEl = document.querySelectorAll('.note');

    notesEl.forEach(noteEl => {
      noteEl.remove();
    });
  }

  displayNotesFromApi() {
    this.client.loadNotes((response) => {
      console.log(response);
      this.model.setNotes(response);
      this.displayNotes();
    })
  }
  
  displayError() {
    const errorMessageEl = document.createElement('p');
    errorMessageEl.textContent = 'Oops, something went wrong!';
    errorMessageEl.className = 'error';
    this.mainContainerEl.append(errorMessageEl);
  }
}

module.exports = NotesView;