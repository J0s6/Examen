// clientes.js

// Datos iniciales de ejemplo
let clientes = [
    { id: 1, nombre: 'Juan Pérez', email: 'juan.perez@example.com', telefono: '555-1234' },
    { id: 2, nombre: 'María López', email: 'maria.lopez@example.com', telefono: '555-5678' },
    { id: 3, nombre: 'Carlos García', email: 'carlos.garcia@example.com', telefono: '555-8765' },
    { id: 4, nombre: 'Lucía Fernández', email: 'lucia.fernandez@example.com', telefono: '555-2345' },
    { id: 5, nombre: 'Roberto Martínez', email: 'roberto.martinez@example.com', telefono: '555-6789' },
    { id: 6, nombre: 'Elena Gómez', email: 'elena.gomez@example.com', telefono: '555-3456' },
    { id: 7, nombre: 'Andrés Ramírez', email: 'andres.ramirez@example.com', telefono: '555-7890' },
    { id: 8, nombre: 'Sofía Herrera', email: 'sofia.herrera@example.com', telefono: '555-4567' },
    { id: 9, nombre: 'Martín Rojas', email: 'martin.rojas@example.com', telefono: '555-8901' },
    { id: 10, nombre: 'Laura Castillo', email: 'laura.castillo@example.com', telefono: '555-5670' },
];

// Inicializar la gestión de clientes
function initClientes() {
    console.log('Gestión de clientes inicializada');
    renderClientes();
    agregarEventos();
    cargarDesdeLocalStorage();
}

// Renderizar la tabla de clientes
function renderClientes() {
    const clientesBody = document.getElementById('clientesBody');
    clientesBody.innerHTML = '';

    clientes.forEach(cliente => {
        const fila = document.createElement('tr');

        fila.innerHTML = `
            <td>${cliente.id}</td>
            <td>${cliente.nombre}</td>
            <td>${cliente.email}</td>
            <td>${cliente.telefono}</td>
            <td>
                <button class="button-edit" onclick="editarCliente(${cliente.id})">Editar</button>
                <button class="button-delete" onclick="eliminarCliente(${cliente.id})">Eliminar</button>
            </td>
        `;

        clientesBody.appendChild(fila);
    });
    guardarEnLocalStorage();
}

// Agregar eventos a los botones principales
function agregarEventos() {
    const addClientButton = document.getElementById('addClientButton');
    if (addClientButton) {
        addClientButton.addEventListener('click', agregarCliente);
    }

    const buscarClienteInput = document.querySelector('.buscar-cliente');
    if (buscarClienteInput) {
        buscarClienteInput.addEventListener('input', buscarCliente);
    }
}

// Función para agregar un nuevo cliente
function agregarCliente() {
    const nombre = prompt('Ingrese el nombre del cliente:');
    const email = prompt('Ingrese el email del cliente:');
    const telefono = prompt('Ingrese el teléfono del cliente:');

    if (nombre && validarEmail(email) && telefono) {
        const nuevoCliente = {
            id: clientes.length + 1,
            nombre,
            email,
            telefono,
        };

        clientes.push(nuevoCliente);
        renderClientes();
    } else {
        alert('Todos los campos son obligatorios y el email debe ser válido.');
    }
}

// Función para editar un cliente existente
function editarCliente(id) {
    const cliente = clientes.find(cli => cli.id === id);
    if (cliente) {
        const nuevoNombre = prompt('Ingrese el nuevo nombre del cliente:', cliente.nombre);
        const nuevoEmail = prompt('Ingrese el nuevo email del cliente:', cliente.email);
        const nuevoTelefono = prompt('Ingrese el nuevo teléfono del cliente:', cliente.telefono);

        if (nuevoNombre && validarEmail(nuevoEmail) && nuevoTelefono) {
            cliente.nombre = nuevoNombre;
            cliente.email = nuevoEmail;
            cliente.telefono = nuevoTelefono;
            renderClientes();
        } else {
            alert('Todos los campos son obligatorios y el email debe ser válido.');
        }
    }
}

// Función para eliminar un cliente
function eliminarCliente(id) {
    const confirmar = confirm('¿Está seguro de que desea eliminar este cliente?');
    if (confirmar) {
        clientes = clientes.filter(cliente => cliente.id !== id);
        renderClientes();
    }
}

// Función para buscar un cliente
function buscarCliente(event) {
    const valorBusqueda = event.target.value.toLowerCase();
    const clientesFiltrados = clientes.filter(cliente =>
        cliente.nombre.toLowerCase().includes(valorBusqueda) ||
        cliente.email.toLowerCase().includes(valorBusqueda) ||
        cliente.telefono.toLowerCase().includes(valorBusqueda)
    );
    renderClientesFiltrados(clientesFiltrados);
}

// Renderizar la tabla de clientes filtrados
function renderClientesFiltrados(clientesFiltrados) {
    const clientesBody = document.getElementById('clientesBody');
    clientesBody.innerHTML = '';

    clientesFiltrados.forEach(cliente => {
        const fila = document.createElement('tr');

        fila.innerHTML = `
            <td>${cliente.id}</td>
            <td>${cliente.nombre}</td>
            <td>${cliente.email}</td>
            <td>${cliente.telefono}</td>
            <td>
                <button class="button-edit" onclick="editarCliente(${cliente.id})">Editar</button>
                <button class="button-delete" onclick="eliminarCliente(${cliente.id})">Eliminar</button>
            </td>
        `;

        clientesBody.appendChild(fila);
    });
}

// Validar email
function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Guardar los datos en el Local Storage
function guardarEnLocalStorage() {
    localStorage.setItem('clientes', JSON.stringify(clientes));
}

// Cargar los datos desde el Local Storage
function cargarDesdeLocalStorage() {
    const clientesGuardados = localStorage.getItem('clientes');
    if (clientesGuardados) {
        clientes = JSON.parse(clientesGuardados);
        renderClientes();
    }
}

// Ejecutar la función de inicialización cuando el documento esté listo
document.addEventListener('DOMContentLoaded', initClientes);
