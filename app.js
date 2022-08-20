const bookStore = require('./bookStore.js')

// use readline for big files
const Authors=require('fs').readFileSync('authors.csv', 'utf-8').split(/\r?\n/).filter((line,i) => line && i).map((line) => new bookStore.author(...line.split(';')) )
const Books = require('fs').readFileSync('books.csv', 'utf-8').split(/\r?\n/).filter((line,i) => line && i).map((line) => new bookStore.book(...line.split(';')) )
const Magazines = require('fs').readFileSync('magazines.csv', 'utf-8').split(/\r?\n/).filter((line,i) => line && i).map((line) =>   new bookStore.magazine(...line.split(';')) )


const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))

app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    res.render('index',{books:Books,magazines:Magazines});
});

app.post('/isbn',(req,res) => {
    let isbn=req.body.isbn
   // res.render('index')
    res.render('index',{books:Books.filter((book) => book.isbn.includes(isbn)),
                        magazines:Magazines.filter((mag) => mag.isbn.includes(isbn))})
})

app.post('/author',(req,res) => {
    let author=req.body.author
    res.render('index',{books:Books.filter((book) => book.authors.includes(author)),
                        magazines:Magazines.filter((mag) => mag.authors.includes(author))})
})

app.post('/sort',(req,res) => {
    res.render('index',{books:Books.sort((a,b) => a.title.localeCompare(b.title)),
                        magazines:Magazines.sort((a,b) => a.title.localeCompare(b.title))})
})

app.get('/addMagazine',(req,res) => {
    res.render('newMagazine')
})
app.post('/addMagazine',(req,res) =>{
    console.log(req.body)
    let mag = new bookStore.magazine(req.body.title,req.body.isbn,req.body.authors,req.body.publishedAt)
    Magazines.push(mag)
    res.redirect('/')
})

app.get('/addBook',(req,res) => {
    res.render('newBook')
})
app.post('/addBook',(req,res) =>{
    console.log(req.body)
    let book = new bookStore.book(req.body.title,req.body.isbn,req.body.authors,req.body.description)
    Books.push(book)
    res.redirect('/')
})
app.listen(8080);
console.log('Server is listening on port 8080');
