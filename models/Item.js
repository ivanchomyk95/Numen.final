const { Schema, model } = require('mongoose');

// Definición del esquema para usuarios
const UserSchema = new Schema({
  nombre: { type: String, required: true },
  email: { type: String, required: true }
});

// Creación del modelo 'User' a partir del esquema
const User = model('User', UserSchema);

module.exports = User;
