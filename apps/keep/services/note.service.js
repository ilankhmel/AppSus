import { utilService } from '../../../services/util.service.js';
import { storageService } from '../../../services/async-storage.service.js';

const NOTES_KEY = 'notes';

export const noteService = {
  query,
  updateNoteElement,
  deleteNote,
  copyNote,
  getEmptyNoteByType,
  addNewNote,
  addTodoNote,
};

var gNotes = [
  {
    id: 'n101',
    type: 'note-text',
    info: {
      txt: "I'm tired ! let's go to bed :) ",
    },
    isPinned: true,
    style: { backgroundColor: '#A7FFEB' },
  },
  {
    id: 'n102',
    type: 'note-img',
    isPinned: false,
    info: {
      url: 'https://www.travisneighborward.com/wp-content/uploads/2016/11/New-York-City-by-Noel-Moore-Shutterstock.jpg',
      title: 'Travel NYC 2021',
    },
    style: { backgroundColor: '#E6C9A8' },
  },
  {
    id: 'n112',
    type: 'note-video',
    isPinned: true,
    info: {
      url: 'https://www.youtube.com/embed/FqtluwhNts8',
      title: '🚿🚿🚿🚿',
    },
    style: { backgroundColor: '#D7AEFB' },
  },
  {
    id: 'n103',
    type: 'note-todos',
    isPinned: false,
    info: {
      label: 'Get my stuff together',
      todos: [
        { txt: 'Driving liscence', doneAt: true },
        { txt: 'Coding power', doneAt: false },
      ],
    },
    style: { backgroundColor: '#D7AEFB' },
  },
  {
    id: 'n109',
    type: 'note-text',
    isPinned: false,
    info: {
      txt: 'I need a holiday 🏖',
    },
    style: { backgroundColor: '#AECBFA' },
  },
  {
    id: 'n111',
    type: 'note-img',
    isPinned: false,
    info: {
      url: 'https://m.media-amazon.com/images/S/assets.wholefoodsmarket.com/storepages/seo/stores-og.png',
      title: 'eat fresh veggies',
    },
    style: { backgroundColor: '#CCFF90' },
  },
  {
    id: 'n114',
    type: 'note-text',
    isPinned: false,
    info: {
      txt: 'A holiday is a day set aside by custom or by law on which normal activities, especially business or work including school, are suspended or reduced. Generally, holidays are intended to allow individuals to celebrate or commemorate an event or tradition of cultural or religious significance. Holidays may be designated by governments, religious institutions, or other groups or organizations',
    },
    style: { backgroundColor: '#CBF0F8' },
  },
  {
    id: 'n113',
    type: 'note-img',
    isPinned: true,
    info: {
      url: 'https://sp-ao.shortpixel.ai/client/q_glossy,ret_img,w_370,h_370/https://mylittletelaviv.com/wp-content/uploads/2015/12/Roladin_00242.jpg',
      title: 'Hanuka is coming',
    },
    style: { backgroundColor: '#E6C9A8' },
  },
  {
    id: 'n105',
    type: 'note-text',
    isPinned: false,
    info: {
      txt: '🍫chocolate is life',
    },
    style: { backgroundColor: '#E8EAED' },
  },
  {
    id: 'n106',
    type: 'note-img',
    isPinned: false,
    info: {
      url: 'https://cdn.britannica.com/88/80588-050-8D944BFE/Leaning-Tower-of-Pisa-Italy.jpg',
      title: 'Eat Piza',
    },
    style: { backgroundColor: '#fff475' },
  },
  {
    id: 'n104',
    type: 'note-img',
    isPinned: false,
    info: {
      url: 'https://images.unsplash.com/photo-1529778873920-4da4926a72c2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y3V0ZSUyMGNhdHxlbnwwfHwwfHw%3D&w=1000&q=80',
      title: 'Bobi and Me',
    },
    style: { backgroundColor: '#A7FFEB' },
  },
  {
    id: 'n108',
    type: 'note-img',
    isPinned: false,
    info: {
      url: 'https://www.timeforkids.com/wp-content/uploads/2019/09/final-cover-forest.jpg?w=1024',
      title: 'hike away',
    },
    style: { backgroundColor: '#FBBC04' },
  },
  {
    id: 'n110',
    type: 'note-todos',
    isPinned: false,
    info: {
      label: 'this week',
      todos: [
        { txt: 'food shop', doneAt: false },
        { txt: 'go for a run', doneAt: true },
        { txt: 'laundry 😑', doneAt: true },
      ],
    },
    style: { backgroundColor: '#D7AEFB' },
  },
  {
    id: 'n107',
    type: 'note-img',
    isPinned: false,
    info: {
      url: 'https://resizing.flixster.com/wIOt7bUI2l08FXDy1cNiJnYoxVw=/ems.cHJkLWVtcy1hc3NldHMvdHZzZWFzb24vUlRUVjkxNDYxMy53ZWJw',
      title: 'LUPIN',
    },
    style: { backgroundColor: '#E6C9A8' },
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

function getEmptyNoteByType(type) {
  var newNote = {
    id: utilService.makeId(),
    type: type,
    isPinned: false,
    style: { backgroundColor: '#D7AEFB' },
  };
  switch (type) {
    case 'note-text':
      newNote.info = { txt: '' };
      break;
    case 'note-img':
      newNote.info = { url: '', title: '' };
      break;
    case 'note-video':
      newNote.info = { url: '', title: '' };
      break;
  }
  // return query().then((notes) => {
  //   notes.push(newNote);
  //   utilService.saveToStorage(NOTES_KEY, notes);
  //   return newNote;

  return new Promise((resolve) => {
    resolve(newNote);
  });
}

function addNewNote(newNote) {
  newNote.isPinned = false;
  console.log(newNote.type);
  switch (newNote.type) {
    case 'note-img':
      console.log(newNote.info.txt);
      newNote.info.url = newNote.info.txt;
      newNote.info.title = 'New';
      break;
    case 'note-video':
      newNote.info.url = newNote.info.txt;
      newNote.info.title = 'New';
      break;
  }
  return query().then((notes) => {
    notes.push(newNote);
    utilService.saveToStorage(NOTES_KEY, notes);
    return notes;
  });
}

function addTodoNote(todos) {
  const todosArr = todos.map((todo) => {
    return { txt: todo, doneAt: null };
  });
  const todoNote = {
    type: 'note-todos',
    id: utilService.getRandomId(),
    isPinned: false,
    backgroundColor: '#fffd88',
    info: {
      todos: todosArr,
    },
  };
  return query().then((notes) => {
    notes.push(todoNote);
    utilService.saveToStorage(NOTES_KEY, notes);
    return notes;
  });
}
