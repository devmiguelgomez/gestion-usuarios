const express = require('express');
const router = express.Router();
const usersController = require('../controllers/UsersController');
// Ruta para obtener el plan de un usuario por su ID
router.get('/:id/plan', usersController.getUserPlan);
// Ruta para eliminar un usuario
router.delete('/delete/:id', usersController.deleteUser);
// Ruta PUT para actualizar un usuario por su ID
router.put('/update/:id', usersController.updateUser);

module.exports = router;
