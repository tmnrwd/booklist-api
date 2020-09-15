const createError = require('http-errors')

let booklist = [
    {
        "id" : 99,
        "title": "Aether in the Blood",
        "author": "Tim Norwood",
        "read": false
    }
]
let idno = 0

exports.index = function (req, res) {
    res.send(booklist)
}

exports.create = function (req, res, next) {   //create operation
    if(!req.body.title) {
        return(next(createError(400, "Please provide a book title.")))
        //if there's no body, run createError and present a 400 error with this string
    }
    booklist.push({id: idno, title: req.body.title, author: req.body.author, read: false})             //assigns an ID, and turns body into the name
    res.send({result: true})            //client knows something has happened
    idno++
}

exports.show = function (req, res, next) {
    const booksearch = booklist.find((book) => book.id == req.params.id)  //search for the todo with that id and assign to constant
    if(!booksearch) {
        return(next(createError(404, "There is no book with that ID.")))          //display error if no such todo exists
    }
    res.send(booksearch)                                                  //send the assigned todo
}

exports.delete = function (req, res, next) {
    const bookdelete = booklist.find((book) => book.id == req.params.id)  //search for the todo with that id and assign to constant
    if(!bookdelete) {
        return(next(createError(404, "There is no book with that ID.")))          //display error if no such todo exists
    }
    booklist = booklist.filter((book) => book.id != req.params.id)      //filter that todo from the list
    res.send({result: true})                                            //send resulting list
}

exports.update = function (req, res, next) {
    const bookupdate = booklist.find((book) => book.id == req.params.id)  //search for the todo with that id and assign to constant
    if(!bookupdate) {
        return(next(createError(404, "There is no book with that ID.")))          //display error if no such todo exists
    }
    booklist = booklist.map((book) => {                                 //map through list
        if (book.id == req.params.id) {                                 //if ID matches, 
            if (req.body.title){
            book.title = req.body.title}                                 //change body to the body in request
            if (req.body.author){
            book.author = req.body.author}
            if (req.body.read){
            book.read = req.body.read}
        }
    return book                                                         //return resulting list
    })
    res.send({result:true})                                             //need this always so there's no unfilled promise from the front end
                                                                        //you can make the response more detailed but usually just sending true is fine.
}
