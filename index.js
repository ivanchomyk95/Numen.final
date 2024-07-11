// const { MongoClient } = require('mongodb');

// // URL de conexión de MongoDB Atlas
// const uri = "mongodb+srv://iaroskarel:aq1wvpE4Kdex9SH0@cluster0.simj2aa.mongodb.net/tpivan?retryWrites=true&w=majority&appName=Cluster0";

// // Nombre de la base de datos y colección que deseas utilizar
// const dbName = "tpivan";
// const collectionName = "<collection>"; // Reemplaza con el nombre de tu colección

// // Crear un cliente de MongoDB
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// // Conectar al servidor de MongoDB Atlas
// client.connect(err => {
//   if (err) {
//     console.error('Error de conexión a MongoDB:', err);
//     return;
//   }
//   console.log('Conectado correctamente a MongoDB Atlas');

//   const database = client.db(dbName);
//   const collection = database.collection(collectionName);

//   // Ejemplo de inserción de un documento
//   collection.insertOne({ name: "Ejemplo", age: 30 })
//     .then(result => {
//       console.log("Documento insertado:", result.insertedId);
//     })
//     .catch(err => {
//       console.error("Error al insertar documento:", err);
//     })
//     .finally(() => {
//       client.close(); // Cierra la conexión al terminar las operaciones
//     });
// });


// ***
// const http = require('http');
// const { MongoClient } = require('mongodb');
// const fs = require('fs');
// const path = require('path');

// // URL de conexión de MongoDB Atlas
// const uri = "mongodb+srv://iaroskarel:aq1wvpE4Kdex9SH0@cluster0.simj2aa.mongodb.net/tpivan?retryWrites=true&w=majority&appName=Cluster0";

// // Nombre de la base de datos y colección que deseas utilizar
// const dbName = "tpivan";
// const collectionName = "usuarios"; // Reemplaza "usuarios" con el nombre de tu colección

// // Crear un cliente de MongoDB
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// client.connect(err => {
//   if (err) {
//     console.error('Error de conexión a MongoDB:', err);
//     return;
//   }
//   console.log('Conectado correctamente a MongoDB Atlas');

//   const database = client.db(dbName);
//   const collection = database.collection(collectionName);

//   // Crear el servidor HTTP
//   const server = http.createServer((req, res) => {
//     if (req.method === 'GET' && req.url === '/') {
//       // Servir el archivo HTML estático
//       const filePath = path.join(__dirname, 'index.html');
//       fs.readFile(filePath, (err, content) => {
//         if (err) {
//           res.writeHead(500, { 'Content-Type': 'text/plain' });
//           res.end('Error al cargar el archivo HTML');
//         } else {
//           res.writeHead(200, { 'Content-Type': 'text/html' });
//           res.end(content);
//         }
//       });
//     } else if (req.method === 'GET' && req.url === '/api/usuarios') {
//       // Obtener los datos de la colección y enviarlos como JSON
//       collection.find({}).toArray((err, users) => {
//         if (err) {
//           res.writeHead(500, { 'Content-Type': 'application/json' });
//           res.end(JSON.stringify({ error: 'Error al obtener los datos' }));
//         } else {
//           res.writeHead(200, { 'Content-Type': 'application/json' });
//           res.end(JSON.stringify(users));
//         }
//       });
//     } else {
//       res.writeHead(404, { 'Content-Type': 'text/plain' });
//       res.end('Not Found');
//     }
//   });

//   // Iniciar el servidor
//   const port = process.env.PORT || 3000;
//   server.listen(port, () => {
//     console.log(`Server is running on http://localhost:${port}`);
//   });
// });

// index.js


// ***
// const { MongoClient } = require('mongodb');

// // URI de conexión a MongoDB Atlas
// const uri = "mongodb+srv://iaroskarel:aq1wvpE4Kdex9SH0@cluster0.simj2aa.mongodb.net/<dbname>?retryWrites=true&w=majority";

// // Crear un nuevo cliente de MongoDB
// const client = new MongoClient(uri, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// // Función asincrónica para conectar y realizar operaciones
// async function run() {
//   try {
//     // Conectar al cliente de MongoDB
//     await client.connect();
//     console.log("Conectado correctamente a MongoDB Atlas");

//     // Seleccionar la base de datos
//     const database = client.db("<dbname>");

//     // Seleccionar la colección
//     const collection = database.collection("<collection>");

//     // Documentos de ejemplo para insertar
//     const usuarios = [
//       { name: "Juan Pérez", age: 28 },
//       { name: "María García", age: 34 },
//       { name: "Pedro Gómez", age: 45 }
//     ];

//     // Insertar varios documentos en la colección
//     const result = await collection.insertMany(usuarios);
//     console.log(`${result.insertedCount} documentos insertados`);

//   } catch (err) {
//     console.error("Error al conectar o insertar documentos:", err);
//   } finally {
//     // Cerrar la conexión al finalizar
//     await client.close();
//   }
// }

// // Llamar a la función para ejecutarla
// run().catch(console.dir);


// 

// ***

const http = require('http');
const { MongoClient } = require('mongodb');

// Configurar URI de conexión a MongoDB Atlas
const uri = "mongodb+srv://iaroskarel:aq1wvpE4Kdex9SH0@cluster0.simj2aa.mongodb.net/tpivan?retryWrites=true&w=majority";

// Crear cliente de MongoDB
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Crear servidor HTTP
const server = http.createServer(async (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });

  try {
    // Conectar a MongoDB
    await client.connect();
    console.log("Conectado correctamente a MongoDB Atlas");

    // Seleccionar la base de datos y la colección
    const database = client.db("tpivan");
    const collection = database.collection("usuarios");

    // Consultar documentos desde la colección "usuarios"
    const usuarios = await collection.find({}).toArray();
    console.log("Documentos encontrados:", usuarios);

    // Mostrar los nombres de los usuarios en la respuesta HTTP
    const names = usuarios.map(user => user.name).join(', ');
    res.end(`Usuarios encontrados: ${names}`);
  } catch (err) {
    console.error("Error al consultar documentos:", err);
    res.end('Error al consultar documentos');
  } finally {
    // Cerrar la conexión de MongoDB
    await client.close();
  }
});

// Función para iniciar el servidor HTTP
async function runServer() {
  // Iniciar el servidor HTTP
  server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
  });
}

// Llamar a la función para iniciar el servidor
runServer();

