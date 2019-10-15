// Book Class
var Book = /** @class */ (function () {
    function Book(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
        // this.title = title;
        // this.author = author;
        // this.isbn = isbn;
    }
    return Book;
}());
// UI Class
var UI = /** @class */ (function () {
    function UI() {
    }
    UI.displayBooks = function () {
        var books = Store.getBooks();
        books.forEach(function (book) { return UI.addBookToList(book); });
    };
    UI.addBookToList = function (book) {
        var list = document.querySelector("#book-list");
        var row = document.createElement("tr");
        row.innerHTML = "\n      <td>" + book.title + "</td>\n      <td>" + book.author + "</td>\n      <td>" + book.isbn + "</td>\n      <td><a href=\"#\" class=\"btn btn-danger btn-sm delete\">X</a></td>\n    ";
        list.appendChild(row);
    };
    UI.clearFields = function () {
        document.querySelector("#title").value = "";
        document.querySelector("#author").value = "";
        document.querySelector("#isbn").value = "";
    };
    UI.showAlert = function (message, className) {
        var div = document.createElement("div");
        div.className = "alert alert-" + className;
        div.appendChild(document.createTextNode(message));
        var container = document.querySelector(".container");
        var form = document.querySelector("#book-form");
        container.insertBefore(div, form);
        // Vanish in 3 seconds
        setTimeout(function () { return document.querySelector(".alert").remove(); }, 3000);
    };
    UI.deleteBook = function (el) {
        if (el.classList.contains("delete")) {
            el.parentElement.parentElement.remove();
        }
    };
    return UI;
}());
// Store Class
var Store = /** @class */ (function () {
    function Store() {
    }
    Store.getBooks = function () {
        var books;
        if (localStorage.getItem("books") === null) {
            books = [];
        }
        else {
            books = JSON.parse(localStorage.getItem("books"));
        }
        return books;
    };
    Store.addBook = function (book) {
        var books = Store.getBooks();
        books.push(book);
        localStorage.setItem("books", JSON.stringify(books));
    };
    Store.removeBook = function (isbn) {
        var books = Store.getBooks();
        books.forEach(function (book, index) {
            if (book.isbn === isbn) {
                books.splice(index, 1);
            }
        });
        localStorage.setItem("books", JSON.stringify(books));
    };
    return Store;
}());
// Event: Display Books
document.addEventListener("DOMContentLoaded", UI.displayBooks);
// Event: Add a Book
document.querySelector("#book-form").addEventListener("submit", function (e) {
    e.preventDefault();
    var title = document.querySelector("#title").value;
    var author = document.querySelector("#author").value;
    var isbn = document.querySelector("#title").value;
    // Validate Form
    if (title === "" || author === "" || isbn === "") {
        UI.showAlert("Please fill in all fields", "danger");
    }
    else {
        var book = new Book(title, author, isbn);
        UI.addBookToList(book);
        Store.addBook(book);
        UI.showAlert("Book Added", "success");
        UI.clearFields();
    }
});
// Event: Remove a Book
document.querySelector("#book-list").addEventListener("click", function (e) {
    UI.deleteBook(e.target);
    Store.removeBook(e.target.parentElement.previousElementSibling
        .textContent);
    UI.showAlert("Book Removed", "success");
});
