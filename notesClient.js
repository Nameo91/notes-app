class NotesClient {
  #URL = 'http://localhost:3000/notes';
  #emojiURL = 'https://makers-emojify.herokuapp.com/';

  loadNotes(cb, displayError) {
    fetch(this.#URL)
      .then(response => response.json())
      .then(data => {
        console.log('All notes loaded')
        cb(data)
      })
      .catch(error => {
        displayError(error);
      });
  }

  createNote(newNoteFromAPI, displayError) {
    const content = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: newNoteFromAPI })
    }
    fetch(this.#URL, content)
      .then(response => response.json())
      .then(data => {
        console.log('New note created!')
      })
      .catch(error => {
        console.log('error');
        displayError(error);
    });
  }

  getEmojis(emojiString, cb) {
    const content = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: emojiString })
    }

    fetch(this.#emojiURL, content)
      .then((response) => response.json())
      .then((emojis) => {
        cb(emojis.emojified_text)
    });
  }

  resetNotes(displayError) {
    const content = {
      method: 'DELETE'
    }

    fetch(this.#URL, content)
      .then((response) => response.json())
      .then(data => {
        console.log('All previous notes are deleted!');
      })
      .catch(error => {
        console.log('An error occurred')
        displayError(error)
    });
  }
}
  
  module.exports = NotesClient;

