const express = require('express');
const { body, validationResult } = require('express-validator');
const axios = require('axios');
const Item = require('../models/Item');

const router = express.Router();

// Crear un nuevo ítem con validación
router.post('/items', [
  body('name').notEmpty().withMessage('Name is required'),
  body('price').isNumeric().withMessage('Price must be a number')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const newItem = new Item(req.body);
  await newItem.save();
  res.status(201).send(newItem);
});

// Leer todos los ítems
router.get('/items', async (req, res) => {
  const items = await Item.find();
  res.status(200).send(items);
});

// Leer un ítem por ID
router.get('/items/:id', async (req, res) => {
  const item = await Item.findById(req.params.id);
  res.status(200).send(item);
});

// Actualizar un ítem por ID
router.put('/items/:id', async (req, res) => {
  const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.status(200).send(updatedItem);
});

// Eliminar un ítem por ID
router.delete('/items/:id', async (req, res) => {
  await Item.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

// Obtener datos de una API externa
router.get('/external-data', async (req, res) => {
  try {
    const response = await axios.get('https://api.example.com/data');
    res.status(200).send(response.data);
  } catch (error) {
    res.status(500).send('Error fetching data from external API');
  }
});

module.exports = router;
