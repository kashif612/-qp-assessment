const express = require('express');
const Adminrouter = express.Router();

Adminrouter.post('/', require('../Controller.js/add_grocery').add_grocery);
Adminrouter.get('/', require('../Controller.js/Fetch_grocery').fetch_grocery);
Adminrouter.delete('/:itemId', require('../Controller.js/remove_grocery').remove_grocery);
Adminrouter.put('/:itemId', require('../Controller.js/Update_grocery').update_grocery);
Adminrouter.patch('/:itemId', require('../Controller.js/manage_inventory').manage_inventory);






module.exports = Adminrouter
