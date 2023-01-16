let library = [];

function getInput() {
  const book = {};
  book.id = Date.now();
  book.title = document.getElementById('bookTitle').value;
  book.author = document.getElementById('bookAuthor').value;
  return book;
}

function removeBook(id) {
  const book = document.getElementById(id);
  book.remove();
  library = library.filter((bookObj) => bookObj.id !== id);
  localStorage.setItem('library', JSON.stringify(library));
}

function addBook(bookObj) {
  const bookList = document.getElementById('book-list');
  const book = document.createElement('li');
  const line = document.createElement('hr');
  book.setAttribute('id', bookObj.id);
  book.innerHTML = `<h2 class="title"> ${bookObj.title} </h2> <h3>${bookObj.author} </h3>`;
  const deleteBtn = document.createElement('button');
  deleteBtn.innerHTML = 'Remove';
  deleteBtn.addEventListener('click', () => removeBook(bookObj.id));
  book.appendChild(deleteBtn);
  book.appendChild(line);
  bookList.appendChild(book);
}

const addButton = document.getElementById('add-btn');
addButton.addEventListener('click', () => {
  const book = getInput();
  library.push(book);
  localStorage.setItem('library', JSON.stringify(library));
  addBook(book);
});

window.onload = () => {
  library = JSON.parse(localStorage.getItem('library' || '[]'));
  if (library === null) {
    library = [];
    return;
  }

  library.forEach((book) => {
    addBook(book);
  });
};
