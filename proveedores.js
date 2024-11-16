// proveedores.js

// Datos iniciales de ejemplo para los proveedores
let proveedores = [
    { id: 1, idProveedor: 'P001', proveedor: 'Proveedor A', producto: 'Martillo', diasEntrega: 'Lunes, Miércoles', horarios: '9:00 - 18:00', contacto: 'Juan Pérez', correo: 'juan@proveedora.com', calidadProducto: 'Alta', frecuenciaAbastecimiento: 'Mensual', duracionContrato: '1 año' },
    { id: 2, idProveedor: 'P002', proveedor: 'Proveedor B', producto: 'Taladro', diasEntrega: 'Martes, Jueves', horarios: '10:00 - 17:00', contacto: 'María López', correo: 'maria@proveedoreb.com', calidadProducto: 'Media', frecuenciaAbastecimiento: 'Quincenal', duracionContrato: '6 meses' },
];

// Inicializar la gestión de proveedores
function initProveedores() {
    console.log('Gestión de proveedores inicializada');
    renderProveedores();
    agregarEventos();
    cargarDesdeLocalStorage();
}

// Renderizar la tabla de proveedores
function renderProveedores() {
    const proveedoresBody = document.getElementById('proveedoresBody');
    proveedoresBody.innerHTML = '';

    proveedores.forEach(proveedor => {
        const fila = document.createElement('tr');

        fila.innerHTML = `
            <td>${proveedor.id}</td>
            <td>${proveedor.idProveedor}</td>
            <td>${proveedor.proveedor}</td>
            <td>${proveedor.producto}</td>
            <td>${proveedor.diasEntrega}</td>
            <td>${proveedor.horarios}</td>
            <td>${proveedor.contacto}</td>
            <td>${proveedor.correo}</td>
            <td>${proveedor.calidadProducto}</td>
            <td>${proveedor.frecuenciaAbastecimiento}</td>
            <td>${proveedor.duracionContrato}</td>
            <td>
                <button class="button-edit" onclick="editarProveedor(${proveedor.id})">Editar</button>
                <button class="button-delete" onclick="eliminarProveedor(${proveedor.id})">Eliminar</button>
            </td>
        `;

        proveedoresBody.appendChild(fila);
    });
    guardarEnLocalStorage();
}

// Agregar eventos a los botones principales
function agregarEventos() {
    const addProveedorButton = document.getElementById('addProveedorButton');
    if (addProveedorButton) {
        addProveedorButton.addEventListener('click', agregarProveedor);
    }

    const buscarProveedorInput = document.querySelector('.buscar-proveedor');
    if (buscarProveedorInput) {
        buscarProveedorInput.addEventListener('input', buscarProveedor);
    }
}

// Función para agregar un nuevo proveedor
function agregarProveedor() {
    const idProveedor = prompt('Ingrese el ID del proveedor:');
    const proveedor = prompt('Ingrese el nombre del proveedor:');
    const producto = prompt('Ingrese el producto suministrado:');
    const diasEntrega = prompt('Ingrese los días de entrega:');
    const horarios = prompt('Ingrese los horarios de entrega:');
    const contacto = prompt('Ingrese el nombre del contacto:');
    const correo = prompt('Ingrese el correo del proveedor:');
    const calidadProducto = prompt('Ingrese la calidad del producto:');
    const frecuenciaAbastecimiento = prompt('Ingrese la frecuencia de abastecimiento:');
    const duracionContrato = prompt('Ingrese la duración del contrato:');

    if (idProveedor && proveedor && producto && diasEntrega && horarios && contacto && correo && calidadProducto && frecuenciaAbastecimiento && duracionContrato) {
        const nuevoProveedor = {
            id: proveedores.length + 1,
            idProveedor,
            proveedor,
            producto,
            diasEntrega,
            horarios,
            contacto,
            correo,
            calidadProducto,
            frecuenciaAbastecimiento,
            duracionContrato,
        };

        proveedores.push(nuevoProveedor);
        renderProveedores();
    } else {
        alert('Todos los campos son obligatorios para agregar un proveedor.');
    }
}

