# gestion-usuarios

## Grupo 1: Gestión de Usuarios
Base path: /users

### Endpoints
• GET /users → Obtener todos los usuarios
• GET /users/{id} → Obtener usuario por ID
• POST /users → Crear nuevo usuario
• PUT /users/{id} → Actualizar usuario existente
• DELETE /users/{id} → Eliminar usuario
• GET /users/{id}/plan → Obtener el plan asignado al usuario
• PUT /users/{id}/assign-plan/{planId} → Asignar o cambiar plan al usuario
• GET /users/{id}/activities → Obtener actividades a las que ha asistido

### Modelo de Usuario (JSON)
{
  "id": "string",
  "nombre": "string",
  "apellido": "string",
  "dni": "string",
  "telefono": "string",
  "correo_electronico": "string",
  "enfermedades_base": true,
  "fecha_nacimiento": "YYYY-MM-DD",
  "edad": 0,
  "profesion": "string",
  "fecha_inscripcion": "YYYY-MM-DD",
  "antiguedad_meses": 0,
  "plan_id": "string",
  "fecha_plan_contratado": "YYYY-MM-DD",
  "fecha_caducidad_plan": "YYYY-MM-DD"
}
