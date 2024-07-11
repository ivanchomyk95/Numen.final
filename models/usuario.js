const express = require('express');
const mongoose = require('mongoose');
const Usuario = require('./models/usuario');

const app = express();

mongoose.connect('mongodb+srv://username:password@cluster0.tpivan.mongodb.net/tpivan', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Ruta para obtener todos los usuarios
app.get('/usuarios', async (req, res) => {
    try {
      const usuarios = await Usuario.find();
      res.json(usuarios);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  
  app.listen(3000, () => {
    console.log('Servidor iniciado en http://localhost:3000');
  });
  