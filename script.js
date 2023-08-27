const library = [];
const libraryDisplay = document.querySelector('.library-display');
const btn = document.querySelector('#btn');
const form = document.querySelector('.form');

function Book(bookName, bookAuthor, bookLength, hasRead) {
  this.name = bookName
  this.author = bookAuthor
  this.pageLength = bookLength
  this.read = hasRead
}

Book.prototype.markRead = function() {
  if (!this.read) {
    this.read = true;
  } else {
    this.read = false;
  }

  console.log(this.read);
}

document.addEventListener('DOMContentLoaded', () => {
  displayLibrary();
})

btn.addEventListener('click', e => {
  e.preventDefault();
  const bookName = form.querySelector('#book-name').value;
  const bookAuthor = form.querySelector('#book-author').value;
  const bookLength = form.querySelector('#book-length').value;
  const radioSelector = form.querySelector('.radio');
  const hasRead = radioSelector.querySelector('#yes').checked;


  const newBook = createNewBook(bookName, bookAuthor, bookLength, hasRead);

  if (!(newBook === 'Invalid')) {
    addToLibrary(newBook);
  }

  displayLibrary();

  form.reset();

  const removebtn = document.querySelectorAll('.remove-btn');
  const markAsReadbtn = document.querySelectorAll('.mark-as-read-btn');

  removebtn.forEach(btn=> { btn.addEventListener('click', e => {
      const btn = e.target;
      const bookName = btn.dataset.bookName;

      const removeMessage = removeBook(bookName);
      alert(removeMessage);

      displayLibrary();
    })
  })

  markAsReadbtn.forEach(btn => { btn.addEventListener('click', e => {
      const btn = e.target;
      const bookName = btn.dataset.bookName;
      let hasRead = btn.dataset.hasRead;
      hasRead = markAsRead(bookName);

      if (!hasRead == true) {
        btn.textContent = 'Mark Read';
      } else {
        btn.textContent = 'Mark Unread';
      }
    })
  })

  console.dir(library)
})



function createNewBook(bookName, bookAuthor, bookLength, hasReadBook) {
  if (
    bookName === ''
    || bookAuthor === ''
    || bookLength === ''
    ) {
      return 'Invalid';
    }

  return new Book (bookName, bookAuthor, bookLength, hasReadBook);
}

function addToLibrary(bookToAdd) {
  library.push(bookToAdd);
}

function displayLibrary () {

  if (library.length > 0 || libraryDisplay.firstElementChild) {
    while (libraryDisplay.firstElementChild) {
      libraryDisplay.removeChild(libraryDisplay.firstElementChild);
      }
  } 

  for (let i = 0; i < library.length; i++) {
    const bookName = library[i].name;
    const bookAuthor = library[i].author;
    const bookLength = library[i].pageLength;
    const hasRead = library[i].read;

    const libraryCard = createNewCard(bookName, bookAuthor, bookLength, hasRead);
    libraryDisplay.appendChild(libraryCard);
  }

  if (!(libraryDisplay.firstElementChild)) {
    const emptyDisplayMessage = document.createElement('div');
    emptyDisplayMessage.classList.add('empty-display-message');
    emptyDisplayMessage.textContent = 'No Books to Display';
    libraryDisplay.appendChild(emptyDisplayMessage);
  }
}

