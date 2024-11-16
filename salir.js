// salir.js

document.addEventListener('DOMContentLoaded', function () {
    const salirButton = document.getElementById('salirButton');

    // Cerrar la página cuando se haga clic en el botón de salir
    salirButton.addEventListener('click', function () {
        window.close();
    });
});
