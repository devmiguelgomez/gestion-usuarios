const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    apellido: {
        type: String,
        required: true
    },
    dni: {
        type: String,
        required: true,
        unique: true
    },
    telefono: {
        type: String
    },
    correo_electronico: {
        type: String,
        required: true,
        unique: true
    },
    enfermedades_base: {
        type: Boolean,
        default: false
    },
    fecha_nacimiento: {
        type: Date,
        required: true
    },
    edad: {
        type: Number
    },
    profesion: {
        type: String
    },
    fecha_inscripcion: {
        type: Date,
        default: Date.now
    },
    antiguedad_meses: {
        type: Number,
        default: 0
    },
    plan_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Plan'
    },
    fecha_plan_contratado: {
        type: Date
    },
    fecha_caducidad_plan: {
        type: Date
    }
});

// Middleware para calcular automáticamente la edad y antigüedad antes de guardar
UserSchema.pre('save', function(next) {
    // Calcular edad
    if (this.fecha_nacimiento) {
        const hoy = new Date();
        const nacimiento = new Date(this.fecha_nacimiento);
        this.edad = hoy.getFullYear() - nacimiento.getFullYear();
        
        // Ajustar si aún no ha cumplido años este año
        if (
            hoy.getMonth() < nacimiento.getMonth() || 
            (hoy.getMonth() === nacimiento.getMonth() && hoy.getDate() < nacimiento.getDate())
        ) {
            this.edad--;
        }
    }
    
    // Calcular antigüedad en meses
    if (this.fecha_inscripcion) {
        const hoy = new Date();
        const inscripcion = new Date(this.fecha_inscripcion);
        this.antiguedad_meses = (hoy.getFullYear() - inscripcion.getFullYear()) * 12 + 
                               (hoy.getMonth() - inscripcion.getMonth());
    }
    
    next();
});

module.exports = mongoose.model('User', UserSchema);
