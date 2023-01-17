eslint-disable max-classes-per-file 
eslint-disable no-use-before-define 


class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
    this.id = Math.random();
  }
}

class Library {
  constructor() {
    this.data = [];
  }

  addBook(book) {
    this.data.push(book);
    localStorage.setItem('library', JSON.stringify(this.data));
    addToUI(book);
  }

  removeBook(id) {
    const book = document.getElementById(id);
    book.remove();
    this.data = this.data.filter((bookObj) => bookObj.id !== id);
    localStorage.setItem('library', JSON.stringify(this.data));
  }
}

const library = new Library();

function getInput() {
  const title = document.getElementById('bookTitle');
  const author = document.getElementById('bookAuthor');
  const book = new Book(title.value, author.value);
  title.value = '';
  author.value = '';
  return book;
}

function addToUI(bookObj) {
  let colorClass = '';
  if (library.data.indexOf(bookObj) % 2 !== 0) {
    colorClass = 'light';
  } else {
    colorClass = 'dark';
  }
  const bookList = document.getElementById('book-list');
  const book = document.createElement('li');
  book.classList.add('book');
  book.classList.add(colorClass);
  book.setAttribute('id', bookObj.id);
  book.innerHTML = `<p><span>"${bookObj.title}"</span> by ${bookObj.author}</p>`;
  const deleteBtn = document.createElement('button');
  deleteBtn.innerHTML = 'Remove';
  deleteBtn.addEventListener('click', () => library.removeBook(bookObj.id));
  book.appendChild(deleteBtn);
  bookList.appendChild(book);
}

const addButton = document.getElementById('add-btn');
addButton.addEventListener('click', () => {
  const book = getInput();
  library.addBook(book);
});

// Load page
window.onload = () => {
  library.data = JSON.parse(localStorage.getItem('library' || '[]'));
  if (library.data === null) {
    library.data = [];
    return;
  }

  library.data.forEach((book) => addToUI(book));
};

// function getInput() {
//   const book = {};
//   book.id = Date.now();
//   book.title = document.getElementById('bookTitle').value;
//   book.author = document.getElementById('bookAuthor').value;
//   return book;
// }

// function addBook(bookObj) {
//   const bookList = document.getElementById('book-list');
//   const book = document.createElement('li');
//   const line = document.createElement('hr');
//   book.setAttribute('id', bookObj.id);
//   book.innerHTML = `<h2 class="title"> ${bookObj.title} </h2> <h3>${bookObj.author} </h3>`;
//   const deleteBtn = document.createElement('button');
//   deleteBtn.innerHTML = 'Remove';
//   deleteBtn.addEventListener('click', () => removeBook(bookObj.id));
//   book.appendChild(deleteBtn);
//   book.appendChild(line);
//   bookList.appendChild(book);
// }

// Add Button
