import express from 'express';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { body, validationResult } from 'express-validator';
import mongodb from 'mongodb';

const { MongoClient, ObjectId } = mongodb;
const app = express();
const port = 3000;

// Middleware para analizar cuerpos JSON
app.use(express.json());

// Define __dirname manualmente para entornos ES6
const __dirname = dirname(fileURLToPath(import.meta.url));

// Configurar URI de conexión a MongoDB Atlas
const uri = "mongodb+srv://iaroskarel:aq1wvpE4Kdex9SH0@cluster0.simj2aa.mongodb.net/tpivan?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

let collection;

async function connectToMongoDB() {
    try {
        await client.connect();
        console.log("Conectado correctamente a MongoDB Atlas");
        const database = client.db("tpivan");
        collection = database.collection("usuarios");
    } catch (err) {
        console.error("Error al conectar a MongoDB:", err);
    }
}

connectToMongoDB();

// Middleware para validar el ObjectId
const validateObjectId = (req, res, next) => {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) {
        return res.status(400).json({ error: "ID inválido" });
    }
    next();
};

// Rutas CRUD

// Ruta de bienvenida o página principal
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// 1. Obtener todos los usuarios
app.get('/api/usuarios', async (req, res) => {
    try {
        const usuarios = await collection.find({}).toArray();
        res.json(usuarios);
    } catch (err) {
        console.error("Error al obtener usuarios:", err);
        res.status(500).json({ error: "Error al obtener usuarios" });
    }
});


// 2. Actualizar un usuario existente por ID
app.put('/api/usuarios/:id', validateObjectId, async (req, res) => {
    const id = req.params.id;
    const { nombre, email } = req.body;
    const updateData = {};
    if (nombre) updateData.nombre = nombre;
    if (email) updateData.email = email;

    try {
        const resultado = await collection.updateOne(
            { _id: new ObjectId(id) },
            { $set: updateData }
        );
        if (resultado.matchedCount === 0) {
            return res.status(404).json({ error: "Usuario no encontrado para actualizar" });
        }
        res.json({ message: "Usuario actualizado correctamente" });
    } catch (err) {
        console.error("Error al actualizar usuario:", err);
        res.status(500).json({ error: "Error al actualizar usuario" });
    }
});

// 3. Eliminar un usuario por ID
app.delete('/api/usuarios/:id', validateObjectId, async (req, res) => {
    const id = req.params.id;
    try {
        const resultado = await collection.deleteOne({ _id: new ObjectId(id) });
        if (resultado.deletedCount === 0) {
            return res.status(404).json({ error: "Usuario no encontrado para eliminar" });
        }
        res.json({ message: "Usuario eliminado correctamente" });
    } catch (err) {
        console.error("Error al eliminar usuario:", err);
        res.status(500).json({ error: "Error al eliminar usuario" });
    }
});

// 4. Crear un nuevo usuario
app.post('/api/usuarios', async (req, res) => {
    const { nombre, email } = req.body;

    try {
        const resultado = await collection.insertOne({ nombre, email });
        const nuevoUsuario = resultado.ops[0];
        res.status(201).json(nuevoUsuario);
    } catch (error) {
        console.error('Error al crear usuario:', error);
        res.status(500).json({ error: 'Error al crear usuario' });
    }
});

// Servir archivos estáticos desde el directorio 'public'
app.use(express.static('public'));

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
