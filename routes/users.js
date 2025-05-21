const express = require('express');
const router = express.Router();
const usersController = require('../controllers/UsersController');
// Ruta para obtener el plan de un usuario por su ID
router.get('/:id/plan', usersController.getUserPlan);
// Ruta para eliminar un usuario
router.delete('/delete/:id', usersController.deleteUser);
// Ruta PUT para actualizar un usuario por su ID
router.put('/update/:id', usersController.updateUser);
// Obtener todos los usuarios
router.get('/get-all-users', usersController.getAllUsers);
// Obtener usuario por ID
router.get('/get-user-by-id/:id', usersController.getUserById);
// Obtener actividades por ID de usuario
router.get("/get-activities-user/:id", getActivitiesByUser);

module.exports = router;
