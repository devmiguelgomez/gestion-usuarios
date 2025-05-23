const User = require('../models/User');
const Plan = require('../models/Plan');
const Activity = require('../models/Activity');
const Attendance = require('../models/Attendance');

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

exports.createUser = async (req, res) => {
  try {
    // Asegurarse de que datos siempre sea un objeto, incluso si req.body es null
    const datos = req.body && typeof req.body === 'object' ? req.body : {};

    // Verificar que req.body no está vacío
    if (Object.keys(datos).length === 0) {
      return res.status(400).json({
        success: false,
        message: 'El cuerpo de la solicitud está vacío. Se requieren datos para crear el usuario.'
      });
    }

    // Validar campos obligatorios
    const camposObligatorios = ['nombre', 'apellido', 'dni', 'correo_electronico', 'fecha_nacimiento'];
    const camposFaltantes = camposObligatorios.filter(campo => !datos[campo]);

    if (camposFaltantes.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Faltan campos obligatorios: ${camposFaltantes.join(', ')}`
      });
    }

    // Validar formato del correo
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(datos.correo_electronico)) {
      return res.status(400).json({
        success: false,
        message: 'Formato de correo electrónico no válido.'
      });
    }

    // Validar si el DNI y el correo ya existen
    const [dniExistente, correoExistente] = await Promise.all([
      User.findOne({ dni: datos.dni }),
      User.findOne({ correo_electronico: datos.correo_electronico })
    ]);

    if (dniExistente) {
      return res.status(409).json({
        success: false,
        message: 'Ya existe un usuario con ese DNI.'
      });
    }

    if (correoExistente) {
      return res.status(409).json({
        success: false,
        message: 'Ya existe un usuario con ese correo electrónico.'
      });
    }

    // Calcular edad (aunque esto ya lo hace el middleware pre('save') del modelo)
    const fechaNacimiento = new Date(datos.fecha_nacimiento);
    const hoy = new Date();

    if (isNaN(fechaNacimiento.getTime())) {
      return res.status(400).json({
        success: false,
        message: 'La fecha de nacimiento no es válida.'
      });
    }

    // Crear usuario (los campos como edad y antiguedad_meses serán calculados por el middleware)
    const nuevoUsuario = new User({
      nombre: datos.nombre,
      apellido: datos.apellido,
      dni: datos.dni,
      correo_electronico: datos.correo_electronico,
      fecha_nacimiento: datos.fecha_nacimiento,
      telefono: datos.telefono || null,
      enfermedades_base: datos.enfermedades_base || false,
      profesion: datos.profesion || null,
      fecha_inscripcion: hoy,
      plan_id: datos.plan_id || null,
      fecha_plan_contratado: datos.fecha_plan_contratado || null,
      fecha_caducidad_plan: datos.fecha_caducidad_plan || null
    });

    const usuarioGuardado = await nuevoUsuario.save();

    res.status(201).json({
      success: true,
      message: 'Usuario creado con éxito.',
      data: usuarioGuardado
    });

  } catch (error) {
    console.error('Error al crear usuario:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno al crear el usuario.',
      error: error.message
    });
  }
};
// Asignar plan a usuario
exports.assignPlanToUser = async (req, res) => {
  const { id, planId } = req.params;

  try {
    const plan = await Plan.findById(planId);
    if (!plan) {
      return res.status(404).json({ message: 'El plan no existe' });
    }

    const fechaContratado = new Date();
    const fechaCaducidad = new Date(fechaContratado);
    fechaCaducidad.setDate(fechaContratado.getDate() + plan.duracion_dias);

    const usuarioActualizado = await User.findByIdAndUpdate(
      id,
      {
        plan_id: plan._id,
        fecha_plan_contratado: fechaContratado,
        fecha_caducidad_plan: fechaCaducidad
      },
      { new: true, runValidators: true }
    ).populate('plan_id');
    if (!usuarioActualizado) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.status(200).json({
      success: true,
      message: 'Plan asignado correctamente',
      data: usuarioActualizado
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al asignar el plan',
      error: error.message,
    });
  }
};

// Asegurarse de que assigPlanToUser siga funcionando temporalmente para compatibilidad
exports.assigPlanToUser = exports.assignPlanToUser;

// Obtener actividades a las que ha asistido un usuario
exports.getUserActivities = async (req, res) => {
  try {
    const userId = req.params.id;
    
    // Validar que el id sea válido
    if (!userId) {
      return res.status(400).json({ message: 'ID de usuario requerido' });
    }
    
    // Verificar que el usuario existe
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    
    // Buscar registros de asistencia donde el usuario haya asistido
    const asistencias = await Attendance.find({ 
      user_id: userId,
      asistio: true
    }).sort({ fecha: -1 }); // Ordenar por fecha descendente (más reciente primero)
    
    // Si queremos incluir información detallada de las actividades
    // usamos populate para obtener datos de las actividades
    const asistenciasConDetalles = await Attendance.find({ 
      user_id: userId,
      asistio: true
    })
    .populate('activity_id')
    .sort({ fecha: -1 });
    
    // Formatear la respuesta
    const actividades = asistenciasConDetalles.map(asistencia => {
      return {
        id: asistencia._id,
        fecha_asistencia: asistencia.fecha,
        actividad: asistencia.activity_id
      };
    });
    
    // Responder con las actividades encontradas
    res.status(200).json({
      success: true,
      count: actividades.length,
      data: actividades
    });
    
  } catch (error) {
    console.error('Error al obtener actividades del usuario:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener las actividades del usuario',
      error: error.message
    });
  }
};
