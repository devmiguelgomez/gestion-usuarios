const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'El ID del usuario es obligatorio']
  },
  activity_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Activity',
    required: [true, 'El ID de la actividad es obligatorio']
  },
  fecha: {
    type: Date,
    required: [true, 'La fecha de asistencia es obligatoria'],
    default: Date.now
  },
  asistio: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('asistencia', attendanceSchema);
