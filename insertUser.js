import fetch from 'node-fetch';

const newUser = {
  name: "John Doe",
  email: "john.doe@example.com",
  age: 30
};

fetch('http://localhost:3000/api/documents', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(newUser),
})
.then(response => response.json())
.then(data => {
  console.log('Documento insertado:', data);
})
.catch(error => {
  console.error('Error al insertar documento:', error);
});
