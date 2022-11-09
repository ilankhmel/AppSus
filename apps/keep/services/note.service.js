import { utilService } from '../../../services/util.service.js';
import { storageService } from '../../../services/async-storage.service.js';

const NOTES_KEY = 'notes';

export const noteService = {
  query,
  updateNoteElement,
  deleteNote,
  copyNote,
};

var gNotes = [
  {
    id: 'n101',
    type: 'note-txt',
    isPinned: true,
    info: { txt: 'Fullstack Me Baby!' },
  },
  {
    id: 'n102',
    type: 'note-img',
    isPinned: false,
    info: { url: 'http://some-img/me', title: 'Bobi and Me' },
    style: { backgroundColor: '#00d' },
  },
  {
    id: 'n103',
    type: 'note-todos',
    isPinned: false,
    info: {
      label: 'Get my stuff together',
      todos: [
        { txt: 'Driving liscence', doneAt: null },
        { txt: 'Coding power', doneAt: 187111111 },
      ],
    },
  },
];

function query() {
  return storageService.query(NOTES_KEY);
}

_createNotes();

function _createNotes() {
  let notes = utilService.loadFromStorage(NOTES_KEY);
  if (!notes || !notes.length) {
    notes = _getgNotes();
    utilService.saveToStorage(NOTES_KEY, notes);
  }
  return notes;
}

function _getgNotes() {
  return gNotes;
}

// find note by note.id
function get(noteId) {
  return storageService.get(NOTES_KEY, noteId);
}

function updateNoteElement(noteId, element, value) {
  return query().then((notes) => {
    var idx = notes.findIndex((note) => note.id === noteId);
    console.log(idx);
    notes[idx][element] = value;
    utilService.saveToStorage(NOTES_KEY, notes);
    return notes;
  });
}

function deleteNote(noteId) {
  return query().then((notes) => {
    var idx = notes.findIndex((note) => note.id === noteId);
    notes.splice(idx, 1);
    utilService.saveToStorage(NOTES_KEY, notes);
    return notes;
  });
}

function copyNote(note) {
  const newNote = JSON.parse(JSON.stringify(note));
  newNote.id = utilService.makeId();
  return query().then((notes) => {
    notes.push(newNote);
    utilService.saveToStorage(NOTES_KEY, notes);
    return notes;
  });
}
