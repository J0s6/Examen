// dashboard.js

// Inicializar el dashboard
function initDashboard() {
    console.log('Dashboard inicializado');
    agregarEventosTransacciones();
    generarTablaTransacciones();
    generarTablaPagos();
    generarTablaTotales();
    generarGraficoVentas();
}

// Agregar eventos a los elementos de la transacción
function agregarEventosTransacciones() {
    // Evento para botón 'Volver'
    const backButton = document.querySelector('.button-back');
    if (backButton) {
        backButton.addEventListener('click', () => {
            console.log('Volver a transacciones recientes');
            // Aquí podrías implementar la lógica para navegar a la vista de transacciones recientes
        });
    }

    // Evento para el botón 'Guardar'
    const saveButton = document.querySelector('.button-save');
    const notasInput = document.querySelector('.input-notas');
    if (saveButton && notasInput) {
        saveButton.addEventListener('click', () => {
            const nota = notasInput.value;
            console.log(`Nota guardada: ${nota}`);
            alert('Nota guardada correctamente');
        });
    }

    // Eventos para los botones de acciones (Anular, Reembolso, Imprimir)
    const voidButton = document.querySelector('.button-void');
    if (voidButton) {
        voidButton.addEventListener('click', () => {
            console.log('Transacción anulada');
            alert('Transacción anulada');
        });
    }

    const refundButton = document.querySelector('.button-refund');
    if (refundButton) {
        refundButton.addEventListener('click', () => {
            console.log('Reembolso realizado');
            alert('Reembolso realizado');
        });
    }

    const printButton = document.querySelector('.button-print');
    if (printButton) {
        printButton.addEventListener('click', () => {
            console.log('Imprimiendo recibo');
            alert('Imprimiendo recibo...');
        });
    }
}

// Generar tabla de transacciones
function generarTablaTransacciones() {
    const contentElement = document.querySelector('.content');
    if (contentElement) {
        const tablaContainer = document.createElement('div');
        tablaContainer.classList.add('tabla-transacciones-container');

        const tablaTransacciones = document.createElement('table');
        tablaTransacciones.classList.add('tabla-transacciones');

        // Encabezado de la tabla
        const thead = document.createElement('thead');
        const encabezadoFila = document.createElement('tr');
        const encabezados = ['ID', 'Usuario', 'Dispositivo', 'Ubicación', 'Fecha de Venta', 'Estado'];
        encabezados.forEach(encabezado => {
            const th = document.createElement('th');
            th.innerText = encabezado;
            encabezadoFila.appendChild(th);
        });
        thead.appendChild(encabezadoFila);
        tablaTransacciones.appendChild(thead);

        // Cuerpo de la tabla
        const tbody = document.createElement('tbody');
        const transacciones = [
            { id: 83, usuario: 'admin', dispositivo: "Michael's PC", ubicacion: "Michael's room", fecha: '5/8/14 19:51:42', estado: 'Completo' },
        ];
        transacciones.forEach(transaccion => {
            const fila = document.createElement('tr');
            Object.values(transaccion).forEach(valor => {
                const td = document.createElement('td');
                td.innerText = valor;
                fila.appendChild(td);
            });
            tbody.appendChild(fila);
        });
        tablaTransacciones.appendChild(tbody);

        tablaContainer.appendChild(tablaTransacciones);
        contentElement.appendChild(tablaContainer);
    }
}

// Generar tabla de pagos
function generarTablaPagos() {
    const contentElement = document.querySelector('.content');
    if (contentElement) {
        const tablaPagosContainer = document.createElement('div');
        tablaPagosContainer.classList.add('tabla-pagos-container');

        const tablaPagos = document.createElement('table');
        tablaPagos.classList.add('tabla-pagos');

        // Encabezado de la tabla
        const thead = document.createElement('thead');
        const encabezadoFila = document.createElement('tr');
        const encabezados = ['Método', 'Monto'];
        encabezados.forEach(encabezado => {
            const th = document.createElement('th');
            th.innerText = encabezado;
            encabezadoFila.appendChild(th);
        });
        thead.appendChild(encabezadoFila);
        tablaPagos.appendChild(thead);

        // Cuerpo de la tabla
        const tbody = document.createElement('tbody');
        const pagos = [
            { metodo: 'eftpos', monto: '$30.90' },
        ];
        pagos.forEach(pago => {
            const fila = document.createElement('tr');
            Object.values(pago).forEach(valor => {
                const td = document.createElement('td');
                td.innerText = valor;
                fila.appendChild(td);
            });
            tbody.appendChild(fila);
        });
        tablaPagos.appendChild(tbody);

        tablaPagosContainer.appendChild(tablaPagos);
        contentElement.appendChild(tablaPagosContainer);
    }
}

// Generar tabla de totales de la venta
function generarTablaTotales() {
    const contentElement = document.querySelector('.content');
    if (contentElement) {
        const tablaTotalesContainer = document.createElement('div');
        tablaTotalesContainer.classList.add('tabla-totales-container');

        const tablaTotales = document.createElement('table');
        tablaTotales.classList.add('tabla-totales');

        // Encabezado de la tabla
        const thead = document.createElement('thead');
        const encabezadoFila = document.createElement('tr');
        const encabezados = ['Descripción', 'Monto'];
        encabezados.forEach(encabezado => {
            const th = document.createElement('th');
            th.innerText = encabezado;
            encabezadoFila.appendChild(th);
        });
        thead.appendChild(encabezadoFila);
        tablaTotales.appendChild(thead);

        // Cuerpo de la tabla
        const tbody = document.createElement('tbody');
        const totales = [
            { descripcion: 'Subtotal', monto: '$28.09' },
            { descripcion: 'GST (10%)', monto: '$2.81' },
            { descripcion: 'Total', monto: '$30.90' },
        ];
        totales.forEach(total => {
            const fila = document.createElement('tr');
            Object.values(total).forEach(valor => {
                const td = document.createElement('td');
                td.innerText = valor;
                fila.appendChild(td);
            });
            tbody.appendChild(fila);
        });
        tablaTotales.appendChild(tbody);

        tablaTotalesContainer.appendChild(tablaTotales);
        contentElement.appendChild(tablaTotalesContainer);
    }
}

// Generar gráfico de ventas
function generarGraficoVentas() {
    const contentElement = document.querySelector('.content');
    if (contentElement) {
        // Crear canvas para el gráfico
        const graficoContainer = document.createElement('div');
        graficoContainer.classList.add('grafico-ventas-container');
        const graficoCanvas = document.createElement('canvas');
        graficoCanvas.id = 'graficoVentas';
        graficoContainer.appendChild(graficoCanvas);
        contentElement.appendChild(graficoContainer);

        // Datos de ejemplo para el gráfico
        const ctx = graficoCanvas.getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo'],
                datasets: [{
                    label: 'Ventas Mensuales ($)',
                    data: [1200, 1900, 3000, 500, 2200],
                    backgroundColor: 'rgba(54, 162, 235, 0.5)',
                    borderColor: 'rgba(54, 162, 235, 1)',
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
}

// Ejecutar la función de inicialización cuando el documento esté listo
document.addEventListener('DOMContentLoaded', initDashboard);
