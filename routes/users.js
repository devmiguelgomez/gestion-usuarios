const express = require('express');
const router = express.Router();
const usersController = require('../controllers/UsersController');

// Ruta para eliminar un usuario
router.delete('/:id', usersController.deleteUser);

module.exports = router;
