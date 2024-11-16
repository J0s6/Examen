// configuracion.js

document.addEventListener('DOMContentLoaded', function () {
    const nombreNegocioInput = document.getElementById('nombre-negocio');
    const direccionNegocioInput = document.getElementById('direccion-negocio');
    const telefonoNegocioInput = document.getElementById('telefono-negocio');
    const correoNegocioInput = document.getElementById('correo-negocio');
    const impuestoVentasInput = document.getElementById('impuesto-ventas');
    const guardarConfiguracionButton = document.getElementById('guardar-configuracion');

    // Cargar la configuración desde localStorage si existe
    function cargarConfiguracion() {
        const configuracion = JSON.parse(localStorage.getItem('configuracionNegocio'));
        if (configuracion) {
            nombreNegocioInput.value = configuracion.nombreNegocio;
            direccionNegocioInput.value = configuracion.direccionNegocio;
            telefonoNegocioInput.value = configuracion.telefonoNegocio;
            correoNegocioInput.value = configuracion.correoNegocio;
            impuestoVentasInput.value = configuracion.impuestoVentas;
        }
    }

    // Guardar la configuración en localStorage
    function guardarConfiguracion() {
        const configuracion = {
            nombreNegocio: nombreNegocioInput.value,
            direccionNegocio: direccionNegocioInput.value,
            telefonoNegocio: telefonoNegocioInput.value,
            correoNegocio: correoNegocioInput.value,
            impuestoVentas: impuestoVentasInput.value,
        };
        localStorage.setItem('configuracionNegocio', JSON.stringify(configuracion));
        alert('Configuración guardada correctamente');
    }

    // Event listener para el botón de guardar
    guardarConfiguracionButton.addEventListener('click', guardarConfiguracion);

    // Cargar configuración al cargar la página
    cargarConfiguracion();
});
