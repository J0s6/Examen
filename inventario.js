// inventario.js

// Datos iniciales de ejemplo para el inventario
let inventario = [
    { id: 1, codigo: 'A001', proveedor: 'Proveedor A', producto: 'Martillo', cantidad: 50, medidas: '30 cm', lote: 'L-123', fechaFabricacion: '2023-01-10' },
    { id: 2, codigo: 'A002', proveedor: 'Proveedor B', producto: 'Taladro', cantidad: 20, medidas: '25 cm', lote: 'L-456', fechaFabricacion: '2023-02-15' },
    { id: 3, codigo: 'A003', proveedor: 'Proveedor C', producto: 'Sierra', cantidad: 15, medidas: '40 cm', lote: 'L-789', fechaFabricacion: '2023-03-20' },
    { id: 4, codigo: 'A004', proveedor: 'Proveedor D', producto: 'Destornillador', cantidad: 100, medidas: '15 cm', lote: 'L-234', fechaFabricacion: '2023-01-25' },
    { id: 5, codigo: 'A005', proveedor: 'Proveedor E', producto: 'Llave inglesa', cantidad: 30, medidas: '20 cm', lote: 'L-345', fechaFabricacion: '2023-02-05' },
    { id: 6, codigo: 'A006', proveedor: 'Proveedor F', producto: 'Clavos', cantidad: 500, medidas: '5 cm', lote: 'L-567', fechaFabricacion: '2023-01-18' },
    { id: 7, codigo: 'A007', proveedor: 'Proveedor G', producto: 'Cinta métrica', cantidad: 40, medidas: '5 m', lote: 'L-678', fechaFabricacion: '2023-03-01' },
    { id: 8, codigo: 'A008', proveedor: 'Proveedor H', producto: 'Pintura', cantidad: 25, medidas: '1 litro', lote: 'L-789', fechaFabricacion: '2023-02-20' },
    { id: 9, codigo: 'A009', proveedor: 'Proveedor I', producto: 'Brocha', cantidad: 60, medidas: '10 cm', lote: 'L-890', fechaFabricacion: '2023-01-30' },
    { id: 10, codigo: 'A010', proveedor: 'Proveedor J', producto: 'Tornillos', cantidad: 200, medidas: '2 cm', lote: 'L-901', fechaFabricacion: '2023-03-10' },
];

// Inicializar la gestión de inventario
function initInventario() {
    console.log('Gestión de inventario inicializada');
    renderInventario();
    agregarEventos();
    cargarDesdeLocalStorage();
}

// Renderizar la tabla de inventario
function renderInventario() {
    const inventarioBody = document.getElementById('inventarioBody');
    inventarioBody.innerHTML = '';

    inventario.forEach(producto => {
        const fila = document.createElement('tr');

        fila.innerHTML = `
            <td>${producto.id}</td>
            <td>${producto.codigo}</td>
            <td>${producto.proveedor}</td>
            <td>${producto.producto}</td>
            <td>${producto.cantidad}</td>
            <td>${producto.medidas}</td>
            <td>${producto.lote}</td>
            <td>${producto.fechaFabricacion}</td>
            <td>
                <button class="button-edit" onclick="editarProducto(${producto.id})">Editar</button>
                <button class="button-delete" onclick="eliminarProducto(${producto.id})">Eliminar</button>
            </td>
        `;

        inventarioBody.appendChild(fila);
    });
    guardarEnLocalStorage();
}

// Agregar eventos a los botones principales
function agregarEventos() {
    const addProductButton = document.getElementById('addProductButton');
    if (addProductButton) {
        addProductButton.addEventListener('click', agregarProducto);
    }

    const buscarProductoInput = document.querySelector('.buscar-producto');
    if (buscarProductoInput) {
        buscarProductoInput.addEventListener('input', buscarProducto);
    }
}

