// reportes.js

// Inicializar la gestión de reportes
function initReportes() {
    console.log('Gestión de reportes inicializada');
    agregarEventos();
}

// Agregar eventos a los botones principales
function agregarEventos() {
    document.addEventListener('click', function (e) {
        if (e.target && e.target.id === 'generarReporteCompras') {
            generarReporteCompras();
        }
        if (e.target && e.target.id === 'generarReporteVentas') {
            generarReporteVentas();
        }
        if (e.target && e.target.id === 'generarReporteInventario') {
            generarReporteInventario();
        }
    });
}

// Función para generar reporte de compras
function generarReporteCompras() {
    const reporte = {
        titulo: `Reporte de Compras - ${new Date().toLocaleString()}`,
        contenido: [
            { idCompra: 'C001', fecha: '2024-01-10', proveedor: 'Proveedor A', productos: 'Martillo, Taladro', cantidad: 70, total: '$5000', metodoPago: 'Tarjeta de Crédito' },
            { idCompra: 'C002', fecha: '2024-01-15', proveedor: 'Proveedor B', productos: 'Cinta métrica', cantidad: 20, total: '$1500', metodoPago: 'Transferencia Bancaria' },
        ]
    };
    agregarReporteALista(reporte);
}

// Función para generar reporte de ventas
function generarReporteVentas() {
    const reporte = {
        titulo: `Reporte de Ventas - ${new Date().toLocaleString()}`,
        contenido: [
            { idVenta: 'V001', fecha: '2024-01-12', cliente: 'Cliente A', productos: 'Martillo', cantidad: 2, total: '$400', metodoPago: 'Efectivo' },
            { idVenta: 'V002', fecha: '2024-01-18', cliente: 'Cliente B', productos: 'Taladro', cantidad: 1, total: '$2500', metodoPago: 'Tarjeta de Débito' },
        ]
    };
    agregarReporteALista(reporte);
}

// Función para generar reporte de inventario
function generarReporteInventario() {
    const reporte = {
        titulo: `Reporte de Inventario - ${new Date().toLocaleString()}`,
        contenido: [
            { idProducto: 'A001', nombre: 'Martillo', categoria: 'Herramientas', cantidadDisponible: 50, proveedor: 'Proveedor A', precioUnitario: '$100' },
            { idProducto: 'A002', nombre: 'Taladro', categoria: 'Herramientas Eléctricas', cantidadDisponible: 20, proveedor: 'Proveedor B', precioUnitario: '$2500' },
        ]
    };
    agregarReporteALista(reporte);
}

// Agregar el reporte generado a la lista de reportes
function agregarReporteALista(reporte) {
    const listaReportes = document.getElementById('listaReportes');
    const itemReporte = document.createElement('li');
    itemReporte.classList.add('reporte');
    
    const titulo = document.createElement('h3');
    titulo.textContent = reporte.titulo;
    itemReporte.appendChild(titulo);

    reporte.contenido.forEach(item => {
        const parrafo = document.createElement('p');
        parrafo.textContent = JSON.stringify(item, null, 2);
        itemReporte.appendChild(parrafo);
    });

    listaReportes.appendChild(itemReporte);
}

// Ejecutar la función de inicialización cuando el documento esté listo
document.addEventListener('DOMContentLoaded', initReportes);
