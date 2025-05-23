const mongoose = require('mongoose');

const ActivitySchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    categoria: {
        type: String,
        required: true
    },
    nivel: {
        type: String,
        required: true,
        enum: ['básico', 'intermedio', 'avanzado']
    },
    requisitos: {
        type: String
    },
    duracion_min: {
        type: Number,
        required: true
    },
    profesor: {
        type: String,
        required: true
    },
    cupos_maximos: {
        type: Number,
        required: true
    },
    trainer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Trainer',
        required: true
    }
});

module.exports = mongoose.model('Activity', ActivitySchema, 'activities');