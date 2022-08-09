// book class

class Book {
    constructor (title, author, isbn)
    {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

// ui class: handles  the ui

class UI {
    static showBooks() {
       
          const books = Store.getBooks();
          books.forEach ((book) => UI.addBookToList(book))
    }
    static addBookToList(book){
        const list = document.getElementById('book-list');
        const row = document.createElement('tr')
        row.innerHTML =
         `<td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href='#' class="btn btn=danger btn-sm delete">X</td>
        `;
        list.appendChild(row)
    }

    static deleteBook(el){
       if (el.classList.contains("delete")) {
        el.parentElement.parentElement.remove();
       }
    } 
   
    static showAlert(message, className){
         const div = document.createElement('div');
         div.className = `alert alert-${className}`;
         div.appendChild(document.createTextNode(message));
         const container = document.querySelector('.container')
         const form = document.querySelector('#book-form')
         container.insertBefore(div, form);
         // set time out 3secs
         setTimeout(()=>
            document.querySelector('.alert').remove(), 3000);
    }
    static clearFields(){
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';

    }
 
}

// store class :handles storage
 class Store{
    static getBooks(){
 let books;
 if (localStorage.getItem('books') === null) {
    books = [];

 }
 else{ 
   books = JSON.parse(localStorage.getItem('books'));
 }
 return books;
    }
    static addBook(book){
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }
    static removeBook(isbn){

        const books = Store.getBooks();
        books.forEach((book, index) =>{

            if (book.isbn === isbn) {
                books.splice( index, 1);
            }

        });

        localStorage.setItem('books', JSON.stringify(books))
    }

 }
//event display book
document.addEventListener('DOMContentLoaded', UI.showBooks);
//event add book 
document.getElementById('book-form').addEventListener('submit', (e)=>{

    //prevent action of subit
    e.preventDefault();
    // to get form values
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;

    // validate
    if (title === '' || author === '' || isbn === '' ) {
        UI.showAlert( 'please finish' , 'danger')
    }
else{
    // instanstiate a book

    const book = new Book(title, author, isbn);
    
    // add book to list
    UI.addBookToList(book); 

    //add book to storage
    Store.addBook(book);

// show success
UI.showAlert('Book Added', 'success');

    // clear fields
    UI.clearFields();
}

});
// event remove book
 
   document.querySelector('#book-list').addEventListener('click', (e) => {
    UI.deleteBook(e.target)
    UI.showAlert('Book removed', 'info')
    });
