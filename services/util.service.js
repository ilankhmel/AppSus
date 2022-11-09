export const utilService = {
<<<<<<< HEAD
  makeId,
  saveToStorage,
  loadFromStorage,
};

function makeId(length = 5) {
  var txt = '';
  var possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (var i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return txt;
}

function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value) || null);
=======
    saveToStorage,
    loadFromStorage,
    makeId
}

function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value) || null)
}

function loadFromStorage(key) {
    let data = localStorage.getItem(key)
    return (data) ? JSON.parse(data) : undefined
>>>>>>> faf163d47919a3690e8b5e648bb3ce44c3cae1e9
}

function loadFromStorage(key) {
  let data = localStorage.getItem(key);
  return data ? JSON.parse(data) : undefined;
}