// Función para agregar un nuevo producto
function agregarProducto() {
    const codigo = prompt('Ingrese el código del producto:');
    const proveedor = prompt('Ingrese el proveedor del producto:');
    const producto = prompt('Ingrese el nombre del producto:');
    const cantidad = prompt('Ingrese la cantidad del producto:');
    const medidas = prompt('Ingrese las medidas del producto:');
    const lote = prompt('Ingrese el lote de fabricación:');
    const fechaFabricacion = prompt('Ingrese la fecha de fabricación (YYYY-MM-DD):');

    if (codigo && proveedor && producto && cantidad && medidas && lote && fechaFabricacion) {
        const nuevoProducto = {
            id: inventario.length + 1,
            codigo,
            proveedor,
            producto,
            cantidad: parseInt(cantidad),
            medidas,
            lote,
            fechaFabricacion,
        };

        inventario.push(nuevoProducto);
        renderInventario();
    } else {
        alert('Todos los campos son obligatorios para agregar un producto.');
    }
}

// Función para editar un producto existente
function editarProducto(id) {
    const producto = inventario.find(prod => prod.id === id);
    if (producto) {
        const nuevoCodigo = prompt('Ingrese el nuevo código del producto:', producto.codigo);
        const nuevoProveedor = prompt('Ingrese el nuevo proveedor del producto:', producto.proveedor);
        const nuevoNombre = prompt('Ingrese el nuevo nombre del producto:', producto.producto);
        const nuevaCantidad = prompt('Ingrese la nueva cantidad del producto:', producto.cantidad);
        const nuevasMedidas = prompt('Ingrese las nuevas medidas del producto:', producto.medidas);
        const nuevoLote = prompt('Ingrese el nuevo lote de fabricación:', producto.lote);
        const nuevaFechaFabricacion = prompt('Ingrese la nueva fecha de fabricación (YYYY-MM-DD):', producto.fechaFabricacion);

        if (nuevoCodigo && nuevoProveedor && nuevoNombre && nuevaCantidad && nuevasMedidas && nuevoLote && nuevaFechaFabricacion) {
            producto.codigo = nuevoCodigo;
            producto.proveedor = nuevoProveedor;
            producto.producto = nuevoNombre;
            producto.cantidad = parseInt(nuevaCantidad);
            producto.medidas = nuevasMedidas;
            producto.lote = nuevoLote;
            producto.fechaFabricacion = nuevaFechaFabricacion;
            renderInventario();
        } else {
            alert('Todos los campos son obligatorios para editar un producto.');
        }
    }
}

// Función para eliminar un producto
function eliminarProducto(id) {
    const confirmar = confirm('¿Está seguro de que desea eliminar este producto?');
    if (confirmar) {
        inventario = inventario.filter(producto => producto.id !== id);
        renderInventario();
    }
}

// Función para buscar un producto
function buscarProducto(event) {
    const valorBusqueda = event.target.value.toLowerCase();
    const productosFiltrados = inventario.filter(producto =>
        producto.codigo.toLowerCase().includes(valorBusqueda) ||
        producto.proveedor.toLowerCase().includes(valorBusqueda) ||
        producto.producto.toLowerCase().includes(valorBusqueda) ||
        producto.lote.toLowerCase().includes(valorBusqueda)
    );
    renderInventarioFiltrado(productosFiltrados);
}

// Renderizar la tabla de productos filtrados
function renderInventarioFiltrado(productosFiltrados) {
    const inventarioBody = document.getElementById('inventarioBody');
    inventarioBody.innerHTML = '';

    productosFiltrados.forEach(producto => {
        const fila = document.createElement('tr');

        fila.innerHTML = `
            <td>${producto.id}</td>
            <td>${producto.codigo}</td>
            <td>${producto.proveedor}</td>
            <td>${producto.producto}</td>
            <td>${producto.cantidad}</td>
            <td>${producto.medidas}</td>
            <td>${producto.lote}</td>
            <td>${producto.fechaFabricacion}</td>
            <td>
                <button class="button-edit" onclick="editarProducto(${producto.id})">Editar</button>
                <button class="button-delete" onclick="eliminarProducto(${producto.id})">Eliminar</button>
            </td>
        `;

        inventarioBody.appendChild(fila);
    });
}

// Guardar los datos en el Local Storage
function guardarEnLocalStorage() {
    localStorage.setItem('inventario', JSON.stringify(inventario));
}

// Cargar los datos desde el Local Storage
function cargarDesdeLocalStorage() {
    const inventarioGuardado = localStorage.getItem('inventario');
    if (inventarioGuardado) {
        inventario = JSON.parse(inventarioGuardado);
        renderInventario();
    }
}

// Ejecutar la función de inicialización cuando el documento esté listo
document.addEventListener('DOMContentLoaded', initInventario);
