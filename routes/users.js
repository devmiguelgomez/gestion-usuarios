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
// Crear nuevo usuario
router.post('/create-user', usersController.createUser);
// Ruta para asignar o cambiar el plan de un usuario
router.put('/:id/assign-plan/:planId', usersController.assignPlanToUser);
// Ruta para obtener actividades a las que ha asistido un usuario
router.get('/:id/activities', usersController.getUserActivities);


module.exports = router;