// Función para editar un proveedor existente
function editarProveedor(id) {
    const proveedor = proveedores.find(prov => prov.id === id);
    if (proveedor) {
        const nuevoIdProveedor = prompt('Ingrese el nuevo ID del proveedor:', proveedor.idProveedor);
        const nuevoProveedor = prompt('Ingrese el nuevo nombre del proveedor:', proveedor.proveedor);
        const nuevoProducto = prompt('Ingrese el nuevo producto suministrado:', proveedor.producto);
        const nuevosDiasEntrega = prompt('Ingrese los nuevos días de entrega:', proveedor.diasEntrega);
        const nuevosHorarios = prompt('Ingrese los nuevos horarios de entrega:', proveedor.horarios);
        const nuevoContacto = prompt('Ingrese el nuevo nombre del contacto:', proveedor.contacto);
        const nuevoCorreo = prompt('Ingrese el nuevo correo del proveedor:', proveedor.correo);
        const nuevaCalidadProducto = prompt('Ingrese la nueva calidad del producto:', proveedor.calidadProducto);
        const nuevaFrecuenciaAbastecimiento = prompt('Ingrese la nueva frecuencia de abastecimiento:', proveedor.frecuenciaAbastecimiento);
        const nuevaDuracionContrato = prompt('Ingrese la nueva duración del contrato:', proveedor.duracionContrato);

        if (nuevoIdProveedor && nuevoProveedor && nuevoProducto && nuevosDiasEntrega && nuevosHorarios && nuevoContacto && nuevoCorreo && nuevaCalidadProducto && nuevaFrecuenciaAbastecimiento && nuevaDuracionContrato) {
            proveedor.idProveedor = nuevoIdProveedor;
            proveedor.proveedor = nuevoProveedor;
            proveedor.producto = nuevoProducto;
            proveedor.diasEntrega = nuevosDiasEntrega;
            proveedor.horarios = nuevosHorarios;
            proveedor.contacto = nuevoContacto;
            proveedor.correo = nuevoCorreo;
            proveedor.calidadProducto = nuevaCalidadProducto;
            proveedor.frecuenciaAbastecimiento = nuevaFrecuenciaAbastecimiento;
            proveedor.duracionContrato = nuevaDuracionContrato;
            renderProveedores();
        } else {
            alert('Todos los campos son obligatorios para editar un proveedor.');
        }
    }
}

// Función para eliminar un proveedor
function eliminarProveedor(id) {
    const confirmar = confirm('¿Está seguro de que desea eliminar este proveedor?');
    if (confirmar) {
        proveedores = proveedores.filter(proveedor => proveedor.id !== id);
        renderProveedores();
    }
}

// Función para buscar un proveedor
function buscarProveedor(event) {
    const valorBusqueda = event.target.value.toLowerCase();
    const proveedoresFiltrados = proveedores.filter(proveedor =>
        proveedor.idProveedor.toLowerCase().includes(valorBusqueda) ||
        proveedor.proveedor.toLowerCase().includes(valorBusqueda) ||
        proveedor.producto.toLowerCase().includes(valorBusqueda) ||
        proveedor.contacto.toLowerCase().includes(valorBusqueda) ||
        proveedor.correo.toLowerCase().includes(valorBusqueda)
    );
    renderProveedoresFiltrados(proveedoresFiltrados);
}

// Renderizar la tabla de proveedores filtrados
function renderProveedoresFiltrados(proveedoresFiltrados) {
    const proveedoresBody = document.getElementById('proveedoresBody');
    proveedoresBody.innerHTML = '';

    proveedoresFiltrados.forEach(proveedor => {
        const fila = document.createElement('tr');

        fila.innerHTML = `
            <td>${proveedor.id}</td>
            <td>${proveedor.idProveedor}</td>
            <td>${proveedor.proveedor}</td>
            <td>${proveedor.producto}</td>
            <td>${proveedor.diasEntrega}</td>
            <td>${proveedor.horarios}</td>
            <td>${proveedor.contacto}</td>
            <td>${proveedor.correo}</td>
            <td>${proveedor.calidadProducto}</td>
            <td>${proveedor.frecuenciaAbastecimiento}</td>
            <td>${proveedor.duracionContrato}</td>
            <td>
                <button class="button-edit" onclick="editarProveedor(${proveedor.id})">Editar</button>
                <button class="button-delete" onclick="eliminarProveedor(${proveedor.id})">Eliminar</button>
            </td>
        `;

        proveedoresBody.appendChild(fila);
    });
}

// Guardar los datos en el Local Storage
function guardarEnLocalStorage() {
    localStorage.setItem('proveedores', JSON.stringify(proveedores));
}

// Cargar los datos desde el Local Storage
function cargarDesdeLocalStorage() {
    const proveedoresGuardados = localStorage.getItem('proveedores');
    if (proveedoresGuardados) {
        proveedores = JSON.parse(proveedoresGuardados);
        renderProveedores();
    }
}

// Ejecutar la función de inicialización cuando el documento esté listo
document.addEventListener('DOMContentLoaded', initProveedores);
