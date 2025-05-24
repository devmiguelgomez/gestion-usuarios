# Sistema de Gestión de Usuarios - GYM API

## Estructura del Proyecto
```
gestion-usuarios/
├── config/
│   └── db.js                 # Configuración de la base de datos
├── controllers/
│   └── UsersController.js    # Controladores para los endpoints de usuario
├── models/
│   ├── User.js               # Modelo de usuario
├── routes/
│   └── users.js              # Definición de rutas para usuarios
├── .env                      # Variables de entorno
├── .gitignore                # Archivos ignorados por git
├── index.js                  # Punto de entrada de la aplicación
├── package.json              # Dependencias y scripts
├── vercel.json               # Configuración para despliegue en Vercel
└── README.md                 # Este archivo
```


## Grupo 1: Gestión de Usuarios
Base path: `/users`

### Endpoints
- `GET /users` → Obtener todos los usuarios
- `GET /users/{id}` → Obtener usuario por ID
- `POST /users` → Crear nuevo usuario
- `PUT /users/{id}` → Actualizar usuario existente
- `DELETE /users/{id}` → Eliminar usuario
- `GET /users/{id}/plan` → Obtener el plan asignado al usuario
- `PUT /users/{id}/assign-plan/{planId}` → Asignar o cambiar plan al usuario
- `GET /users/{id}/activities` → Obtener actividades a las que ha asistido

## Modelos

### Modelo de Usuario (JSON)
```json
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
```

## Workflow de la Aplicación

### Flujo de Ejecución
1. **Inicialización de la Aplicación**
   - Se carga el archivo `index.js` como punto de entrada
   - Se cargan variables de entorno desde `.env`
   - Se establece conexión con MongoDB mediante `config/db.js`
   - Se inicializa Express y se configuran middlewares (CORS, JSON parser)
   - Se registran las rutas para la API

2. **Procesamiento de Solicitudes HTTP**
   - Cliente envía solicitudes HTTP al servidor
   - Las solicitudes son dirigidas a los endpoints correspondientes en `routes/users.js`
   - Los controladores en `controllers/UsersController.js` manejan la lógica de negocio
   - Se interactúa con la base de datos mediante el modelo `models/User.js`
   - Se envían respuestas al cliente con los datos solicitados o mensajes de error

3. **Gestión de Datos de Usuario**
   - El modelo `User.js` define el esquema de datos para usuarios
   - Middleware pre-save calcula automáticamente edad y antigüedad
   - Se validan los datos antes de almacenarlos en la base de datos

### Flujo de Operaciones de Usuario

**Registro de Usuario**
1. Cliente envía solicitud POST a `/api/v1/users` con datos del usuario
2. Se validan los datos obligatorios (nombre, apellido, DNI, correo, fecha de nacimiento)
3. Se crea nuevo registro en la base de datos
4. Se calculan automáticamente edad y antigüedad
5. Se devuelve respuesta con datos del usuario creado

**Asignación de Plan**
1. Cliente envía solicitud PUT a `/api/v1/users/{id}/assign-plan/{planId}`
2. Se verifica existencia del usuario y del plan
3. Se actualiza el usuario con el ID del plan y fechas relevantes
4. Se devuelve el usuario actualizado con su plan asignado

**Consulta de Actividades**
1. Cliente envía solicitud GET a `/api/v1/users/{id}/activities`
2. Se consultan las actividades asociadas al usuario
3. Se devuelven datos de las actividades en las que ha participado el usuario

### Manejo de Errores
- Validación de datos de entrada en controladores
- Manejo de errores de base de datos
- Respuestas con códigos HTTP apropiados (400, 404, 500)
- Mensajes de error descriptivos para facilitar depuración

## Grupo 1: Gestión de Usuarios
Base path: `/users`

### Endpoints
- `GET /users` → Obtener todos los usuarios
- `GET /users/{id}` → Obtener usuario por ID
- `POST /users` → Crear nuevo usuario
- `PUT /users/{id}` → Actualizar usuario existente
- `DELETE /users/{id}` → Eliminar usuario
- `GET /users/{id}/plan` → Obtener el plan asignado al usuario
- `PUT /users/{id}/assign-plan/{planId}` → Asignar o cambiar plan al usuario
- `GET /users/{id}/activities` → Obtener actividades a las que ha asistido