// ventas.js

// Datos iniciales de ejemplo para las ventas
let ventas = [
    { id: 1, fecha: '2024-01-20', cliente: 'Cliente A', productos: 'Martillo, Taladro', cantidad: 3, total: 3500, metodoPago: 'Tarjeta de Crédito' },
    { id: 2, fecha: '2024-01-21', cliente: 'Cliente B', productos: 'Sierra', cantidad: 1, total: 1500, metodoPago: 'Efectivo' },
];

// Inicializar la gestión de ventas
function initVentas() {
    console.log('Gestión de ventas inicializada');
    renderVentas();
    agregarEventos();
    renderGraficaVentas();
}

// Renderizar la tabla de ventas
function renderVentas() {
    const ventasBody = document.getElementById('ventasBody');
    ventasBody.innerHTML = '';

    ventas.forEach(venta => {
        const fila = document.createElement('tr');

        fila.innerHTML = `
            <td>${venta.id}</td>
            <td>${venta.fecha}</td>
            <td>${venta.cliente}</td>
            <td>${venta.productos}</td>
            <td>${venta.cantidad}</td>
            <td>$${venta.total}</td>
            <td>${venta.metodoPago}</td>
            <td>
                <button class="button-edit" onclick="editarVenta(${venta.id})">Editar</button>
                <button class="button-delete" onclick="eliminarVenta(${venta.id})">Eliminar</button>
            </td>
        `;

        ventasBody.appendChild(fila);
    });
}

// Agregar eventos a los botones principales
function agregarEventos() {
    const nuevaVentaButton = document.getElementById('nuevaVentaButton');
    if (nuevaVentaButton) {
        nuevaVentaButton.addEventListener('click', mostrarFormularioVenta);
    }

    const buscarVentaInput = document.querySelector('.buscar-venta');
    if (buscarVentaInput) {
        buscarVentaInput.addEventListener('input', buscarVenta);
    }

    const botonRegistrarVenta = document.getElementById('boton-registrar-venta');
    if (botonRegistrarVenta) {
        botonRegistrarVenta.addEventListener('click', registrarNuevaVenta);
    }
}

// Mostrar el formulario de registro de ventas
function mostrarFormularioVenta() {
    const formularioVenta = document.getElementById('formulario-venta');
    formularioVenta.classList.toggle('active');
}

// Función para registrar una nueva venta
function registrarNuevaVenta() {
    const cliente = document.getElementById('venta-cliente').value;
    const productos = document.getElementById('venta-productos').value;
    const cantidad = document.getElementById('venta-cantidad').value;
    const total = document.getElementById('venta-total').value;
    const metodoPago = document.getElementById('venta-metodo-pago').value;
    const fecha = new Date().toLocaleDateString();

    if (cliente && productos && cantidad && total && metodoPago) {
        const nuevaVenta = {
            id: ventas.length + 1,
            fecha,
            cliente,
            productos,
            cantidad: parseInt(cantidad),
            total: parseFloat(total),
            metodoPago,
        };

        ventas.push(nuevaVenta);
        renderVentas();
        renderGraficaVentas();
        mostrarFormularioVenta();
    } else {
        alert('Todos los campos son obligatorios para registrar una nueva venta.');
    }
}

// Función para editar una venta existente
function editarVenta(id) {
    const venta = ventas.find(v => v.id === id);
    if (venta) {
        const nuevoCliente = prompt('Ingrese el nuevo nombre del cliente:', venta.cliente);
        const nuevosProductos = prompt('Ingrese los nuevos productos vendidos (separados por comas):', venta.productos);
        const nuevaCantidad = prompt('Ingrese la nueva cantidad de productos vendidos:', venta.cantidad);
        const nuevoTotal = prompt('Ingrese el nuevo total de la venta:', venta.total);
        const nuevoMetodoPago = prompt('Ingrese el nuevo método de pago:', venta.metodoPago);

        if (nuevoCliente && nuevosProductos && nuevaCantidad && nuevoTotal && nuevoMetodoPago) {
            venta.cliente = nuevoCliente;
            venta.productos = nuevosProductos;
            venta.cantidad = parseInt(nuevaCantidad);
            venta.total = parseFloat(nuevoTotal);
            venta.metodoPago = nuevoMetodoPago;
            renderVentas();
            renderGraficaVentas();
        } else {
            alert('Todos los campos son obligatorios para editar la venta.');
        }
    }
}

// Función para eliminar una venta
function eliminarVenta(id) {
    const confirmar = confirm('¿Está seguro de que desea eliminar esta venta?');
    if (confirmar) {
        ventas = ventas.filter(venta => venta.id !== id);
        renderVentas();
        renderGraficaVentas();
    }
}

// Función para buscar una venta
function buscarVenta(event) {
    const valorBusqueda = event.target.value.toLowerCase();
    const ventasFiltradas = ventas.filter(venta =>
        venta.cliente.toLowerCase().includes(valorBusqueda) ||
        venta.productos.toLowerCase().includes(valorBusqueda)
    );
    renderVentasFiltradas(ventasFiltradas);
}

// Renderizar la tabla de ventas filtradas
function renderVentasFiltradas(ventasFiltradas) {
    const ventasBody = document.getElementById('ventasBody');
    ventasBody.innerHTML = '';

    ventasFiltradas.forEach(venta => {
        const fila = document.createElement('tr');

        fila.innerHTML = `
            <td>${venta.id}</td>
            <td>${venta.fecha}</td>
            <td>${venta.cliente}</td>
            <td>${venta.productos}</td>
            <td>${venta.cantidad}</td>
            <td>$${venta.total}</td>
            <td>${venta.metodoPago}</td>
            <td>
                <button class="button-edit" onclick="editarVenta(${venta.id})">Editar</button>
                <button class="button-delete" onclick="eliminarVenta(${venta.id})">Eliminar</button>
            </td>
        `;

        ventasBody.appendChild(fila);
    });
}

// Renderizar gráfica de ventas
function renderGraficaVentas() {
    const ctx = document.getElementById('grafica-ventas').getContext('2d');
    const fechas = ventas.map(venta => venta.fecha);
    const totales = ventas.map(venta => venta.total);

    if (window.graficaVentas) {
        window.graficaVentas.destroy();
    }

    window.graficaVentas = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: fechas,
            datasets: [{
                label: 'Ventas Totales',
                data: totales,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Ejecutar la función de inicialización cuando el documento esté listo
document.addEventListener('DOMContentLoaded', initVentas);
