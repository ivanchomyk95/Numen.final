// Función para crear un nuevo usuario
async function crearUsuario(event) {
    event.preventDefault(); // Prevenir el comportamiento por defecto del formulario

    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;

    try {
        const response = await fetch('http://localhost:3000/api/usuarios', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nombre, email }),
        });

        if (!response.ok) {
            throw new Error('Error al crear usuario');
        }

        const nuevoUsuario = await response.json();
        alert(`Usuario creado correctamente: ${nuevoUsuario.nombre}`);
        mostrarUsuarios(); // Actualizar la lista de usuarios después de crear uno nuevo
    } catch (error) {
        console.error('Error al crear usuario:', error);
        alert('Hubo un error al crear el usuario');
    }
}

// Función para mostrar todos los usuarios
async function mostrarUsuarios() {
    try {
        const response = await fetch('http://localhost:3000/api/usuarios');
        if (!response.ok) {
            throw new Error('Error al obtener usuarios');
        }
        const usuarios = await response.json();
        actualizarListaUsuarios(usuarios); // Asegúrate de que esta función muestre el ID, nombre y email
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        alert('Hubo un error al obtener los usuarios');
    }
}
// Función para modificar un usuario
async function modificarUsuario() {
    const idUsuario = prompt('Ingrese el ID del usuario a modificar:');
    if (!idUsuario) return;

    const nombre = prompt('Ingrese el nuevo nombre del usuario:');
    const email = prompt('Ingrese el nuevo email del usuario:');

    const datosActualizados = {};
    if (nombre) datosActualizados.nombre = nombre;
    if (email) datosActualizados.email = email;

    try {
        const response = await fetch(`http://localhost:3000/api/usuarios/${idUsuario}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(datosActualizados),
        });

        if (!response.ok) {
            throw new Error('Error al modificar usuario');
        }

        alert('Usuario modificado correctamente');
        mostrarUsuarios(); // Actualizar la lista de usuarios después de modificar
    } catch (error) {
        console.error('Error al modificar usuario:', error);
        alert('Hubo un error al modificar el usuario');
    }
}

// Función para eliminar un usuario
async function eliminarUsuario() {
    const idUsuario = prompt('Ingrese el ID del usuario a eliminar:');
    if (!idUsuario) return;

    try {
        const response = await fetch(`http://localhost:3000/api/usuarios/${idUsuario}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Error al eliminar usuario');
        }

        alert('Usuario eliminado correctamente');
        mostrarUsuarios(); // Actualizar la lista de usuarios después de eliminar
    } catch (error) {
        console.error('Error al eliminar usuario:', error);
        alert('Hubo un error al eliminar el usuario');
    }
}

// Función para actualizar la lista de usuarios en el HTML
function actualizarListaUsuarios(usuarios) {
    const listaUsuarios = document.getElementById('usuariosLista');
    listaUsuarios.innerHTML = ''; // Limpiar la lista antes de actualizar

    usuarios.forEach(usuario => {
        const listItem = document.createElement('li');
        listItem.textContent = `ID: ${usuario._id}, Nombre: ${usuario.nombre}, Email: ${usuario.email}`;
        listaUsuarios.appendChild(listItem);
    });
}


// Asignar eventos a los botones en el HTML
document.getElementById('btnMostrarUsuarios').addEventListener('click', mostrarUsuarios);
document.getElementById('btnModificarUsuario').addEventListener('click', modificarUsuario);
document.getElementById('btnEliminarUsuario').addEventListener('click', eliminarUsuario);
// Asignar evento submit al formulario para crear usuario
document.getElementById('crearUsuarioForm').addEventListener('submit', crearUsuario);

// Al cargar la página, mostrar la lista de usuarios inicial
// mostrarUsuarios();
