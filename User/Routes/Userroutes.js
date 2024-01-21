const express = require('express');
const Userrouter = express.Router();
Userrouter.get('/', require('../Controller/Available_grocery').Available_grocery);
Userrouter.post('/', require('../Controller/Book_grocery').book_grocery);



module.exports = Userrouter