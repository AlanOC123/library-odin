class Library {
  #collection
  #nameField
  #authorField
  #lengthField
  #remove
  constructor() {
    this.#collection = [];
    this.#nameField = document.querySelector('#book-name');
    this.#authorField = document.querySelector('#book-author');
    this.#lengthField = document.querySelector('#book-length');
    this.#remove = document.querySelector('#remove');
  }

  addToLibrary(book) {
    this.#collection.push(book);
    this.#nameField.value = '';
    this.#authorField.value = '';
    this.#lengthField.value = '';
  }

  get collectionSize() {
    return this.#collection.length;
  }

  get collectionList() {
    return this.#collection;
  }

  printCollection() {
    this.#collection.forEach(book => {
      console.log(book);
    })
  }

  createBook() {
    return new Book(this.#nameField.value, this.#authorField.value, this.#lengthField.value);
  }

  removeBook() {
    for (let i = 0; i < this.collectionSize; i++) {
      if (this.#collection[i].nameOfBook.toLowerCase() === this.#remove.value.toLowerCase()) {
        this.#collection.splice(i, 1);
        return
      }
    }
    alert('Not Found');
    this.#remove.value = '';
    return;
  }
}

class Book {
  constructor(bookName, bookAuthor, bookLength) {
    this.bookLength = Number(bookLength);
    if (typeof this.bookLength !== 'number') {
      console.log(typeof this.bookLength);
      throw new TypeError('Length is not a number');
    }

    if (typeof bookName !== 'string' || bookName === '' || typeof bookAuthor !== 'string' || bookAuthor === '') {
      throw new TypeError('Invalid Name or Author')
    }

    this.bookName = bookName;
    this.bookAuthor = bookAuthor;
  }

  get nameOfBook() {
    return this.bookName
  }

  get nameOfAuthor() {
    return this.bookAuthor
  }

  get pageLength() {
    return this.bookLength
  }
}

class Display {
  #container
  constructor() {
    this.#container = document.querySelector('.library-display');
  }

  render(collection) {
    while (this.#container.firstChild) {
      this.#container.removeChild(this.#container.firstChild);
    }

    collection.forEach(book => {
      const div = document.createElement('div');
      div.textContent = `${book.nameOfBook}, ${book.nameOfAuthor}, ${book.pageLength}`;
      this.#container.append(div);
    })
  }

}

const libraryModule = new Library();
const displayModule = new Display();

const addBtn = document.querySelector('#add-btn');
const removeBtn = document.querySelector('#remove-btn');
addBtn.addEventListener('click', () => { 
  const book = libraryModule.createBook() 
  libraryModule.addToLibrary(book);
  displayModule.render(libraryModule.collectionList);
})

removeBtn.addEventListener('click', () => {
  libraryModule.removeBook();
  displayModule.render(libraryModule.collectionList);
})