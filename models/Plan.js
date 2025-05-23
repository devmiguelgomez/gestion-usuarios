const mongoose = require('mongoose');

const PlanSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    precio: {
        type: Number,
        required: true
    },
    duracion_dias: {
        type: Number,
        required: true
    },
    acceso_piscina: {
        type: Boolean,
        default: false
    },
    acceso_clases_grupales: {
        type: Boolean,
        default: false
    },
    acceso_personal_trainer: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Plan', PlanSchema, 'plans');