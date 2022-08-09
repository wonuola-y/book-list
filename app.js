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
          const storedBooks = [
          {
            title : ' Alade ti de',
            author : ' Wonuola Alonge',
            isbn : ' 01110'
          },
          {
            title : ' Omo Oko',
            author : ' Yinyinloluwa Alonge',
            isbn : ' 01111'
          },
          {
            title : ' Aseyori',
            author : ' Havilah Alonge',
            isbn : ' 01112'
          }
        
          ];
          const books = storedBooks;
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
}

// store class :handles storage

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

    // instanstiate a book

    const book = new Book(title, author, isbn);
    
    // addd book to list
    UI.addBookToList(book); 
})
// event remove book