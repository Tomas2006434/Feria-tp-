const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Conectar a MongoDB
mongoose.connect('mongodb://localhost:27017/banco', { useNewUrlParser: true, useUnifiedTopology: true });

// Definir el esquema y modelo de usuario
const UserSchema = new mongoose.Schema({
  name: String,
  password: String,
});

const User = mongoose.model('User', UserSchema);

// Registrar usuario
app.post('/register', async (req, res) => {
  const { name, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ name, password: hashedPassword });
  await user.save();
  res.status(201).send({ success: true });
});

// Iniciar sesión
app.post('/login', async (req, res) => {
  const { name, password } = req.body })
