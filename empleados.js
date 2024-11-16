// empleados.js

document.addEventListener('DOMContentLoaded', function () {
    const empleados = [
        { nombre: 'Juan Pérez', puesto: 'Gerente', salario: 50000, fechaIngreso: '2023-01-10' },
        { nombre: 'María Gómez', puesto: 'Vendedora', salario: 30000, fechaIngreso: '2022-03-15' },
        { nombre: 'Carlos Ruiz', puesto: 'Almacén', salario: 25000, fechaIngreso: '2021-07-20' }
    ];
    const empleadosBody = document.getElementById('empleadosBody');
    const formularioEmpleado = document.getElementById('formulario-empleado');
    const botonRegistrarEmpleado = document.getElementById('boton-registrar-empleado');
    const nuevoEmpleadoButton = document.getElementById('nuevoEmpleadoButton');
    const buscarEmpleadoInput = document.querySelector('.buscar-empleado');

    let editandoEmpleado = null;

    function renderEmpleados() {
        empleadosBody.innerHTML = '';
        empleados.forEach((empleado, index) => {
            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td>${index + 1}</td>
                <td>${empleado.nombre}</td>
                <td>${empleado.puesto}</td>
                <td>$${empleado.salario}</td>
                <td>${empleado.fechaIngreso}</td>
                <td>
                    <button class="button-edit" onclick="editarEmpleado(${index})">Editar</button>
                    <button class="button-delete" onclick="eliminarEmpleado(${index})">Eliminar</button>
                </td>
            `;
            empleadosBody.appendChild(fila);
        });
    }

    function registrarEmpleado() {
        const nombre = document.getElementById('empleado-nombre').value;
        const puesto = document.getElementById('empleado-puesto').value;
        const salario = document.getElementById('empleado-salario').value;
        const fechaIngreso = document.getElementById('empleado-fecha-ingreso').value;

        if (nombre && puesto && salario && fechaIngreso) {
            if (editandoEmpleado !== null) {
                empleados[editandoEmpleado] = { nombre, puesto, salario, fechaIngreso };
                editandoEmpleado = null;
            } else {
                empleados.push({ nombre, puesto, salario, fechaIngreso });
            }
            formularioEmpleado.reset();
            formularioEmpleado.classList.remove('active');
            renderEmpleados();
        } else {
            alert('Todos los campos son obligatorios para registrar un empleado.');
        }
    }

    function editarEmpleado(index) {
        editandoEmpleado = index;
        const empleado = empleados[index];
        document.getElementById('empleado-nombre').value = empleado.nombre;
        document.getElementById('empleado-puesto').value = empleado.puesto;
        document.getElementById('empleado-salario').value = empleado.salario;
        document.getElementById('empleado-fecha-ingreso').value = empleado.fechaIngreso;
        formularioEmpleado.classList.add('active');
    }

    function eliminarEmpleado(index) {
        const confirmar = confirm('¿Está seguro de que desea eliminar este empleado?');
        if (confirmar) {
            empleados.splice(index, 1);
            renderEmpleados();
        }
    }

    function buscarEmpleado(event) {
        const valorBusqueda = event.target.value.toLowerCase();
        const empleadosFiltrados = empleados.filter(empleado =>
            empleado.nombre.toLowerCase().includes(valorBusqueda) ||
            empleado.puesto.toLowerCase().includes(valorBusqueda)
        );
        empleadosBody.innerHTML = '';
        empleadosFiltrados.forEach((empleado, index) => {
            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td>${index + 1}</td>
                <td>${empleado.nombre}</td>
                <td>${empleado.puesto}</td>
                <td>$${empleado.salario}</td>
                <td>${empleado.fechaIngreso}</td>
                <td>
                    <button class="button-edit" onclick="editarEmpleado(${index})">Editar</button>
                    <button class="button-delete" onclick="eliminarEmpleado(${index})">Eliminar</button>
                </td>
            `;
            empleadosBody.appendChild(fila);
        });
    }

    nuevoEmpleadoButton.addEventListener('click', () => {
        formularioEmpleado.classList.toggle('active');
        formularioEmpleado.reset();
        editandoEmpleado = null;
    });

    botonRegistrarEmpleado.addEventListener('click', registrarEmpleado);
    buscarEmpleadoInput.addEventListener('input', buscarEmpleado);

    // Renderizar la lista inicial de empleados
    renderEmpleados();
});
