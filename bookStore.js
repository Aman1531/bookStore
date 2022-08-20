 const author = function (email,firstname,lastname) {
    this.email = email,
    this.firstname = firstname,
    this.lastname = lastname
}

const book = function (title,isbn,authors,description) {
    this.title = title , this.isbn=isbn, this.authors=authors.split(','), this.description = description
}

const magazine =  function (title,isbn,authors,publishedAt) {
    this.title = title , this.isbn=isbn, this.authors=authors.split(',')

    this.publishedAt = new Date(publishedAt)
    if(publishedAt.includes('.')){
        let d =publishedAt.split('.').reverse()
        this.publishedAt = new Date(d[0],d[1]-1,d[2])
    }

}
module.exports = {
    author:author,
    book:book,
    magazine:magazine
}