function createNewCard(bookName, bookAuthor, bookLength, hasRead) {

  const card = document.createElement('div');
  card.classList.add('card');
  if (!hasRead) {
    card.classList.add('not-read');
  } else {
    card.classList.add('read');
  }

  card.dataset.bookName = bookName;

  const bookNameSection = document.createElement('div');
  const bookNameInfoLabel = document.createElement('p');
  const bookNameInfo = document.createElement('p');

  bookNameSection.classList.add('book-name');
  bookNameInfoLabel.classList.add('card-label');
  bookNameInfo.classList.add('card-info');
  bookNameInfoLabel.textContent = 'Book Name: ';
  bookNameInfo.textContent = bookName;

  bookNameSection.appendChild(bookNameInfoLabel);
  bookNameSection.appendChild(bookNameInfo);

  const bookAuthorSection = document.createElement('div');
  const bookAuthorInfoLabel = document.createElement('p');
  const bookAuthorInfo = document.createElement('p');

  bookAuthorSection.classList.add('book-author');
  bookAuthorInfoLabel.classList.add('card-label');
  bookAuthorInfo.classList.add('card-info');
  bookAuthorInfoLabel.textContent = 'Author Name: ';
  bookAuthorInfo.textContent = bookAuthor;

  bookAuthorSection.appendChild(bookAuthorInfoLabel);
  bookAuthorSection.appendChild(bookAuthorInfo);

  const bookLengthSection = document.createElement('div');
  const bookLengthInfoLabel = document.createElement('p');
  const bookLengthInfo = document.createElement('p');

  bookLengthSection.classList.add('book-length');
  bookLengthInfoLabel.classList.add('card-label');
  bookLengthInfo.classList.add('card-info');
  bookLengthInfoLabel.textContent = 'Book Length: ';
  bookLengthInfo.textContent = bookLength;

  bookLengthSection.appendChild(bookLengthInfoLabel);
  bookLengthSection.appendChild(bookLengthInfo);

  const buttonSection = document.createElement('div');
  const removeBookButton = document.createElement('button');
  const markAsReadButton = document.createElement('button');

  buttonSection.classList.add('button-section');
  removeBookButton.classList.add('remove-btn');
  removeBookButton.dataset.bookName = bookName;
  markAsReadButton.classList.add('mark-as-read-btn');
  removeBookButton.textContent = 'Remove';
  if (hasRead === true) {
    markAsReadButton.textContent = 'Mark Unread';
  } else {
    markAsReadButton.textContent = 'Mark Read';
  }
  markAsReadButton.dataset.bookName = bookName;
  markAsReadButton.dataset.hasRead = hasRead;

  buttonSection.appendChild(removeBookButton);
  buttonSection.appendChild(markAsReadButton);

  card.appendChild(bookNameSection);
  card.appendChild(bookAuthorSection);
  card.appendChild(bookLengthSection);
  card.appendChild(buttonSection);

  console.log(card);

  return card;
}

function searchLibrary(bookName) {
  for (let i = 0; i < library.length; i++) {
    if (library[i].name === bookName) return i;
  }

  return 'Book not Found';
}

function removeBook(bookToRemove) {
  const index = searchLibrary(bookToRemove);
  console.log(index);
  
  if (!(index === 'Book not Found')) {
    library.splice(index, 1);
  } else {
    return 'Book Not Present';
  }

  return 'Book Removed';
}

function markAsRead(bookName) {
  const index = searchLibrary(bookName);
  const card = document.querySelector(`[data-book-name="${bookName}"`);
  console.log(card)
  
  if (card.classList.contains('read')) {
    card.classList.remove('read');
    card.classList.add('not-read');
  } else {
    card.classList.remove('not-read');
    card.classList.add('read');
  }

  library[index].markRead();
  return library[index].read;
}



// const labelPlaceholder = 'Book Info'
// const addBookSection = document.querySelector('.library-display');
// const bookCard = document.createElement('div');
// const bookNameWrapper = document.createElement('div');
// const bookAuthorWrapper = document.createElement('div');
// const bookLengthWrapper = document.createElement('div');
// const cardLabel = document.createElement('p');
// const cardInfo = document.createElement('p');




// bookCard.classList.add('card');
// bookNameWrapper.classList.add('book-name');
// bookAuthorWrapper.classList.add('book-author');
// bookLengthWrapper.classList.add('book-length');
// cardLabel.classList.add('card-label');
// cardInfo.classList.add('card-info');
// cardLabel.textContent = labelPlaceholder;
// cardInfo.textContent = labelPlaceholder

// bookNameWrapper.appendChild(cardLabel);
// bookNameWrapper.appendChild(cardInfo);

// bookAuthorWrapper.appendChild(cardLabel);
// bookAuthorWrapper.appendChild(cardInfo);

// bookLengthWrapper.appendChild(cardLabel);
// bookLengthWrapper.appendChild(cardInfo);

// bookCard.appendChild(bookNameWrapper);
// bookCard.appendChild(bookAuthorWrapper);
// bookCard.appendChild(bookLengthWrapper);

// addBookSection.appendChild(bookCard);