const express = require('express');
const router = express.Router();
const books = require ('./booksController') //importing booksController as books


/* GET home page. */
router.get('/booklist', books.index) //triggers books.index from controller
router.get('/booklist/:id', books.show)
router.post('/booklist/create', books.create)
router.delete('/booklist/:id', books.delete)
router.put('/booklist/:id', books.update) //updating

module.exports = router; //exporting as module. can't use export default etc. b/c we're not using ES6 or classes