const User = require('../models/User');

//Controlador para obtener el plan de un usuario
exports.getUserPlan = async (req, res) => {
  try {
    const userId = req.params.id;
    
    // Validar que el id sea válido
    if (!userId) {
      return res.status(400).json({ message: 'ID de usuario requerido' });
    }
    
    // Buscar el usuario por ID sin populate
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    if (!user.plan && !user.plan_id) {
      return res.status(404).json({ message: 'El usuario no tiene un plan asignado' });
    }
    
    // Devolver específicamente la información del plan
    res.status(200).json({
      success: true,
      data: {
        userName: user.nombre,
        planInfo: {
          plan_id: user.plan_id || null,
          fecha_plan_contratado: user.fecha_plan_contratado || null,
          fecha_caducidad_plan: user.fecha_caducidad_plan || null
        }
      }
    });
    
  } catch (error) {
    console.error('Error al obtener plan del usuario:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener plan del usuario',
      error: error.message
    });
  }
};
// Controlador para actualizar un usuario
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    
    // Validar que el id sea válido
    if (!id) {
      return res.status(400).json({ message: 'ID de usuario requerido' });
    }
    
    // Buscar y actualizar el usuario
    const updatedUser = await User.findByIdAndUpdate(
      id, 
      updates, 
      { new: true, runValidators: true }
    );
    
    if (!updatedUser) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    
    res.status(200).json({
      success: true,
      data: updatedUser
    });
    
  } catch (error) {
    console.error('Error al actualizar usuario:', error);
    res.status(500).json({
      success: false,
      message: 'Error al actualizar el usuario',
      error: error.message
    });
  }
};

// Eliminar usuario
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        
        if (!user) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }
        
        res.json({ mensaje: 'Usuario eliminado correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al eliminar usuario' });
    }
};

// Obtener todos los usuarios
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      success: true,
      data: users
    });
  } catch (error) {
    console.error('Error al obtener los usuarios:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener los usuarios',
      error: error.message
    });
  }
};

// Obtener un usuario por ID
exports.getUserById = async (req, res) => {
  try {
    const userId = req.params.id;

    if (!userId) {
      return res.status(400).json({ message: 'ID de usuario requerido' });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error('Error al obtener usuario por ID:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener el usuario',
      error: error.message
    });
  }
};