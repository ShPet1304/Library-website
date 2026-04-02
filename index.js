const container = document.querySelector(".card-container");
const form = document.querySelector("#bookForm");

let newtitle;
let newauthor;
let newpages;
let newread;

let myLibrary = [
  new Book("The Lord Of The Rings", "J.R.R. Tolkien", 1178, "read"),
  new Book("The Alchemest", "Paulo Coelho", 208, "read"),
  new Book(
    "Harry Potter and the Philosopher's Stone",
    "J.K. Rowling",
    223,
    "unread",
  ),
  new Book("Don Quixote", "Miguel de Cervantes", 10000, "unread"),
];
let libraryStockCount = myLibrary.length;

function Book(title, author, pages, read) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function () {
    console.log(`${title} by ${author}, ${pages} pages, ${read}`);
  };
}
form.addEventListener("submit", (event) => {
  event.preventDefault();
  addBookToLibrary();
});
//Object.setPrototypeOf(addBookToLibrary.prototype, Book.prototype);

function addBookToLibrary() {
  // take params, create a book then store it in the array
  const bookTitle = document.getElementById("title");
  const bookAuthor = document.getElementById("author");
  const bookPages = document.getElementById("pages");
  const bookRead = document.getElementById("read");

  newtitle = bookTitle.value;
  newauthor = bookAuthor.value;
  newpages = bookPages.value;
  newread = bookRead.value;

  myLibrary.push(new Book(newtitle, newauthor, newpages, newread));

  DisplayBooks();
}

function openForm() {
  document.getElementById("bookForm").style.display = "block";
}

function closeForm() {
  document.getElementById("bookForm").style.display = "none";
}

function DisplayBooks() {
  container.innerHTML = "";
  myLibrary.forEach((book) => {
    const bookCard = document.createElement("div");
    bookCard.classList.add("book-card");
    bookCard.id = book.id;

    const inner = document.createElement("div");
    inner.classList.add("book-card-inner");

    const front = document.createElement("div");
    front.classList.add("book-card-front");
    front.textContent = `${book.title}`;

    const back = document.createElement("div");
    back.classList.add("book-card-back");

    const backText = document.createElement("p");
    backText.className = "back-text";
    backText.innerText = `${book.title} 
    By ${book.author} 
    Has ${book.pages} Pages`;

    const readBtn = document.createElement("button");
    readBtn.textContent = `${book.read}`;
    readBtn.className = "read-btn";

    readBtn.addEventListener("click", () => {
      if (readBtn.textContent == "read") {
        readBtn.textContent = "unread";
      } else if (readBtn.textContent == "unread") {
        readBtn.textContent = "read";
      }
    });

    const btn = document.createElement("button");
    btn.innerText = "Remove Book";
    btn.className = "delete-btn";

    btn.addEventListener("click", () => {
      console.log("button pressed");
      myLibrary = myLibrary.filter((b) => b.id !== book.id);
      const card = back.closest(".book-card");
      if (card) {
        card.remove();
      }
    });

    back.appendChild(btn);
    back.appendChild(backText);
    back.appendChild(readBtn);

    inner.appendChild(front);
    inner.appendChild(back);
    bookCard.appendChild(inner);

    container.appendChild(bookCard);
  });
}
DisplayBooks();
